import { screen } from '@testing-library/react';
import Navbar from './Navabar';
import { renderWithProviders } from '../../utils/utils-for-tests';

describe.skip('Navigation bar', () => {
  test('Logo should be rendered', () => {
    renderWithProviders(<Navbar />);
    const logoEl = screen.getByAltText('scholart_logo');
    expect(logoEl).toBeInTheDocument();
  });

  test('Sign up button should be rendered', () => {
    renderWithProviders(<Navbar />);
    const signupButtonEl = screen.getByRole('button', { name: 'Sign Up' });
    expect(signupButtonEl).toBeInTheDocument();
  });

  test('Sign in button should be rendered', () => {
    renderWithProviders(<Navbar />);
    const signinButtonEl = screen.getByRole('button', { name: 'Sign In' });
    expect(signinButtonEl).toBeInTheDocument();
  });
});
