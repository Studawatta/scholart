import { fireEvent, screen } from '@testing-library/react';
import Signup from './Signup';
import { renderWithProviders } from '../../utils/utils-for-tests';

describe.skip('SignUp', () => {
  test('renders correctly', () => {
    renderWithProviders(<Signup />);

    const headerEl = screen.getByRole('heading', {
      name: 'Sign Up',
    });
    expect(headerEl).toBeInTheDocument();

    const usernameInputEl = screen.getByRole('textbox', {
      name: 'Username',
    });
    expect(usernameInputEl).toBeInTheDocument();

    const school_nameInputEl = screen.getByRole('textbox', {
      name: 'School name',
    });
    expect(school_nameInputEl).toBeInTheDocument();

    const emailInputEl = screen.getByRole('textbox', {
      name: 'Email',
    });
    expect(emailInputEl).toBeInTheDocument();

    const passwordInputEl = screen.getByLabelText('Password');
    expect(passwordInputEl).toBeInTheDocument();

    const signupButtonEl = screen.getByRole('button', {
      name: 'Sign Up',
    });
    expect(signupButtonEl).toBeInTheDocument();
  });

  test('error message should not be displayed', () => {
    renderWithProviders(<Signup />);

    const errorMessageEl = screen.queryByTestId('error');
    expect(errorMessageEl).not.toBeInTheDocument();
  });

  test('all inputs should be empty', () => {
    renderWithProviders(<Signup />);

    const usernameInputEl = screen.getByRole('textbox', {
      name: 'Username',
    });
    expect(usernameInputEl.value).toBe('');

    const school_nameInputEl = screen.getByRole('textbox', {
      name: 'School name',
    });
    expect(school_nameInputEl.value).toBe('');

    const emailInputEl = screen.getByRole('textbox', {
      name: 'Email',
    });
    expect(emailInputEl.value).toBe('');

    const passwordInputEl = screen.getByLabelText('Password');
    expect(passwordInputEl.value).toBe('');
  });

  test('all inputs should change', () => {
    renderWithProviders(<Signup />);

    const testValue = 'test';

    const usernameInputEl = screen.getByRole('textbox', {
      name: 'Username',
    });
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);

    const school_nameInputEl = screen.getByRole('textbox', {
      name: 'School name',
    });
    fireEvent.change(school_nameInputEl, { target: { value: testValue } });

    expect(school_nameInputEl.value).toBe(testValue);

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
