import { chromium } from 'playwright-core';
import { strict as assert } from 'node:assert';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdir } from 'node:fs/promises';

const baseUrl = process.env.TEST_URL || 'http://127.0.0.1:3147';
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-first-run', '--disable-extensions']
});
const folder = join(tmpdir(), 'handheld-ui-audit');
await mkdir(folder, {recursive:true});
let failed = false;
for (const [label,width,height] of [['mobile-360',360,780],['mobile-390',390,844],['tablet-768',768,1024],['desktop-1440',1440,900]]) {
  const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  try {
    const response = await page.goto(baseUrl, {waitUntil:'domcontentloaded',timeout:30000});
    assert(response?.ok(), 'Home failed to load');
    await page.locator('#catalogo').waitFor({state:'visible',timeout:20000});
    await page.waitForFunction(() => {
      const t = document.querySelector('#catalogo')?.textContent || '';
      return /consolas disponibles|consola disponible/.test(t) && !/Cargando consolas disponibles/.test(t);
    }, null, {timeout:20000});
    await page.waitForTimeout(700);
    const dimensions = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const full = document.documentElement.scrollWidth;
      const title = document.querySelector('#inicio h1')?.getBoundingClientRect();
      return {viewport:vw,scrollWidth:full,titleLeft:title?.left,titleRight:title?.right,
        offenders: [...document.querySelectorAll('body *')].filter(el=>{
          const b=el.getBoundingClientRect();
          return b.width>1 && b.left < vw && b.right>vw+4 && getComputedStyle(el).position!=='absolute';
        }).slice(0,8).map(el=>el.tagName.toLowerCase()+'.'+String(el.className).slice(0,60))};
    });
    console.log(label,'DIMENSIONS',JSON.stringify(dimensions));
    assert(dimensions.scrollWidth <= width+2, 'Horizontal overflow '+JSON.stringify(dimensions));
    assert((dimensions.titleRight??0) <= width+3 && (dimensions.titleLeft??-1) >= -3,'Hero title clipped');
    const inStock = (await page.locator('#catalogo').innerText()).match(/(\d+) consolas disponibles|1 consola disponible/i);
    assert(inStock, 'No stock counter');
    const cards = page.locator('#catalogo button').filter({hasText:'VER CONSOLA'});
    assert(await cards.count()>=1,'No product cards');
    const pageContent = (await page.locator('main').innerText()).toLocaleLowerCase('es-AR');
    assert(pageContent.includes('más pantalla.'),'Missing Legion Go feature');
    assert(!pageContent.includes('también en tu escritorio.'),'Desktop-use section should not be on the home page');
    assert(pageContent.includes('desde argentina,'),'Missing Argentina story');
    assert(!pageContent.includes('conocé tu consola antes de decidir.'),'Duplicated trust section');
    assert((await page.locator('#nosotros').innerText()).includes('Instagram'),'Missing Instagram');
    assert((await page.locator('#nosotros').innerText()).includes('Facebook'),'Missing Facebook');
    await cards.first().click();
    await page.getByRole('button',{name:'Cerrar ficha'}).waitFor({timeout:8000});
    const detailBody = await page.locator('div.fixed.inset-0.z-50').innerText();
    assert(detailBody.includes('CONSULTAR POR WHATSAPP'),'Missing product consultation');
    if (detailBody.includes('Steam Deck')) assert(detailBody.includes('También podés usarla en escritorio'),'Desktop-use info missing from Steam Deck detail');
    const gallery = page.getByRole('button',{name:/Ver foto real/});
    if ((await gallery.count()) > 1) {
      await gallery.nth(1).click();
    }
    await page.getByRole('button',{name:'Cerrar ficha'}).click();
    if (width<1024) {
      const toggle = page.getByRole('button',{name:/Abrir menú/});
      await toggle.click();
      const menuCatalog = page.locator('.fixed.inset-0.z-40 a[href="#catalogo"]');
      await menuCatalog.click();
      assert(!(await page.locator('.fixed.inset-0.z-40').count()),'Mobile menu not closed');
    }
    if (width === 390) {
      await page.locator('#nosotros').screenshot({path:join(folder,'about-mobile.png')});
      await page.locator('section[aria-label="Más posibilidades con tu consola"]').screenshot({path:join(folder,'features-mobile.png')});
    }
    if (width === 1440) {
      const features = page.locator('section[aria-label="Más posibilidades con tu consola"]');
      await features.scrollIntoViewIfNeeded();
      await features.locator('img').evaluateAll(async images => { await Promise.all(images.map(img => img.decode().catch(() => {}))); });
      await features.screenshot({path:join(folder,'features-desktop.png')});
      const about = page.locator('#nosotros');
      await about.scrollIntoViewIfNeeded();
      await about.screenshot({path:join(folder,'about-desktop.png')});
    }
    const screenshot=join(folder,label+'.png');
    await page.screenshot({path:screenshot,fullPage:false});
    if (width === 390) {
      // Un fallo temporal de Sheets no debe borrar los productos ya consultados.
      await page.route('**/api/stock*', route => route.fulfill({status:503,contentType:'application/json',body:'{"error":"Simulated outage"}'}));
      await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
      await page.getByText('No se pudo actualizar el inventario.',{exact:false}).first().waitFor({timeout:8000});
      assert(await cards.count() >= 1,'A temporary API failure erased the catalog');
      await page.unroute('**/api/stock*');
    }
    console.log(label,'PASS',inStock[0], 'screenshot='+screenshot,'pageErrors='+errors.length);
    if(errors.length)console.log(label,'PAGE_ERRORS',errors.slice(0,4));
  }catch(e){
    failed=true;console.error(label,'FAIL',e.message);
    await page.screenshot({path:join(folder,label+'-failed.png')}).catch(()=>{});
  }finally {await page.close();}
}
await browser.close();
if(failed) process.exitCode=1;
