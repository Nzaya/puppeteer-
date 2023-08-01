const puppeteer = require ('puppeteer');
const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const data =require('./meals.json');
const { log } = require('console');

const compile = async(templateName, data)=>{
    const filepath = path.join(process.cwd(), 'templates', `${templateName}.ejs`);
    const html = await fs.readFile(filepath, 'utf-8');
    return ejs.render(html,{data: data});
};

(async () => {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const content = await compile('meals', data);

        await page.setContent(content);
        await page.setViewport({width:1080, height:1024});
        await page.pdf({
            path: 'mypdf.pdf',
            format: 'A4',
            printBackground: true
        });

        console.log('PDF generated successfully');
        await browser.close();
        process.exit();

    }catch (e) {
console.log('Error generating PDF', e);
    }
})();