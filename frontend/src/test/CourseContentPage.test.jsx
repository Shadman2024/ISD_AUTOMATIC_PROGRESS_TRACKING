import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CourseContentPage from '../pages/CourseContentPage';
import studentAPI from '../services/api';

// Mock studentAPI
vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
    },
}));

const mockData = {
    title: 'Advanced React',
    lectures: [
        { id: 1, title: 'Introduction', section_id: 10, section_title: 'Setup', section_position: 1, duration: 120, position: 1 },
        { id: 2, title: 'Hooks Depth', section_id: 11, section_title: 'Core', section_position: 2, duration: 300, position: 1 },
    ],
    materials: []
};

describe('CourseContentPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock API responses for page load
        studentAPI.get.mockImplementation((url) => {
            if (url.includes('/lectures')) return Promise.resolve({ data: mockData });
            if (url.includes('/progress/lectures')) return Promise.resolve({ data: { lectures: [] } });
            if (url.includes('/progress/')) return Promise.resolve({ data: { completion_percentage: 0 } });
            return Promise.reject(new Error('Not found'));
        });
    });

    /**
     * Test Case: Sidebar Rendering
     * Verifies that sections and lectures are correctly grouped and displayed in the sidebar.
     */
    it('renders sections and lectures in sidebar', async () => {
        render(
            <MemoryRouter initialEntries={['/course/101']}>
                <Routes>
                    <Route path="/course/:courseId" element={<CourseContentPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Wait for page to stop loading
        await waitFor(() => {
            expect(screen.getByText('Setup')).toBeInTheDocument();
            expect(screen.getByText('Introduction')).toBeInTheDocument();
        });
    });

    /**
     * Test Case: Section Toggling
     * Verifies that clicking a section header collapses/expands the lecture list.
     */
    it('toggles section visibility when clicked', async () => {
        render(
            <MemoryRouter initialEntries={['/course/101']}>
                <Routes>
                    <Route path="/course/:courseId" element={<CourseContentPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => screen.getByText('Setup'));

        const sectionHeader = screen.getByText('Setup');
        // Initial state is open (auto-open logic in component)
        expect(screen.getByText('Introduction')).toBeInTheDocument();

        // Click to close
        fireEvent.click(sectionHeader);
        // Lecture should be hidden (not in document or display none - component removes from DOM)
        expect(screen.queryByText('Introduction')).not.toBeInTheDocument();
    });
});
