import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import VideoPlayer from '../pages/VideoPlayer';
import studentAPI from '../services/api';

// Mock studentAPI
vi.mock('../services/api', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

describe('VideoPlayer Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock HTMLVideoElement methods
        window.HTMLVideoElement.prototype.play = vi.fn();
        window.HTMLVideoElement.prototype.pause = vi.fn();
    });

    /**
     * Test Case: Loading Video
     * Verifies that the video URL is fetched and the player renders.
     */
    it('fetches video data and renders video element', async () => {
        studentAPI.get.mockImplementation((url) => {
            if (url.includes('/url')) return Promise.resolve({ data: { url: 'test.mp4', title: 'Test Lecture' } });
            if (url.includes('/last-position')) return Promise.resolve({ data: { position: 0 } });
            return Promise.reject(new Error('Fail'));
        });

        render(<VideoPlayer videoIdProp="1" />);

        await waitFor(() => {
            expect(screen.getByText('Test Lecture')).toBeInTheDocument();
        });
    });

    /**
     * Test Case: Play/Pause Toggle
     * Verifies that clicking the play button toggles the internal playing state.
     */
    it('toggles play/pause when button clicked', async () => {
        studentAPI.get.mockImplementation((url) => {
            if (url.includes('/url')) return Promise.resolve({ data: { url: 'test.mp4', title: 'Test Lecture' } });
            if (url.includes('/last-position')) return Promise.resolve({ data: { position: 0 } });
            return Promise.reject(new Error('Fail'));
        });

        const { container } = render(<VideoPlayer videoIdProp="1" />);

        await waitFor(() => screen.getByText('▶'));
        const playBtn = screen.getByText('▶');
        
        fireEvent.click(playBtn);
        
        // Manually trigger play event because we mocked the prototype
        const video = container.querySelector('video');
        fireEvent.play(video);

        // Should now show pause icon
        await waitFor(() => {
            expect(screen.getByText('⏸')).toBeInTheDocument();
        });
    });
});
