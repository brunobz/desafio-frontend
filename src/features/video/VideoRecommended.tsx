import React from 'react';
import type { YouTubeVideo } from '../../types/youtube';
import { VideoCard } from '../../components/VideoCard';

interface VideoRecommendedProps {
  videos: YouTubeVideo[];
  onSelect: (video: YouTubeVideo) => void;
}

export const VideoRecommended: React.FC<VideoRecommendedProps> = ({ videos, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h3 className="font-semibold mb-3">More Videos / Recommended</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {videos.slice(0, 10).map((video) => (
          <VideoCard
            key={typeof video.id === 'string' ? video.id : video.id.videoId}
            video={video}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
};
