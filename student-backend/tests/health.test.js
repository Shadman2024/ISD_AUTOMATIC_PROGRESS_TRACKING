const request = require('supertest');

// Mock pg.Pool and cloudinary before requiring app
jest.mock('../src/db', () => ({
    query: jest.fn(),
    connect: jest.fn((cb) => cb && cb(null)),
    on: jest.fn()
}));

jest.mock('cloudinary', () => ({
    v2: {
        config: jest.fn(),
        uploader: {
            upload_stream: jest.fn()
        }
    }
}));

const app = require('../src/index');

describe('Health Check', () => {
    it('should return 200 and a welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Student Backend is running!');
    });
});
