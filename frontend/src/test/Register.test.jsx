import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
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
    registerUser: vi.fn(),
}));

describe('Register Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    /**
     * Test Case: Form Submission
     * Verifies that filling out the registration form and submitting it calls the API and redirects.
     */
    it('handles registration and redirects', async () => {
        api.registerUser.mockResolvedValue({
            data: {
                token: 'reg-token',
                user: { id: 2, name: 'New Instructor', role: 'instructor' }
            }
        });

        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'New Instructor' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'inst@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'pass123' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'instructor' } });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(api.registerUser).toHaveBeenCalledWith({
                name: 'New Instructor',
                email: 'inst@test.com',
                password: 'pass123',
                role: 'instructor'
            });
            expect(mockNavigate).toHaveBeenCalledWith('/instructor/dashboard');
        });
    });
});
