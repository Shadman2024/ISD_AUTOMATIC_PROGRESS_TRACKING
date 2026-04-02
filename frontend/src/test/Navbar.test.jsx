import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/student/dashboard' }),
    };
});

describe('Navbar Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    /**
     * Test Case: User Initials
     * Verifies that the user's initials are correctly derived from their name in localStorage.
     */
    it('renders user initials correctly', () => {
        localStorage.setItem('user', JSON.stringify({ name: 'John Doe' }));
        
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        // John Doe -> JD
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    /**
     * Test Case: Navigation
     * Verifies that clicking "My Learning" navigates to the correct route.
     */
    it('navigates to my learning when clicked', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const myLearningBtn = screen.getByText('My Learning');
        fireEvent.click(myLearningBtn);

        expect(mockNavigate).toHaveBeenCalledWith('/student/my-learning');
    });

    /**
     * Test Case: Logout
     * Verifies that clicking the user avatar (initials) clears storage and redirects to login.
     */
    it('handles logout correctly', () => {
        localStorage.setItem('user', JSON.stringify({ name: 'John Doe' }));
        
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

        const avatar = screen.getByText('JD');
        fireEvent.click(avatar);

        expect(localStorage.getItem('user')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
