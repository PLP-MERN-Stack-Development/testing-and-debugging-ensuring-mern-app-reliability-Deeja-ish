import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import bugService from '../services/bugService';


vi.mock('../services/bugService');

// Mock data
const mockBugs = [
  {
    _id: '1',
    title: 'Bug 1',
    description: 'Desc 1',
    status: 'Open',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Bug 2',
    description: 'Desc 2',
    status: 'In-Progress',
    createdAt: new Date().toISOString(),
  },
];

describe('App', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Mock the default implementation for getBugs
    bugService.getBugs.mockResolvedValue(mockBugs);
    bugService.reportBug.mockResolvedValue({
      _id: '3',
      title: 'New Test Bug',
      description: 'New Desc',
      status: 'Open',
      createdAt: new Date().toISOString(),
    });
    bugService.deleteBug.mockResolvedValue({ id: '1' });
  });

  it('fetches and renders the list of bugs on load', async () => {
    render(<App />);

    // Show loading state first
    expect(screen.getByText(/loading bugs/i)).toBeInTheDocument();

    // Wait for the bugs to be loaded and rendered
    expect(await screen.findByText('Bug 1')).toBeInTheDocument();
    expect(await screen.findByText('Bug 2')).toBeInTheDocument();


    expect(screen.queryByText(/loading bugs/i)).not.toBeInTheDocument();
    expect(bugService.getBugs).toHaveBeenCalledTimes(1);
  });

  it('reports a new bug and adds it to the list', async () => {
    render(<App />);

    // Wait for initial bugs to load
    await screen.findByText('Bug 1');

    // Fill out and submit the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'New Test Bug' },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'New Desc' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit bug/i }));

    // Wait for the new bug to appear in the document
    expect(await screen.findByText('New Test Bug')).toBeInTheDocument();

    // Check if the service was called
    expect(bugService.reportBug).toHaveBeenCalledWith({
      title: 'New Test Bug',
      description: 'New Desc',
    });
  });

  it('deletes a bug when delete button is clicked', async () => {
    // Mock window.confirm to always return true
    vi.spyOn(window, 'confirm').mockImplementation(() => true);

    render(<App />);

    // Wait for initial bugs to load
    await screen.findByText('Bug 1');
    expect(screen.getByText('Bug 2')).toBeInTheDocument();


    const bugItems = screen.getAllByRole('heading', { name: /bug \d/i });
    const bug1Item = bugItems.find((el) => el.textContent === 'Bug 1')
      .closest('.bug-item');
    const deleteButton = bug1Item.querySelector('.delete-btn');

    // Click the delete button
    fireEvent.click(deleteButton);

    // Wait for the UI to update
    await waitFor(() => {
      expect(screen.queryByText('Bug 1')).not.toBeInTheDocument();
    });

    // 'Bug 2' should still be there
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
    expect(bugService.deleteBug).toHaveBeenCalledWith('1');
  });
});