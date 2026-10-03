import Footer from '../../components/Footer/Footer.jsx';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
    it('renders the copyright link to InfoGoer.com', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /InfoGoer\.com/i });
        expect(link).toHaveAttribute('href', 'http://www.infogoer.com');
    });
});
