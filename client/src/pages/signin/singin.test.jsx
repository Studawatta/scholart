import { fireEvent, screen } from '@testing-library/react';
import Signin from './Signin';
import { renderWithProviders } from '../../utils/utils-for-tests';

describe.skip('SignIn', () => {
  test('renders correctly', () => {
    renderWithProviders(<Signin />);

    const headerEl = screen.getByRole('heading', {
      name: 'Sign In',
    });
    expect(headerEl).toBeInTheDocument();

    const emailInputEl = screen.getByRole('textbox', {
      name: 'Email',
    });
    expect(emailInputEl).toBeInTheDocument();

    const passwordInputEl = screen.getByLabelText('Password');
    expect(passwordInputEl).toBeInTheDocument();

    const signinButtonEl = screen.getByRole('button', {
      name: 'Sign In',
    });
    expect(signinButtonEl).toBeInTheDocument();
  });

  test('error message should not be displayed', () => {
    renderWithProviders(<Signin />);

    const errorMessageEl = screen.queryByTestId('error');
    expect(errorMessageEl).not.toBeInTheDocument();
  });

  test('all inputs should be empty', () => {
    renderWithProviders(<Signin />);

    const emailInputEl = screen.getByRole('textbox', {
      name: 'Email',
    });
    expect(emailInputEl.value).toBe('');

    const passwordInputEl = screen.getByLabelText('Password');
    expect(passwordInputEl.value).toBe('');
  });

  test('all inputs should change', () => {
    renderWithProviders(<Signin />);

    const testValue = 'test';

    const emailInputEl = screen.getByRole('textbox', {
      name: 'Email',
    });
    fireEvent.change(emailInputEl, { target: { value: testValue } });

    expect(emailInputEl.value).toBe(testValue);

    const passwordInputEl = screen.getByLabelText('Password');
    fireEvent.change(passwordInputEl, { target: { value: testValue } });

    expect(passwordInputEl.value).toBe(testValue);
  });
});
