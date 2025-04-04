Feature('Text Box');

Scenario('Заповнення текстових полів та перевірка результату', async ({ I }) => {
    I.amOnPage('/text-box');
    I.fillField('#userName', 'Alex Smith');
    I.fillField('#userEmail', 'alex.smith@example.com');
    I.fillField('#currentAddress', '321 Example Rd');
    I.fillField('#permanentAddress', '654 Demo St');
    I.click('#submit');
    I.waitForElement('#output', 10);
    const outputText = await I.grabTextFrom("#output");
    console.log(outputText);

    I.waitForText("Name:Alex Smith", 10, "#output");
});

