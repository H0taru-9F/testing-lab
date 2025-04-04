const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    if (title === 'Example Domain') {
        console.log('Test passed: Заголовок сторінки правильний');
    } else {
        console.error('Test failed: Невірний заголовок', title);
    }
    await browser.close();
})();
