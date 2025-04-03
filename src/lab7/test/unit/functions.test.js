import {every, find, some} from "../../../lab3/functions";

describe('Функція some', () => {
    test('Повертає true, якщо хоча б один елемент задовольняє умову', () => {
        const arr = [1, 2, 3, 4];
        const result = some(arr, x => x > 3);
        expect(result).toBe(true);
    });

    test('Повертає false, якщо ні один елемент не задовольняє умову', () => {
        const arr = [1, 2, 3];
        const result = some(arr, x => x > 5);
        expect(result).toBe(false);
    });

    test('Працює з порожнім масивом (повертає false)', () => {
        const arr = [];
        const result = some(arr, x => x > 0);
        expect(result).toBe(false);
    });

    test('Працює з різними типами даних', () => {
        const arr = ['apple', 'banana', 'cherry'];
        const result = some(arr, fruit => fruit.startsWith('b'));
        expect(result).toBe(true);
    });

    test('Правильно обробляє випадок, коли callback завжди повертає false', () => {
        const arr = [10, 20, 30];
        const result = some(arr, () => false);
        expect(result).toBe(false);
    });
});

describe('Функція every', () => {
    test('Повертає true, якщо всі елементи задовольняють умову', () => {
        const arr = [4, 6, 8];
        const result = every(arr, x => x % 2 === 0);
        expect(result).toBe(true);
    });

    test('Повертає false, якщо хоча б один елемент не задовольняє умову', () => {
        const arr = [4, 7, 8];
        const result = every(arr, x => x % 2 === 0);
        expect(result).toBe(false);
    });

    test('Працює з порожнім масивом (повертає true)', () => {
        const arr = [];
        const result = every(arr, x => x > 0);
        expect(result).toBe(true);
    });

    test('Перевіряє елементи різних типів даних', () => {
        const arr = ['test', 'testing', 'tester'];
        const result = every(arr, str => str.includes('t'));
        expect(result).toBe(true);
    });

    test('Працює з callback, який завжди повертає false', () => {
        const arr = [1, 2, 3];
        const result = every(arr, () => false);
        expect(result).toBe(false);
    });
});

describe('Функція find', () => {
    test('Повертає перший елемент, який задовольняє умову', () => {
        const arr = [5, 10, 15, 20];
        const result = find(arr, x => x > 10);
        expect(result).toBe(15);
    });

    test('Повертає undefined, якщо елемент не знайдено', () => {
        const arr = [1, 2, 3];
        const result = find(arr, x => x > 5);
        expect(result).toBeUndefined();
    });

    test('Працює з порожнім масивом (повертає undefined)', () => {
        const arr = [];
        const result = find(arr, x => x === 1);
        expect(result).toBeUndefined();
    });

    test('Працює з масивом об’єктів', () => {
        const arr = [
            { id: 1, name: 'Іван' },
            { id: 2, name: 'Марія' },
            { id: 3, name: 'Петро' }
        ];
        const result = find(arr, obj => obj.id === 2);
        expect(result).toEqual({ id: 2, name: 'Марія' });
    });

    test('Повертає перший елемент навіть якщо інші також задовольняють умову', () => {
        const arr = [3, 6, 9, 12];
        const result = find(arr, x => x % 3 === 0);
        expect(result).toBe(3);
    });
});
