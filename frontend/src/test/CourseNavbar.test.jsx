import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import CourseNavbar from '../components/CourseNavbar';

describe('CourseNavbar Component', () => {
    /**
     * Test Case: Rendering Title and Progress
     * Verifies that the course title and progress percentage are displayed correctly.
     */
    it('renders course title and progress correctly', () => {
        render(
            <BrowserRouter>
                <CourseNavbar courseTitle="Test Course" progress={75} />
            </BrowserRouter>
        );

        expect(screen.getByText('Test Course')).toBeInTheDocument();
        expect(screen.getByText('75%')).toBeInTheDocument();
    });

    /**
     * Test Case: Milestone Toggle
     * Verifies that clicking the trophy button triggers the onToggleMilestones callback.
     */
    it('calls onToggleMilestones when trophy button is clicked', () => {
        const onToggle = vi.fn();
        render(
            <BrowserRouter>
                <CourseNavbar onToggleMilestones={onToggle} />
            </BrowserRouter>
        );

        const trophyBtn = screen.getByTitle('View milestones');
        fireEvent.click(trophyBtn);

        expect(onToggle).toHaveBeenCalled();
    });
});
