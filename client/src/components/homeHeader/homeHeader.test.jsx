import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../../utils/utils-for-tests';

describe('Home Header', () => {
  test('renders correctly', () => {
    renderWithProviders(<Header />);

    const school_nameEl = screen.getByRole('heading');
    expect(school_nameEl).toBeInTheDocument();

    const homeButtonEl = screen.getByRole('button', { name: 'Home' });
    expect(homeButtonEl).toBeInTheDocument();

    const teachersButtonEl = screen.getByRole('button', { name: 'Teachers' });
    expect(teachersButtonEl).toBeInTheDocument();

    const classesButtonEl = screen.getByRole('button', { name: 'Classes' });
    expect(classesButtonEl).toBeInTheDocument();

    const studentsButtonEl = screen.getByRole('button', { name: 'Students' });
    expect(studentsButtonEl).toBeInTheDocument();
  });
});
