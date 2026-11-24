import { chromium } from 'playwright-core';
import { strict as assert } from 'node:assert';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-first-run','--disable-extensions']});
try {
  for (const width of [360, 1440]) {
    const page=await browser.newPage({viewport:{width,height:width===360?780:900}});
    const errors=[]; page.on('pageerror', e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:3100/',{waitUntil:'domcontentloaded'});
    const intro=page.getByRole('img',{name:/HANDHELD, símbolo/});
    await intro.waitFor({timeout:25000});
    assert.equal(await page.locator('#inicio').isVisible(),false,'Homepage must stay hidden during intro');
    await page.waitForTimeout(4100);
    assert.equal(await intro.isVisible(),true,'Intro must still be visible before cycle ends');
    await page.locator('#inicio').waitFor({state:'visible',timeout:6500});
    assert.equal(await intro.count(),0,'Intro must unmount after one cycle');
    const widthUsed=await page.evaluate(()=>document.documentElement.scrollWidth);
    assert(widthUsed<=width+2,'No horizontal overflow');
    assert.equal(errors.length,0,'No browser errors');
    console.log('PASS intro -> home',width,'scrollWidth',widthUsed);
    await page.close();
  }
  const reduced=await browser.newPage({reducedMotion:'reduce'});
  await reduced.goto('http://127.0.0.1:3100/',{waitUntil:'domcontentloaded'});
  await reduced.locator('#inicio').waitFor({state:'visible',timeout:6000});
  assert.equal(await reduced.getByRole('img',{name:/HANDHELD, símbolo/}).count(),0);
  console.log('PASS reduced motion skips intro');
  await reduced.close();
  const admin=await browser.newPage();
  await admin.goto('http://127.0.0.1:3100/#admin',{waitUntil:'domcontentloaded'});
  await admin.waitForTimeout(600);
  assert.equal(await admin.getByRole('img',{name:/HANDHELD, símbolo/}).count(),0);
  console.log('PASS admin bypasses intro');
  await admin.close();
} finally {await browser.close()}
