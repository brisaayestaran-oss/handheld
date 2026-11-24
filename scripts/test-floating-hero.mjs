import { chromium } from 'playwright-core';
import { strict as assert } from 'node:assert';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-first-run','--disable-extensions']});
try {
  for (const setup of [
    {name:'desktop',viewport:{width:1440,height:1000}},
    {name:'phone',viewport:{width:390,height:844},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'},
    {name:'tablet',viewport:{width:820,height:1180},isMobile:true,hasTouch:true},
    {name:'landscape',viewport:{width:720,height:380}}
  ]) {
    const page=await browser.newPage(setup);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:3100/',{waitUntil:'domcontentloaded'});
    await page.locator('#inicio').waitFor({state:'visible',timeout:15000});
    const image=page.getByRole('img',{name:/Steam Deck OLED en vista frontal/});
    await image.waitFor({state:'visible',timeout:20000});
    await page.waitForFunction(()=>{const i=document.querySelector('img[alt^="Steam Deck OLED"]'); return i instanceof HTMLImageElement && i.complete && i.naturalWidth>0;},null,{timeout:15000});
    const before=await page.evaluate(()=>{
      const img=document.querySelector('img[alt^="Steam Deck OLED"]');
      const node=img?.parentElement;
      return {scrollWidth:document.documentElement.scrollWidth, viewport:innerWidth, imageWidth:img?.naturalWidth,bob:node?.style.transform, imageBounds:img?.getBoundingClientRect().toJSON(), hero:!!document.querySelector('#inicio'),catalog:!!document.querySelector('#catalogo')};
    });
    assert(before.scrollWidth<=before.viewport+2,JSON.stringify(before));
    assert(before.hero && before.catalog,'Home content missing');
    await page.waitForTimeout(500);
    const motion=await image.evaluate(el=>el.parentElement?.style.transform);
    assert(motion!==before.bob,'Bobbing should advance');
    if(setup.name==='desktop'){
      const region=page.locator('div[aria-label="Consola Steam Deck flotando suavemente"]>div').first();
      const rect=await region.boundingBox(); assert(rect);
      await page.mouse.move(rect.x+rect.width*0.8,rect.y+rect.height*0.45);
      await page.waitForTimeout(600);
      const tilt=await region.locator('div').first().evaluate(el=>el.style.transform);
      assert(tilt.includes('rotateX(') && !tilt.includes('rotateX(0deg) rotateY(0deg) rotateZ(0deg)'), tilt);
      console.log('TILT',tilt);
    }
    const pause=page.getByRole('button',{name:'Pausar movimiento de la consola'});
    await pause.click();
    const frozen=await image.evaluate(el=>el.parentElement?.style.transform);
    await page.waitForTimeout(400);
    assert.equal(await image.evaluate(el=>el.parentElement?.style.transform),frozen,'Pause should stop motion');
    await page.getByRole('button',{name:'Reproducir movimiento de la consola'}).click();
    await page.waitForTimeout(300);
    assert.notEqual(await image.evaluate(el=>el.parentElement?.style.transform),frozen,'Resume should advance');
    await page.getByRole('button',{name:'Reiniciar movimiento de la consola'}).click();
    console.log('PASS',setup.name,JSON.stringify(before),'errors',errors);
    assert.equal(errors.length,0);
    await page.close();
  }
  const reduced=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await reduced.goto('http://127.0.0.1:3100/',{waitUntil:'domcontentloaded'});
  const image=reduced.getByRole('img',{name:/Steam Deck OLED en vista frontal/});
  await image.waitFor({state:'visible',timeout:15000});
  assert(await reduced.getByRole('button',{name:'Pausar movimiento de la consola'}).isDisabled());
  const start=await image.evaluate(el=>el.parentElement?.style.transform);
  await reduced.waitForTimeout(550);
  assert.equal(start,await image.evaluate(el=>el.parentElement?.style.transform));
  console.log('PASS reduced');
  await reduced.close();
} finally {await browser.close();}
