import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CourseCarousel from '../components/CourseCarousel';

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Sample course data for testing
const mockCourses = [
    { id: '1', title: 'Test Enrolled Course', completion_percentage: '45' },
];

describe('CourseCarousel Component', () => {
    /**
     * Test Case: Rendering Enrolled Courses
     * Verifies that courses passed via props are displayed with the correct completion status.
     */
    it('renders enrolled courses correctly', () => {
        render(
            <BrowserRouter>
                <CourseCarousel courses={mockCourses} />
            </BrowserRouter>
        );

        // Check if the enrolled course title is visible
        expect(screen.getAllByText('Test Enrolled Course')[0]).toBeInTheDocument();
        // Check if completion percentage is shown
        expect(screen.getAllByText(/45% complete/i)[0]).toBeInTheDocument();
    });

    /**
     * Test Case: Rendering Recommended Courses
     * Verifies that the default recommended courses (like Python for Data Science) are rendered.
     */
    it('renders recommended courses', () => {
        render(
            <BrowserRouter>
                <CourseCarousel courses={mockCourses} />
            </BrowserRouter>
        );

        // 'Python for Data Science' is one of the hardcoded recommendations
        expect(screen.getAllByText(/Python for Data Science/i)[0]).toBeInTheDocument();
    });

    /**
     * Test Case: Navigation on Click
     * Verifies that clicking an enrolled course navigates the user to the course content page.
     */
    it('navigates to course page when an enrolled course card is clicked', () => {
        render(
            <BrowserRouter>
                <CourseCarousel courses={mockCourses} />
            </BrowserRouter>
        );

        const card = screen.getAllByText('Test Enrolled Course')[0];
        fireEvent.click(card);

        // Should navigate to /student/course/1
        expect(mockNavigate).toHaveBeenCalledWith('/student/course/1');
    });
});
