
const request = require('supertest');
const baseURL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API - GET', () => {
    test('Отримання списку постів', async () => {
        const response = await request(baseURL).get('/posts');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('Отримання посту з ID = 5', async () => {
        const response = await request(baseURL).get('/posts/5');
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(5);
    });

    test('Отримання посту з неіснуючим ID', async () => {
        const response = await request(baseURL).get('/posts/9999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({});
    });

    test('Отримання постів за параметром userId', async () => {
        const response = await request(baseURL).get('/posts?userId=3');
        expect(response.status).toBe(200);
        expect(response.body.every(post => post.userId === 3)).toBeTruthy();
    });

    test('Отримання постів з обмеженням кількості (limit)', async () => {
        const response = await request(baseURL).get('/posts?_limit=10');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeLessThanOrEqual(10);
    });
});

describe('JSONPlaceholder API - POST', () => {
    test('Створення нового посту', async () => {
        const newPost = { title: 'Test Post', body: 'Test Body', userId: 1 };
        const response = await request(baseURL).post('/posts').send(newPost);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newPost.title);
        expect(response.body.body).toBe(newPost.body);
        expect(response.body.userId).toBe(newPost.userId);
        expect(response.body.id).toBeDefined();
    });

    test('Відповідь містить id нового посту', async () => {
        const newPost = { title: 'Another Post', body: 'Content', userId: 2 };
        const response = await request(baseURL).post('/posts').send(newPost);
        expect(response.body).toHaveProperty('id');
    });

    test('Створення посту без title', async () => {
        const newPost = { body: 'Content without title', userId: 3 };
        const response = await request(baseURL).post('/posts').send(newPost);
        expect(response.status).toBe(201);
        expect(response.body.body).toBe(newPost.body);
    });

    test('Створення посту з некоректними даними', async () => {
        const newPost = { title: 123, body: false, userId: 'user' };
        const response = await request(baseURL).post('/posts').send(newPost);
        expect(response.status).toBe(201);
    });

    test('Створення посту з додатковими полями', async () => {
        const newPost = { title: 'Extra Field', body: 'Extra', userId: 1, extra: 'field' };
        const response = await request(baseURL).post('/posts').send(newPost);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('extra');
    });
});

describe('JSONPlaceholder API - PUT', () => {
    test('Повне оновлення посту', async () => {
        const updatedPost = { title: 'Updated Title', body: 'Updated Body', userId: 1 };
        const response = await request(baseURL).put('/posts/1').send(updatedPost);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedPost.title);
    });

    test('Часткове оновлення посту (тільки title)', async () => {
        const updatedPost = { title: 'Partial Update' };
        const response = await request(baseURL).put('/posts/2').send(updatedPost);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedPost.title);
    });

    test('Оновлення посту з порожніми даними', async () => {
        const response = await request(baseURL).put('/posts/3').send({});
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    test('Оновлення неіснуючого посту', async () => {
        const updatedPost = { title: 'Non-existent', body: 'None', userId: 1 };
        const response = await request(baseURL).put('/posts/9999').send(updatedPost);
        expect(response.status).toBe(500);
    });

    test('Оновлення посту з некоректними типами даних', async () => {
        const updatedPost = { title: 456, body: true };
        const response = await request(baseURL).put('/posts/4').send(updatedPost);
        expect(response.status).toBe(200);
    });
});

describe('JSONPlaceholder API - DELETE', () => {
    test('Видалення посту', async () => {
        const response = await request(baseURL).delete('/posts/1');
        expect(response.status).toBe(200);
    });

    test('Видалення неіснуючого посту', async () => {
        const response = await request(baseURL).delete('/posts/9999');
        expect(response.status).toBe(200);
    });

    test('Послідовне видалення кількох постів', async () => {
        const responses = await Promise.all([
            request(baseURL).delete('/posts/2'),
            request(baseURL).delete('/posts/3'),
            request(baseURL).delete('/posts/4')
        ]);
        responses.forEach(res => {
            expect(res.status).toBe(200);
        });
    });

    test('Видалення з некоректним URL', async () => {
        const response = await request(baseURL).delete('/invalid/endpoint');
        expect(response.status).toBe(404);
    });

    test('Перевірка видаленого посту ', async () => {
        await request(baseURL).delete('/posts/5');
        const response = await request(baseURL).get('/posts/5');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 5);
    });
});
