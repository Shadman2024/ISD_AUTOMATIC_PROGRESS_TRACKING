import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PerformanceOverview from '../pages/PerformanceOverview';
import * as instructorApi from '../services/instructorApi';

// Mock instructorApi
vi.mock('../services/instructorApi', () => ({
    getOverview: vi.fn(),
}));

describe('PerformanceOverview Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Case: Data Rendering
     * Verifies that the instructor dashboard stats are fetched and displayed.
     */
    it('renders dashboard stats correctly', async () => {
        instructorApi.getOverview.mockResolvedValue({
            totalCourses: 5,
            averageRating: 4.8,
            totalStudents: 1200,
            totalEnrollments: 1500
        });

        render(
            <BrowserRouter>
                <PerformanceOverview />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('5')).toBeInTheDocument();
            expect(screen.getByText('4.8')).toBeInTheDocument();
            expect(screen.getByText('1,200')).toBeInTheDocument();
        });
    });
});
