const request = require('supertest');
const server = require('./server');

describe('Test Express Routes', () => {
    test('GET /', () => {
        const response = request(server)
            .get('/')
            // .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.msg).toBe("The get('/') was successful!");
    });

    test('PUT /', () => {
        const response = request(server)
            .put('/')
            // .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.msg).toBe("The put('/') was successful!");
    });

});
