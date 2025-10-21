import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';

const mockProps = {
  videoUrl: 'https://www.youtube.com/embed/test-video',
  title: 'Test Video',
  channelTitle: 'Test Channel',
  publishedAt: '2025-10-01T12:00:00Z',
  description: 'This is a test description.',
};

describe('VideoPlayer', () => {
  it('renders iframe with correct src and title', () => {
    render(<VideoPlayer {...mockProps} />);
    const iframe = screen.getByTitle(
      `YouTube video player: ${mockProps.title}`,
    ) as HTMLIFrameElement;

    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', mockProps.videoUrl);
    expect(iframe).toHaveAttribute('allowFullScreen');
  });

  it('renders title, description, channel, and published date', () => {
    render(<VideoPlayer {...mockProps} />);

    expect(screen.getByRole('heading', { name: mockProps.title })).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(mockProps.channelTitle)).toBeInTheDocument();

    const formattedDate = new Date(mockProps.publishedAt).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
