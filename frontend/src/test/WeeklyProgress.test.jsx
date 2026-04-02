import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WeeklyProgress from '../components/WeeklyProgress';
import studentAPI from '../services/api';

// Mock studentAPI
vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
    },
}));

describe('WeeklyProgress Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Case: Rendering with API Data
     * Verifies that total hours and average minutes are correctly calculated and rendered.
     */
    it('renders weekly stats correctly from API', async () => {
        // Mocking 2 days of activity
        studentAPI.get.mockResolvedValue({
            data: [
                { day: '2026-04-01', completed: '3' }, // 30 mins
                { day: '2026-04-02', completed: '3' }, // 30 mins
            ]
        });

        render(<WeeklyProgress />);

        // Total minutes = 60 (1 hour), Average = 60/7 ≈ 9m
        await waitFor(() => {
            expect(screen.getByText('1.0h')).toBeInTheDocument();
            expect(screen.getByText('9m')).toBeInTheDocument();
        });
    });

    /**
     * Test Case: Rendering Fallback
     * Verifies that fallback data is used if the API call fails.
     */
    it('renders fallback stats on API error', async () => {
        studentAPI.get.mockRejectedValue(new Error('API failure'));

        render(<WeeklyProgress />);

        // Fallback data in component sums to 155 minutes ≈ 2.6h
        await waitFor(() => {
            expect(screen.getByText('2.6h')).toBeInTheDocument();
        });
    });
});
