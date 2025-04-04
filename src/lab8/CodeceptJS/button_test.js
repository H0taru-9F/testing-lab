Feature('Buttons Test');

Scenario('Перевірка дій кнопок на сторінці Buttons', async ({ I }) => {
    I.amOnPage('/buttons');

    I.seeElement('#doubleClickBtn');
    I.doubleClick('#doubleClickBtn');
    I.see('You have done a double click', '#doubleClickMessage');

    I.seeElement('#rightClickBtn');
    I.rightClick('#rightClickBtn');
    I.see('You have done a right click', '#rightClickMessage');

    I.seeElement('//button[text()="Click Me"]');
    I.click('//button[text()="Click Me"]');
    I.see('You have done a dynamic click', '#dynamicClickMessage');
});
