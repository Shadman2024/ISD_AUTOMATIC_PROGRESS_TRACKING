import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer2 from '../components/Footer2';

describe('Footer2 Component', () => {
    /**
     * Test Case: Rendering Copyright and Settings
     * Verifies that the copyright text and cookie settings are visible.
     */
    it('renders copyright and settings', () => {
        render(<Footer2 />);
        
        expect(screen.getByText(/© 2026 Udemy, Inc./i)).toBeInTheDocument();
        expect(screen.getByText(/Cookie Settings/i)).toBeInTheDocument();
        expect(screen.getByText('English')).toBeInTheDocument();
    });
});
