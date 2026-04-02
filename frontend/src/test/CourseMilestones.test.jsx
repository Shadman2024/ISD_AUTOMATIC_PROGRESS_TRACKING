import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CourseMilestones from '../components/CourseMilestones';

describe('CourseMilestones Component', () => {
    /**
     * Test Case: 0% Progress
     * Verifies that all milestones show "to go" text and are not marked as unlocked.
     */
    it('renders milestones as locked when progress is 0%', () => {
        render(<CourseMilestones courseProgress={0} />);
        
        // 25% to go, 50% to go, etc.
        expect(screen.getByText(/25% to go/i)).toBeInTheDocument();
        expect(screen.queryByText(/✓ UNLOCKED/i)).not.toBeInTheDocument();
    });

    /**
     * Test Case: 50% Progress
     * Verifies that milestones for 25% and 50% are marked as unlocked.
     */
    it('renders partial milestones as unlocked when progress is 50%', () => {
        render(<CourseMilestones courseProgress={50} />);
        
        const unlockedBadges = screen.getAllByText(/✓ UNLOCKED/i);
        // Should have 2 unlocked milestones (25% and 50%)
        expect(unlockedBadges.length).toBe(2);
        
        // 75% milestone should still be locked
        expect(screen.getByText(/25% to go/i)).toBeInTheDocument(); // (75 - 50 = 25)
    });

    /**
     * Test Case: 100% Progress
     * Verifies that all 4 milestones are unlocked.
     */
    it('renders all milestones as unlocked when progress is 100%', () => {
        render(<CourseMilestones courseProgress={100} />);
        
        const unlockedBadges = screen.getAllByText(/✓ UNLOCKED/i);
        expect(unlockedBadges.length).toBe(4);
    });
});
