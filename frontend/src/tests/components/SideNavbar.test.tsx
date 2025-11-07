import { render, screen, fireEvent } from '@testing-library/react';
import SideNavbar from '../../components/SideNavbar';
import { useLocation } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

// Mock useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('SideNavbar Component', () => {
  const mockedUseLocation = useLocation as jest.Mock;

  beforeEach(() => {
    mockedUseLocation.mockReturnValue({ pathname: '/dashboard' });
  });

  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <SideNavbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('My Notes')).toBeInTheDocument();
    expect(screen.getByText('About Project')).toBeInTheDocument();
  });

  it('toggles sidebar width when menu button is clicked', () => {
    render(
      <BrowserRouter>
        <SideNavbar />
      </BrowserRouter>
    );

    const aside = screen.getByRole('complementary'); // <aside> semantic role
    const button = screen.getByRole('button');

    // Initial state: open
    expect(aside.className).toContain('w-56');

    // Click to close
    fireEvent.click(button);
    expect(aside.className).toContain('w-16');

    // Click to open again
    fireEvent.click(button);
    expect(aside.className).toContain('w-56');
  });

  it('highlights the active link based on pathname', () => {
    render(
      <BrowserRouter>
        <SideNavbar />
      </BrowserRouter>
    );

    const activeLink = screen.getByText('Dashboard').closest('a');
    expect(activeLink).toHaveClass('bg-blue-200 text-blue-800 font-semibold');
  });
});
