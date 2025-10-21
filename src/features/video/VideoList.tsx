import React from 'react';
import type { YouTubeVideo } from '../../types/youtube';
import { VideoCard } from '../../components/VideoCard';

interface VideoListProps {
  videos: YouTubeVideo[];
  onSelect: (video: YouTubeVideo) => void;
}

export const VideoList: React.FC<VideoListProps> = ({ videos, onSelect }) => {
  return (
    <div className="flex flex-col gap-3" role="list" aria-label="Related videos">
      {videos.slice(0, 3).map((video) => (
        <div role="listitem" key={typeof video.id === 'string' ? video.id : video.id.videoId}>
          <VideoCard video={video} onClick={onSelect} />
        </div>
      ))}
    </div>
  );
};
