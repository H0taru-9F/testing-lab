const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/text-box');

    await page.type('#userName', 'Jane Doe');
    await page.type('#userEmail', 'jane.doe@example.com');
    await page.type('#currentAddress', '789 Sample St');
    await page.type('#permanentAddress', '101 Test Ave');
    await page.click('#submit');

    // Чекаємо, поки з’явиться результат
    await page.waitForSelector('#output');
    const output = await page.$eval('#output', el => el.textContent);

    if (output.includes('Jane Doe')) {
        console.log('Test passed: Форма заповнена коректно');
    } else {
        console.error('Test failed: Форма не відповідає очікуванням');
    }

    await browser.close();
})();
