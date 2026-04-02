import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import PerformanceStudents from '../pages/PerformanceStudents';
import * as instructorApi from '../services/instructorApi';

// Mock instructorApi
vi.mock('../services/instructorApi', () => ({
    getStudents: vi.fn(),
}));

// Mock Recharts to avoid layout issues in test environment
vi.mock('recharts', () => ({
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    BarChart: ({ children }) => <div>{children}</div>,
    Bar: () => <div />,
    XAxis: () => <div />,
    YAxis: () => <div />,
    Tooltip: () => <div />,
    Cell: () => <div />,
}));

describe('PerformanceStudents Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    /**
     * Test Case: Student List Rendering
     * Verifies that course-wise student data is rendered in the table.
     */
    it('renders student stats and table', async () => {
        instructorApi.getStudents.mockResolvedValue({
            totalStudents: 500,
            courseWiseTable: [
                { courseName: 'JS Basics', totalStudents: 300, newThisMonth: 50, completionPercent: 25 }
            ],
            demographics: []
        });

        render(
            <BrowserRouter>
                <PerformanceStudents />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('500')).toBeInTheDocument();
            expect(screen.getByText('JS Basics')).toBeInTheDocument();
            expect(screen.getByText('25%')).toBeInTheDocument();
        });
    });
});
