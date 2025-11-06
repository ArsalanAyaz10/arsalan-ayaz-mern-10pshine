import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { Navigate } from 'react-router-dom';

// Mock Navigate component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: ({ to }: { to: string }) => <div data-testid="navigate">Redirect to {to}</div>,
}));

describe('ProtectedRoute Component', () => {
  const CHILD_TEXT = 'Protected Content';

  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to /login if no user or token', () => {
    render(
      <ProtectedRoute>
        <div>{CHILD_TEXT}</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId('navigate')).toHaveTextContent('Redirect to /login');
  });

  it('renders children if user and token exist', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'John' }));
    localStorage.setItem('accessToken', 'fake-token');

    render(
      <ProtectedRoute>
        <div>{CHILD_TEXT}</div>
      </ProtectedRoute>
    );

    expect(screen.getByText(CHILD_TEXT)).toBeInTheDocument();
  });
});
