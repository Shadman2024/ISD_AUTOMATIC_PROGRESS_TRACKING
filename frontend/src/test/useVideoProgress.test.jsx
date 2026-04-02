import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useVideoProgress from '../hooks/useVideoProgress';
import studentAPI from '../services/api';

vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

describe('useVideoProgress', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it('fetches last position and clears loading', async () => {
        studentAPI.get.mockResolvedValue({
            data: { position: 42.5, is_completed: false },
        });

        const { result } = renderHook(() =>
            useVideoProgress({ videoId: 7, courseId: 101, studentId: 1 })
        );

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.lastPosition).toBe(42.5);
        expect(result.current.isCompleted).toBe(false);
        expect(studentAPI.get).toHaveBeenCalledWith('/video/last-position/7');
    });

    it('falls back to localStorage when API fails', async () => {
        studentAPI.get.mockRejectedValue(new Error('network'));
        localStorage.setItem('vp_7', '12.25');

        const { result } = renderHook(() =>
            useVideoProgress({ videoId: 7, courseId: 101, studentId: 1 })
        );

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.lastPosition).toBe(12.25);
    });
});
