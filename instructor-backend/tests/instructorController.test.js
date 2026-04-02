const request = require('supertest');
const express = require('express');

// Mock pg Pool
jest.mock('../src/config/db', () => ({
    query: jest.fn(),
}));

const pool = require('../src/config/db');
const instructorRoutes = require('../src/routes/instructor');

const app = express();
app.use(express.json());
app.use('/api/instructor', instructorRoutes);

describe('Instructor Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    /**
     * Test Case: getOverview
     * Verifies that the dashboard overview data is correctly returned from the database.
     */
    describe('GET /api/instructor/overview', () => {
        it('should return overview stats for an instructor', async () => {
            const mockRows = [{ totalCourses: 5, totalStudents: 100, totalEnrollments: 120, averageRating: 4.8 }];
            pool.query.mockResolvedValueOnce({ rows: mockRows });

            const res = await request(app).get('/api/instructor/overview');

            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.totalCourses).toBe(5);
            expect(pool.query).toHaveBeenCalled();
        });

        it('should handle database errors', async () => {
            pool.query.mockRejectedValueOnce(new Error('DB Error'));

            const res = await request(app).get('/api/instructor/overview');

            expect(res.statusCode).toEqual(500);
            expect(res.body.success).toBe(false);
        });
    });

    /**
     * Test Case: getStudents
     * Verifies that the student analytics data is correctly aggregated.
     */
    describe('GET /api/instructor/students', () => {
        it('should return student analytics', async () => {
            const mockData = { totalStudents: 50, newStudentsThisMonth: 10, courseWiseTable: [] };
            pool.query.mockResolvedValueOnce({ rows: [mockData] });

            const res = await request(app).get('/api/instructor/students');

            expect(res.statusCode).toEqual(200);
            expect(res.body.data.totalStudents).toBe(50);
        });
    });

    /**
     * Test Case: getEngagement
     * Verifies that engagement data is correctly returned.
     */
    describe('GET /api/instructor/engagement', () => {
        it('should return engagement data', async () => {
            const mockData = { courseWiseEngagement: [], avgQuizScore: '85%' };
            pool.query.mockResolvedValueOnce({ rows: [mockData] });

            const res = await request(app).get('/api/instructor/engagement');

            expect(res.statusCode).toEqual(200);
            expect(res.body.data.avgQuizScore).toBe('85%');
        });
    });
});
