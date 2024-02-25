import { screen } from '@testing-library/react';
import HomeSideBar from './HomeSideBar';
import { renderWithProviders } from '../../utils/utils-for-tests';

describe('Home Side Bar', () => {
  test('renders correctly', () => {
    renderWithProviders(<HomeSideBar />);

    const addTeacherButton = screen.getByText('Add Teacher');
    expect(addTeacherButton).toBeInTheDocument();

    const addClassButton = screen.getByText('Add Class');
    expect(addClassButton).toBeInTheDocument();

    const addStudentButton = screen.getByText('Add Student');
    expect(addStudentButton).toBeInTheDocument();
  });
});
