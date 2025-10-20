import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoRecommended } from './VideoRecommended';
import type { YouTubeVideo } from '../../types/youtube';

vi.mock('../../components/VideoCard', () => ({
  VideoCard: ({
    video,
    onClick,
  }: {
    video: YouTubeVideo;
    onClick: (video: YouTubeVideo) => void;
  }) => (
    <div data-testid="video-card" onClick={() => onClick(video)}>
      {video.snippet.title}
    </div>
  ),
}));

const mockVideos: YouTubeVideo[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `${i + 1}`,
  snippet: { title: `Video ${i + 1}` },
})) as YouTubeVideo[];

describe('VideoRecommended', () => {
  it('renders the section title', () => {
    render(<VideoRecommended videos={mockVideos} onSelect={vi.fn()} />);
    expect(screen.getByText('More Videos / Recommended')).toBeInTheDocument();
  });

  it('renders up to 10 videos', () => {
    render(<VideoRecommended videos={mockVideos} onSelect={vi.fn()} />);
    const renderedVideos = screen.getAllByTestId('video-card');
    expect(renderedVideos).toHaveLength(10);
  });

  it('calls onSelect when a video is clicked', () => {
    const onSelect = vi.fn();
    render(<VideoRecommended videos={mockVideos} onSelect={onSelect} />);

    const firstVideo = screen.getAllByTestId('video-card')[0];
    fireEvent.click(firstVideo);

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(mockVideos[0]);
  });

  it('renders nothing when videos array is empty', () => {
    render(<VideoRecommended videos={[]} onSelect={vi.fn()} />);
    const renderedVideos = screen.queryAllByTestId('video-card');
    expect(renderedVideos).toHaveLength(0);
  });
});
