import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/UI/Input';

describe('Input Component', () => {
  it('renders the input element', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('merges custom className', () => {
    render(<Input placeholder="Custom" className="custom-input" />);
    const input = screen.getByPlaceholderText('Custom');
    expect(input).toHaveClass('custom-input');
  });

  it('updates value on change', () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input.value).toBe('Hello');
  });

  it('supports other props like type', () => {
    render(<Input placeholder="Password" type="password" />);
    const input = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');
  });
});
