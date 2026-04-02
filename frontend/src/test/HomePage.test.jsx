import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('HomePage Component', () => {
    /**
     * Test Case: Rendering Content
     * Verifies that the hero banner and key features are displayed.
     */
    it('renders hero banner and features', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(screen.getByText(/Learn without limits/i)).toBeInTheDocument();
        expect(screen.getByText(/A broad selection of features/i)).toBeInTheDocument();
    });

    /**
     * Test Case: Login Navigation
     * Verifies that clicking the Log in button redirects the user.
     */
    it('navigates to login page when Log in button is clicked', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const loginBtns = screen.getAllByText(/Log in/i);
        fireEvent.click(loginBtns[0]); // Header login btn

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    /**
     * Test Case: Register Navigation
     * Verifies that clicking the Sign up button redirects the user.
     */
    it('navigates to register page when Sign up button is clicked', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        const signupBtns = screen.getAllByText(/Sign up/i);
        fireEvent.click(signupBtns[0]);

        expect(mockNavigate).toHaveBeenCalledWith('/register');
    });
});
