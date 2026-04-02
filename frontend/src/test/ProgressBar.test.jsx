import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProgressBar from '../components/ProgressBar';

describe('ProgressBar Component', () => {
    it('renders current time and duration correctly', () => {
        render(<ProgressBar currentTime={60} duration={300} onSeek={() => {}} isCompleted={false} />);
        
        expect(screen.getByText('1:00')).toBeInTheDocument();
        expect(screen.getByText('5:00')).toBeInTheDocument();
    });

    it('shows completed badge when isCompleted is true', () => {
        render(<ProgressBar currentTime={300} duration={300} onSeek={() => {}} isCompleted={true} />);
        
        expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    });

    it('calls onSeek when clicked', () => {
        const onSeek = vi.fn();
        render(
            <ProgressBar currentTime={0} duration={100} onSeek={onSeek} isCompleted={false} />
        );
        
        const track = screen.getByTitle('Watch to here to complete').parentElement;
        
        // Mock getBoundingClientRect
        track.getBoundingClientRect = vi.fn(() => ({
            left: 0,
            width: 100
        }));

        fireEvent.click(track, { clientX: 50 });
        
        expect(onSeek).toHaveBeenCalledWith(50);
    });

    it('shows 80% marker with correct text', () => {
        const { rerender } = render(
            <ProgressBar currentTime={70} duration={100} onSeek={() => {}} isCompleted={false} />
        );
        expect(screen.getByText('80%')).toBeInTheDocument();

        rerender(<ProgressBar currentTime={85} duration={100} onSeek={() => {}} isCompleted={false} />);
        expect(screen.getByText('✓ 80%')).toBeInTheDocument();
    });
});
