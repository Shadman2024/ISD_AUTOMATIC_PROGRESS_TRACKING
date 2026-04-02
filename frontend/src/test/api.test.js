import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import studentAPI, { registerUser, loginUser } from '../services/api';

vi.mock('axios', () => {
    const mockAxios = {
        create: vi.fn(() => mockAxios),
        post: vi.fn(),
        get: vi.fn(),
        interceptors: {
            request: { use: vi.fn(), eject: vi.fn() },
            response: { use: vi.fn(), eject: vi.fn() },
        },
    };
    return { default: mockAxios };
});

describe('API Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('registerUser calls the correct endpoint', async () => {
        const userData = { name: 'Test', email: 'test@test.com', password: 'password' };
        await registerUser(userData);
        expect(axios.post).toHaveBeenCalledWith('/auth/register', userData);
    });

    it('loginUser calls the correct endpoint', async () => {
        const credentials = { email: 'test@test.com', password: 'password' };
        await loginUser(credentials);
        expect(axios.post).toHaveBeenCalledWith('/auth/login', credentials);
    });
});
