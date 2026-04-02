import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PerformanceEngagement from '../pages/PerformanceEngagement';
import * as instructorApi from '../services/instructorApi';

// Mock instructorApi
vi.mock('../services/instructorApi', () => ({
    getEngagement: vi.fn(),
}));

describe('PerformanceEngagement Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Case: Engagement Data Rendering
     * Verifies that engagement stats are fetched and displayed.
     */
    it('renders engagement table and cards', async () => {
        instructorApi.getEngagement.mockResolvedValue({
            courseWiseEngagement: [
                { courseName: 'React UI', avgWatchTime: '45.5 min', activeStudents: 80 }
            ],
            practiceTestsCompleted: 125,
            avgQuizScore: '82%'
        });

        render(
            <BrowserRouter>
                <PerformanceEngagement />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('React UI')).toBeInTheDocument();
            expect(screen.getByText('45.5 min')).toBeInTheDocument();
            expect(screen.getByText('125')).toBeInTheDocument();
            expect(screen.getByText('82%')).toBeInTheDocument();
        });
    });
});
