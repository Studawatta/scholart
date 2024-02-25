import { renderWithProviders } from '../../utils/utils-for-tests';
import { screen } from '@testing-library/react';
import AddClass from './AddClass';

describe('Add Class', () => {
  test('renders correctly', () => {
    renderWithProviders(<AddClass />);

    const headerEl = screen.getByRole('heading', { name: 'Add Class' });
    expect(headerEl).toBeInTheDocument();

    const closeButtonEl = screen.getByTestId('closeBtn');
    expect(closeButtonEl).toBeInTheDocument();

    const nameInputEl = screen.getByRole('textbox', {
      name: 'Name:',
    });
    expect(nameInputEl).toBeInTheDocument();

    const inchargeTeacherInputEl = screen.getByRole('textbox', {
      name: 'In charge teacher:',
    });
    expect(inchargeTeacherInputEl).toBeInTheDocument();

    const submitBtnEl = screen.getByRole('button', {
      name: 'Submit',
    });
    expect(submitBtnEl).toBeInTheDocument();
  });
});
