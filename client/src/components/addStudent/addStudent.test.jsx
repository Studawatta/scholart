import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/utils-for-tests';
import AddStudent from './AddStudent';

describe('Add Student', () => {
  test('renders correctly', () => {
    renderWithProviders(<AddStudent />);

    const headerEl = screen.getByRole('heading', { name: 'Add Student' });
    expect(headerEl).toBeInTheDocument();

    const closeButtonEl = screen.getByTestId('closeBtn');
    expect(closeButtonEl).toBeInTheDocument();

    const nameInputEl = screen.getByRole('textbox', {
      name: 'Name:',
    });
    expect(nameInputEl).toBeInTheDocument();

    const classInputEl = screen.getByLabelText('Class:');
    expect(classInputEl).toBeInTheDocument();

    const ageInputEl = screen.getByRole('textbox', {
      name: 'Age:',
    });
    expect(ageInputEl).toBeInTheDocument();

    const genderInputEl = screen.getByText('Gender:');
    expect(genderInputEl).toBeInTheDocument();

    const maleRadioButtonEl = screen.getByRole('radio', { name: 'Male' });
    expect(maleRadioButtonEl).toBeInTheDocument();

    const femaleRadioButtonEl = screen.getByRole('radio', { name: 'Female' });
    expect(femaleRadioButtonEl).toBeInTheDocument();
  });
});
