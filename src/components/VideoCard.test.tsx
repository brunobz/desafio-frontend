import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoCard } from './VideoCard';
import type { YouTubeVideo } from '../types/youtube';

const mockVideo: YouTubeVideo = {
  id: 'abc123',
  snippet: {
    title: 'Test Video',
    description: 'This is a test video description',
    thumbnails: {
      medium: {
        url: 'https://example.com/thumb.jpg',
      },
    },
  },
} as YouTubeVideo;

describe('VideoCard', () => {
  it('renders image, title, and description', () => {
    const onClick = vi.fn();
    render(<VideoCard video={mockVideo} onClick={onClick} />);

    const img = screen.getByAltText(mockVideo.snippet.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockVideo.snippet.thumbnails.medium?.url);

    expect(screen.getByText(mockVideo.snippet.title)).toBeInTheDocument();
    expect(screen.getByText(mockVideo.snippet.description)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<VideoCard video={mockVideo} onClick={onClick} />);

    const card = screen.getByText(mockVideo.snippet.title).parentElement!;
    fireEvent.click(card);

    expect(onClick).toHaveBeenCalledOnce();
    expect(onClick).toHaveBeenCalledWith(mockVideo);
  });
});
