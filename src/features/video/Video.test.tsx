import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VideoList } from './VideoList';
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

const mockVideos: YouTubeVideo[] = [
  { id: '1', snippet: { title: 'Video 1' } } as YouTubeVideo,
  { id: '2', snippet: { title: 'Video 2' } } as YouTubeVideo,
  { id: '3', snippet: { title: 'Video 3' } } as YouTubeVideo,
  { id: '4', snippet: { title: 'Video 4' } } as YouTubeVideo,
];

describe('VideoList', () => {
  it('renders up to 3 videos', () => {
    const onSelect = vi.fn();
    render(<VideoList videos={mockVideos} onSelect={onSelect} />);

    const renderedVideos = screen.getAllByTestId('video-card');
    expect(renderedVideos).toHaveLength(3);

    expect(renderedVideos[0]).toHaveTextContent('Video 1');
    expect(renderedVideos[1]).toHaveTextContent('Video 2');
    expect(renderedVideos[2]).toHaveTextContent('Video 3');
  });

  it('calls onSelect when a video is clicked', () => {
    const onSelect = vi.fn();
    render(<VideoList videos={mockVideos} onSelect={onSelect} />);

    const firstVideo = screen.getAllByTestId('video-card')[0];
    fireEvent.click(firstVideo);

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith(mockVideos[0]);
  });

  it('renders nothing when videos array is empty', () => {
    const onSelect = vi.fn();
    render(<VideoList videos={[]} onSelect={onSelect} />);

    const renderedVideos = screen.queryAllByTestId('video-card');
    expect(renderedVideos).toHaveLength(0);
  });
});
