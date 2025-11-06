import { render, screen } from '@testing-library/react';
import { Card, CardContent } from '../../components/UI/Card';

describe('Card Component', () => {
  it('renders children inside Card', () => {
    render(
      <Card>
        <p>Card Child</p>
      </Card>
    );
    expect(screen.getByText('Card Child')).toBeInTheDocument();
  });

  it('applies default classes to Card', () => {
    render(
      <Card>
        <p>Card</p>
      </Card>
    );
    const card = screen.getByText('Card').parentElement; // parent div
    expect(card).toHaveClass('bg-white', 'rounded-2xl', 'shadow-lg');
  });

  it('merges custom className in Card', () => {
    render(
      <Card className="custom-card">
        <p>Card</p>
      </Card>
    );
    const card = screen.getByText('Card').parentElement;
    expect(card).toHaveClass('custom-card');
  });
});

describe('CardContent Component', () => {
  it('renders children inside CardContent', () => {
    render(
      <CardContent>
        <p>Content Child</p>
      </CardContent>
    );
    expect(screen.getByText('Content Child')).toBeInTheDocument();
  });

  it('applies default classes to CardContent', () => {
    render(
      <CardContent>
        <p>Content</p>
      </CardContent>
    );
    const content = screen.getByText('Content').parentElement;
    expect(content).toHaveClass('p-6');
  });

  it('merges custom className in CardContent', () => {
    render(
      <CardContent className="custom-content">
        <p>Content</p>
      </CardContent>
    );
    const content = screen.getByText('Content').parentElement;
    expect(content).toHaveClass('custom-content');
  });
});
