import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../../pages/SignupPage';
import { BrowserRouter } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';

jest.mock('../../api/axios', () => ({
  post: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Signup Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

  it('renders all input fields and submit button', () => {
    setup();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Re-enter password')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  it('shows error if password is too short', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Enter your username'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'short' } });
    fireEvent.change(screen.getByPlaceholderText('Re-enter password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Create Account'));

    expect(await screen.findByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  it('shows error if passwords do not match', async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Re-enter password'), { target: { value: 'different123' } });
    fireEvent.click(screen.getByText('Create Account'));

    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
  });

  it('calls API and navigates on successful signup', async () => {
    (API.post as jest.Mock).mockResolvedValueOnce({ data: { message: 'Success' } });

    setup();
    fireEvent.change(screen.getByPlaceholderText('Enter your username'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Re-enter password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Create Account'));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith('/auth/register', {
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      });
    });

    expect(toast.success).toHaveBeenCalledWith('Account created successfully! Please login.');
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  it('toggles show/hide password fields', () => {
    setup();
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
    const toggleButton = screen.getAllByRole('button')[0]; 

    expect(passwordInput.type).toBe('password');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
});
