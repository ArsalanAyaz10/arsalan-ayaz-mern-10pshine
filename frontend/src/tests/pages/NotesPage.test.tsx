import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyNotes from '../../pages/NotesPage';
import { BrowserRouter } from 'react-router-dom';
import API from '../../api/axios';

jest.mock('../../api/axios', () => ({
  get: jest.fn(),
}));

jest.mock('../../components/SideNavbar', () => () => <div>SideNavbar</div>);
jest.mock('../../components/NoteCard', () => ({ note }: any) => <div>{note.title}</div>);
jest.mock('../../components/UI/Button', () => ({ children, ...props }: any) => <button {...props}>{children}</button>);

describe('MyNotes Page', () => {
  const mockNotes = [
    { _id: '1', title: 'Note 1', content: 'Content 1', createdAt: '2025-01-01' },
    { _id: '2', title: 'Note 2', content: 'Content 2', createdAt: '2025-01-02' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <MyNotes />
      </BrowserRouter>
    );

  it('renders loading state initially', async () => {
    (API.get as jest.Mock).mockResolvedValueOnce({ data: { notes: [] } });
    setup();
    expect(screen.getByText(/loading your notes/i)).toBeInTheDocument();
    await waitFor(() => expect(API.get).toHaveBeenCalledWith('/notes/fetch'));
  });

  it('renders notes after API call', async () => {
    (API.get as jest.Mock).mockResolvedValueOnce({ data: { notes: mockNotes } });
    setup();
    await waitFor(() => {
      mockNotes.forEach(note => {
        expect(screen.getByText(note.title)).toBeInTheDocument();
      });
    });
  });

  it('shows empty state if no notes', async () => {
    (API.get as jest.Mock).mockResolvedValueOnce({ data: { notes: [] } });
    setup();
    await waitFor(() => {
      expect(screen.getByText(/you don’t have any notes yet/i)).toBeInTheDocument();
     expect(screen.getByText('+ Create Your First Note')).toBeInTheDocument();
});
  });

  it('filters notes based on search input', async () => {
    (API.get as jest.Mock).mockResolvedValueOnce({ data: { notes: mockNotes } });
    setup();
    await waitFor(() => expect(screen.getByText('Note 1')).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText(/search your notes/i);
    fireEvent.change(searchInput, { target: { value: 'Note 2' } });

    expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
  });

  it('navigates to create note page on button click', async () => {
    (API.get as jest.Mock).mockResolvedValueOnce({ data: { notes: [] } });
    setup();
    await waitFor(() => expect(screen.getByText(/you don’t have any notes yet/i)).toBeInTheDocument());

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); //create note btn
    
    });
});
