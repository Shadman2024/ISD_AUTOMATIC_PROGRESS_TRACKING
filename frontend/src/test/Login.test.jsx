import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import * as api from '../services/api';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock api service
vi.mock('../services/api', () => ({
    loginUser: vi.fn(),
}));

describe('Login Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    /**
     * Test Case: Form Interaction
     * Verifies that the login form transitions from email input to password input.
     */
    it('switches from email step to password step', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        
        const continueBtn = screen.getByText('Continue');
        fireEvent.click(continueBtn);

        // Should now show the password input
        await waitFor(() => {
            expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        });
    });

    /**
     * Test Case: Successful Login
     * Verifies that successful API response saves user data and redirects.
     */
    it('handles successful login and redirects', async () => {
        api.loginUser.mockResolvedValue({
            data: {
                token: 'mock-token',
                user: { id: 1, name: 'Student', role: 'student' }
            }
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Step 1: Email
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'student@test.com' } });
        fireEvent.click(screen.getByText('Continue'));

        // Step 2: Password
        await waitFor(() => screen.getByPlaceholderText('Password'));
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Log in'));

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('mock-token');
            expect(mockNavigate).toHaveBeenCalledWith('/student/dashboard');
        });
    });

    /**
     * Test Case: Login Error
     * Verifies that an error message is shown if the API call fails.
     */
    it('shows error message on failure', async () => {
        api.loginUser.mockRejectedValue({
            response: { data: { message: 'Invalid credentials' } }
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'fail@test.com' } });
        fireEvent.click(screen.getByText('Continue'));

        await waitFor(() => screen.getByPlaceholderText('Password'));
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong' } });
        fireEvent.click(screen.getByText('Log in'));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
