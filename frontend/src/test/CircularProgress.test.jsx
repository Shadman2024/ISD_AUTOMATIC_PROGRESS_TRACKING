import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CircularProgress from '../components/CircularProgress';

describe('CircularProgress Component', () => {
    it('renders with 0% progress correctly', () => {
        const { container } = render(<CircularProgress percent={0} />);
        const circles = container.querySelectorAll('circle');
        expect(circles.length).toBe(2);
        expect(screen.queryByText('%')).not.toBeInTheDocument();
    });

    it('renders with 50% progress and shows text', () => {
        render(<CircularProgress percent={50} />);
        expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('renders checkmark when isCompleted is true', () => {
        render(<CircularProgress percent={100} isCompleted={true} />);
        expect(screen.getByText('✓')).toBeInTheDocument();
        expect(screen.queryByText('100%')).not.toBeInTheDocument();
    });

    it('applies correct stroke color based on completion', () => {
        const { rerender, container } = render(<CircularProgress percent={50} isCompleted={false} />);
        let progressCircle = container.querySelectorAll('circle')[1];
        expect(progressCircle.getAttribute('stroke')).toBe('#7c3aed');

        rerender(<CircularProgress percent={100} isCompleted={true} />);
        progressCircle = container.querySelectorAll('circle')[1];
        expect(progressCircle.getAttribute('stroke')).toBe('#10b981');
    });
});
