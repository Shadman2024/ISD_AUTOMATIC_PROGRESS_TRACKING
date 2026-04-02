import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MyLearning from '../pages/MyLearning';
import studentAPI from '../services/api';

// Mock studentAPI
vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
    },
}));

const mockCourses = [
    { id: 1, title: 'Finished Course', completion_percentage: '100', enrolled_at: '2026-01-01' },
    { id: 2, title: 'In Progress Course', completion_percentage: '50', enrolled_at: '2026-01-01' },
    { id: 3, title: 'Not Started Course', completion_percentage: '0', enrolled_at: '2026-01-01' },
];

describe('MyLearning Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Case: Filter Logic
     * Verifies that switching tabs correctly filters the visible course list.
     */
    it('filters courses based on status tabs', async () => {
        studentAPI.get.mockResolvedValue({ data: mockCourses });

        render(
            <BrowserRouter>
                <MyLearning />
            </BrowserRouter>
        );

        // Wait for courses to load
        await waitFor(() => {
            expect(screen.getAllByText('Finished Course')[0]).toBeInTheDocument();
            expect(screen.getAllByText('In Progress Course')[0]).toBeInTheDocument();
        });

        // Switch to "Completed" tab
        const completedTab = screen.getByText(/Completed \(1\)/i);
        fireEvent.click(completedTab);

        await waitFor(() => {
            expect(screen.getAllByText('Finished Course')[0]).toBeInTheDocument();
            expect(screen.queryByText('In Progress Course')).not.toBeInTheDocument();
        });

        // Switch to "In progress" tab
        const inProgressTab = screen.getByText(/In progress \(1\)/i);
        fireEvent.click(inProgressTab);

        await waitFor(() => {
            expect(screen.queryByText('Finished Course')).not.toBeInTheDocument();
            expect(screen.getAllByText('In Progress Course')[0]).toBeInTheDocument();
        });
    });
});
