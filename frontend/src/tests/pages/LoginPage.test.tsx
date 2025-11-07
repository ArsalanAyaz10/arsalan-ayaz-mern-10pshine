import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import API from '../../api/axios';
import toast from 'react-hot-toast';

// Mock Axios
jest.mock('../../api/axios', () => ({
  post: jest.fn(),
  defaults: { headers: { common: {} } },
}));

// Mock Toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

// Mock Navigation
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  it('renders email, password inputs and Login button', () => {
    setup();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows error message & toast when fields are empty on submit', async () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(/fill in all fields/i);
      expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/fill in all fields/i));
    });
  });

  it('calls API and navigates to dashboard on successful login', async () => {
    const mockUser = { name: 'John', email: 'john@example.com' };
    const mockToken = 'mockToken123';

    (API.post as jest.Mock).mockResolvedValueOnce({
      data: { accessToken: mockToken, user: mockUser },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(API.post).toHaveBeenCalledWith('/auth/login', {
        email: 'john@example.com',
        password: 'password123',
      });
    });

    expect(localStorage.getItem('accessToken')).toBe(mockToken);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
    expect(API.defaults.headers.common['Authorization']).toBe(`Bearer ${mockToken}`);

    expect(toast.success).toHaveBeenCalledWith(expect.stringMatching(/welcome back/i));
    expect(mockedNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('shows UI error and toast on failed login', async () => {
    (API.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    setup();

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(/invalid credentials/i);
      expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  it('toggles show/hide password', () => {
    setup();

    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
    const toggleButton = screen.getByLabelText('toggle-password');

    expect(passwordInput.type).toBe('password');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });
});
