import { render, screen, fireEvent } from '@testing-library/react';
import NoteCard from '../../components/NoteCard';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('NoteCard Component', () => {
  const note = {
    _id: '123',
    title: 'Test Note',
    content: '<p>This is <b>HTML</b> content</p>',
    createdAt: '2025-11-05T15:00:00.000Z',
  };

  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('renders the note title', () => {
    render(<NoteCard note={note} />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });

  it('renders the stripped note content', () => {
    render(<NoteCard note={note} />);
    expect(screen.getByText('This is HTML content')).toBeInTheDocument();
  });

  it('renders the formatted creation date', () => {
    render(<NoteCard note={note} />);
    expect(screen.getByText(new Date(note.createdAt).toLocaleDateString())).toBeInTheDocument();
  });

  it('navigates to the note detail page on click', () => {
    render(<NoteCard note={note} />);
    const card = screen.getByText('Test Note').closest('div'); // the wrapper div
    if (!card) throw new Error('Card div not found');
    fireEvent.click(card);
    expect(mockedNavigate).toHaveBeenCalledWith(`/note/${note._id}`);
  });
});
