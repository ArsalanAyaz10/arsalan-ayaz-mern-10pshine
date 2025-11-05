import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

import '@testing-library/jest-dom';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('renders the brand name', () => {
    render(<Navbar />);
    const brand = screen.getByText('NoteKro');
    expect(brand).toBeInTheDocument();
  });

  it('navigates to /dashboard when brand is clicked', () => {
    render(<Navbar />);
    const brand = screen.getByText('NoteKro');
    fireEvent.click(brand);
    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('navigates to /profile when user icon is clicked', () => {
    render(<Navbar />);
    const userIcon = screen.getByLabelText('profile-icon'); 
    fireEvent.click(userIcon);
    expect(mockedNavigate).toHaveBeenCalledWith('/profile');
  });
});
