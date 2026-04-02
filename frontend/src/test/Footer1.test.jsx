import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer1 from '../components/Footer1';

describe('Footer1 Component', () => {
    /**
     * Test Case: Rendering Static Content
     * Verifies that the footer's main heading and some key links are rendered.
     */
    it('renders heading and various links', () => {
        render(<Footer1 />);
        
        expect(screen.getByText(/Teach the world online/i)).toBeInTheDocument();
        expect(screen.getByText('About us')).toBeInTheDocument();
        expect(screen.getByText('Careers')).toBeInTheDocument();
        expect(screen.getByText('Terms')).toBeInTheDocument();
    });
});
