import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/UI/Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-blue-600 text-white');
  });

  it('applies secondary variant when specified', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-gray-200 text-gray-800');
  });

  it('applies danger variant when specified', () => {
    render(<Button variant="danger">Danger</Button>);
    const button = screen.getByText('Danger');
    expect(button).toHaveClass('bg-red-500 text-white');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('merges additional className props', () => {
    render(<Button className="custom-class">Styled</Button>);
    const button = screen.getByText('Styled');
    expect(button).toHaveClass('custom-class');
  });
});
