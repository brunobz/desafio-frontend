import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../../features/search/searchSlice';
import { youtubeApi, useSearchVideosQuery } from '../../services/youtubeApi';
import { Home } from './Home';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useSelector: vi
      .fn()
      .mockImplementation((selector) =>
        selector({ auth: { token: null }, search: { history: [] } }),
      ),
    useDispatch: vi.fn().mockReturnValue(vi.fn()),
  };
});

vi.mock('@react-oauth/google', async () => {
  const actual = await vi.importActual('@react-oauth/google');
  return {
    ...actual,
    useGoogleLogin: () => vi.fn(), // mock apenas para não quebrar
  };
});

vi.mock('../../services/youtubeApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../services/youtubeApi')>();
  const mockUseSearchVideosQuery = vi.fn();

  return {
    ...actual,
    useSearchVideosQuery: mockUseSearchVideosQuery,
  };
});

const mockUseSearchVideosQuery = useSearchVideosQuery as unknown as ReturnType<typeof vi.fn>;

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      [youtubeApi.reducerPath]: youtubeApi.reducer,
      search: searchReducer,
    },
    preloadedState: {
      search: { history: [], lastQuery: '' },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(youtubeApi.middleware),
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Home Component', () => {
  const mockVideos = {
    items: [
      {
        id: { videoId: 'abc123' },
        snippet: {
          title: 'React Tutorial',
          description: 'Learn React step by step',
          channelTitle: 'React Channel',
          publishedAt: '2024-01-01T00:00:00Z',
          thumbnails: { medium: { url: 'https://img.youtube.com/1.jpg' } },
        },
      },
      {
        id: { videoId: 'def456' },
        snippet: {
          title: 'Redux Toolkit Intro',
          description: 'Using Redux Toolkit effectively',
          channelTitle: 'Redux Guru',
          publishedAt: '2024-01-02T00:00:00Z',
          thumbnails: { medium: { url: 'https://img.youtube.com/2.jpg' } },
        },
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseSearchVideosQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: vi.fn(),
    });

    renderWithProviders(<Home />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/loading videos/i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseSearchVideosQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500 },
      refetch: vi.fn(),
    });

    renderWithProviders(<Home />);
    expect(screen.getByText(/something went wrong while loading videos/i)).toBeInTheDocument();
  });

  it('renders "no videos found" message', () => {
    mockUseSearchVideosQuery.mockReturnValue({
      data: { items: [] },
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    });

    renderWithProviders(<Home />);
    expect(screen.getByText(/no videos found/i)).toBeInTheDocument();
  });

  it('renders video player and list when data is available', () => {
    mockUseSearchVideosQuery.mockReturnValue({
      data: mockVideos,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    });

    renderWithProviders(<Home />);

    expect(screen.getByLabelText(/main video player/i)).toBeInTheDocument();
    expect(screen.getByText('React Tutorial')).toBeInTheDocument();
    expect(screen.getAllByLabelText(/related videos/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/recommended videos/i)).toBeInTheDocument();
  });

  it('changes query when a new search is submitted', async () => {
    mockUseSearchVideosQuery.mockReturnValue({
      data: mockVideos,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    });

    renderWithProviders(<Home />);

    const input = screen.getByPlaceholderText(/search videos/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Next.js tutorial' } });
    fireEvent.click(button);

    await waitFor(() => {
      const calls = mockUseSearchVideosQuery.mock.calls;
      expect(calls.some(([arg]) => arg.q === 'Next.js tutorial')).toBe(true);
    });
  });
});
