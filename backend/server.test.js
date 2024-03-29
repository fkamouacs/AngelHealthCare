const request = require('supertest');
const server = require('./server');

describe('Test Express Routes', () => {
    test('GET /', async () => {
        const response = await request(server)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.msg).toBe("The get('/') was successful!");
    });

    test('PUT /', async () => {
        const response = await request(server)
            .put('/')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.msg).toBe("The put('/') was successful!");
    });

});
