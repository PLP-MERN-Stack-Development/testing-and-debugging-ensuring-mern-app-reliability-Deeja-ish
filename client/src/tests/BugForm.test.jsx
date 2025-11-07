import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BugForm from '../components/BugForm';

describe('BugForm', () => {
  it('renders the form with title and description fields', () => {
    render(<BugForm onReportBug={() => {}} />);

    // Check if form elements are present
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /submit bug/i })
    ).toBeInTheDocument();
  });

  it('calls onReportBug with form data when submitted', () => {
    const mockOnReportBug = vi.fn(); 
    render(<BugForm onReportBug={mockOnReportBug} />);

    // Get form elements
    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /submit bug/i });

    // Simulate user typing
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Check if the mock function was called with the correct data
    expect(mockOnReportBug).toHaveBeenCalledTimes(1);
    expect(mockOnReportBug).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
    });
  });

  it('clears the form after submission', () => {
    render(<BugForm onReportBug={() => {}} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /submit bug/i });

    // Fill form
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });

    // Submit
    fireEvent.click(submitButton);

    // Check if inputs are cleared
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
});