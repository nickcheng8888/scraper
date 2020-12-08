const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://au.indeed.com/', {waitUntil: 'networkidle2'});
    await page.type('#text-input-what', 'developer');
    const elements = await page.$x('//*[@id="whatWhereFormId"]/div[3]/button')
    await elements[0].click() 
    //var linkTexts = await page.$$eval(".title",
    //            elements=> elements.map(item=>item.textContent))
    await page.screenshot({
        path: "./screenshot.jpg",
        type: "jpeg",
        fullPage: true
    });
    // we have made it into the page where we have job results
    //await console.log(linkTexts);
    await page.close();
    await browser.close(); 
   })()


