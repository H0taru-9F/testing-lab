Feature('Dynamic Properties');

Scenario('Очікування активності кнопки та перевірка її видимості', async ({ I }) => {
    I.amOnPage('/dynamic-properties');
    I.waitForVisible('#enableAfter', 7);
    I.click('#enableAfter');
    I.seeElement('#enableAfter');
});
