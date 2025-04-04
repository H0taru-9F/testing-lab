const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/dynamic-properties');

    // Очікуємо, поки кнопка стане активною
    await page.waitForSelector('#enableAfter', { visible: true, timeout: 6000 });
    const buttonTextBefore = await page.$eval('#enableAfter', el => el.textContent);
    console.log('Before click:', buttonTextBefore);

    await page.click('#enableAfter');

    // Перевіряємо, що кнопка все ще видима після кліку
    const isVisible = await page.$eval('#enableAfter', el => window.getComputedStyle(el).visibility !== 'hidden');
    console.log('Button visible after click:', isVisible);

    if (isVisible) {
        console.log('Test passed: Кнопка видима після кліку');
    } else {
        console.error('Test failed: Кнопка не видима після кліку');
    }

    await browser.close();
})();
