import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SearchBar } from './SearchBar';
import searchReducer from './searchSlice';

const renderWithStore = (ui: React.ReactElement, preloadedState?: unknown) => {
  const store = configureStore({
    reducer: { search: searchReducer },
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('SearchBar Component', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the input and search button', () => {
    renderWithStore(<SearchBar onSubmit={mockOnSubmit} />);
    expect(screen.getByPlaceholderText(/search videos/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input text when typing', () => {
    renderWithStore(<SearchBar onSubmit={mockOnSubmit} />);
    const input = screen.getByPlaceholderText(/search videos/i);
    fireEvent.change(input, { target: { value: 'React' } });
    expect((input as HTMLInputElement).value).toBe('React');
  });

  it('calls onSubmit and dispatches Redux actions on button click', () => {
    renderWithStore(<SearchBar onSubmit={mockOnSubmit} />);
    const input = screen.getByPlaceholderText(/search videos/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Vitest tutorial' } });
    fireEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith('Vitest tutorial');
  });

  it('calls onSubmit when pressing Enter key', () => {
    renderWithStore(<SearchBar onSubmit={mockOnSubmit} />);
    const input = screen.getByPlaceholderText(/search videos/i);
    fireEvent.change(input, { target: { value: 'React Testing Library' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnSubmit).toHaveBeenCalledWith('React Testing Library');
  });

  it('renders and handles history suggestions', async () => {
    const preloadedState = {
      search: {
        lastQuery: '',
        history: ['react', 'redux toolkit', 'vitest'],
      },
    };

    renderWithStore(<SearchBar onSubmit={mockOnSubmit} />, preloadedState);
    const input = screen.getByPlaceholderText(/search videos/i);

    fireEvent.change(input, { target: { value: 'r' } });

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);

    fireEvent.mouseDown(options[0]);
    expect(mockOnSubmit).toHaveBeenCalledWith('react');
  });

  it('hides suggestions when clicking outside', async () => {
    const preloadedState = {
      search: {
        lastQuery: '',
        history: ['react', 'redux toolkit', 'vitest'],
      },
    };

    renderWithStore(<SearchBar onSubmit={mockOnSubmit} />, preloadedState);
    const input = screen.getByPlaceholderText(/search videos/i);
    fireEvent.change(input, { target: { value: 'React' } });

    const listbox = await screen.findByRole('listbox', { hidden: false });
    expect(listbox).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
