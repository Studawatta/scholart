import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/utils-for-tests';
import AddTeacher from './AddTeacher';

describe('Add Teacher', () => {
  test('renders correctly', () => {
    renderWithProviders(<AddTeacher />);

    const headerEl = screen.getByRole('heading', { name: 'Add Teacher' });
    expect(headerEl).toBeInTheDocument();

    const closeButtonEl = screen.getByTestId('closeBtn');
    expect(closeButtonEl).toBeInTheDocument();

    const nameInputEl = screen.getByRole('textbox', {
      name: 'Name:',
    });
    expect(nameInputEl).toBeInTheDocument();

    const subjectInputEl = screen.getByLabelText('Subject:');
    expect(subjectInputEl).toBeInTheDocument();

    const appointedDateInputEl = screen.getByLabelText('Appointed Date:');
    expect(appointedDateInputEl).toBeInTheDocument();

    const submitBtnEl = screen.getByRole('button', {
      name: 'Submit',
    });
    expect(submitBtnEl).toBeInTheDocument();
  });
});
