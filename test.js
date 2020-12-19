const puppeteer = require('puppeteer');
let pythonBridge = require('python-bridge');
 
let python = pythonBridge();
 

(async () => {
    // launch a chromium browser and go to indeed
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://au.indeed.com/', {waitUntil: 'networkidle2'});
    // search for developer jobs and print a list of tuples (job, company)
    await page.type('#text-input-what', 'developer');
    const elements = await page.$x('//*[@id="whatWhereFormId"]/div[3]/button')
    await elements[0].click() 
    await page.waitForSelector('.title');
    await page.waitForSelector('.company');
    
    var jobTitle = await page.$$eval(".title",
                elements=> elements.map(item=>item.textContent));
    var companyName = await page.$$eval(".company",
                elements=> elements.map(item=>item.textContent));      
    // use python-bridge to join two lists
    var tuples = python`list(zip(${jobTitle}, ${companyName}))`;    
    
    await page.screenshot({
        path: "./screenshot.jpg",
        type: "jpeg",
        fullPage: true
    }); 
    
    // we have made it into the page where we have job results
    console.log(tuples);
    await page.close();
    await browser.close(); 
   })()


