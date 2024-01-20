import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('Logo should be rendered', () => {
    render(<Footer />);
    const logoEl = screen.getByAltText('scholart_logo');
    expect(logoEl).toBeInTheDocument();
  });
});
