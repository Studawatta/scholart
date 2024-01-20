import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navabar';

describe('Navigation bar', () => {
  test('Logo should be rendered', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logoEl = screen.getByAltText('scholart_logo');
    expect(logoEl).toBeInTheDocument();
  });

  test('Sign up button should be rendered', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const signupButtonEl = screen.getByRole('button', { name: 'Sign Up' });
    expect(signupButtonEl).toBeInTheDocument();
  });

  test('Sign in button should be rendered', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const signinButtonEl = screen.getByRole('button', { name: 'Sign In' });
    expect(signinButtonEl).toBeInTheDocument();
  });
});
