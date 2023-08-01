const puppeteer = require('puppeteer');

(async () =>{
    //Launch browser and open a new blank page
     const browser = await puppeteer.launch({
        headless:false, //launches browser without closing
        defaultViewport:false, //loads the entire page
        userDataDir: "./tmp" //for webpage to remeber our actions
    });
     const page = await browser.newPage();

     //navigate the page to a url
     await page.goto('https://www.aliexpress.com/?gatewayAdapt=Msite2Pc');

     //set a screenshot
    //  await page.screenshot({path: 'example.png'})



    //  await browser.close();

     
})();