import { render, screen } from '@testing-library/react';
import Landing from './Landing';

describe('Landing page', () => {
  test('Header should be rendered', () => {
    window.scrollTo = jest.fn();
    render(<Landing />);
    const headerEl = screen.getByRole('heading');
    expect(headerEl).toBeInTheDocument();
  });

  test('Logo should be rendered', () => {
    window.scrollTo = jest.fn();
    render(<Landing />);
    const logoEl = screen.getByAltText('scholart_logo');
    expect(logoEl).toBeInTheDocument();
  });
});
