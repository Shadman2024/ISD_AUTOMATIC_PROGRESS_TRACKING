import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import StudentDashboard from '../pages/StudentDashboard';
import studentAPI from '../services/api';

// Mock studentAPI
vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
    },
}));

describe('StudentDashboard Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify({ name: 'Shadman Abid' }));
    });

    /**
     * Test Case: Dashboard Rendering
     * Verifies that the welcome message and enrolled courses are displayed correctly.
     */
    it('renders welcome message and course list', async () => {
        studentAPI.get.mockResolvedValue({
            data: [
                { id: 1, title: 'React Mastery', completion_percentage: '50' }
            ]
        });

        render(
            <BrowserRouter>
                <StudentDashboard />
            </BrowserRouter>
        );

        // Check welcome message
        await waitFor(() => {
            expect(screen.getByText(/Welcome Back, Abid/i)).toBeInTheDocument();
        });

        // Check if course from API is rendered
        await waitFor(() => {
            expect(screen.getAllByText('React Mastery')[0]).toBeInTheDocument();
            expect(screen.getAllByText('50% complete')[0]).toBeInTheDocument();
        });
    });
});
