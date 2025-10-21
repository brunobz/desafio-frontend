import React from 'react';
import type { YouTubeVideo } from '../types/youtube';

interface VideoCardProps {
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const title = video.snippet.title;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(video)}
      className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      aria-label={`Watch video: ${title}`}
    >
      <img src={video.snippet.thumbnails.medium?.url} alt={title} className="rounded-lg w-full" />
      <h3 className="font-semibold text-sm mt-1 truncate" title={title}>
        {title}
      </h3>
      <p className="text-xs text-gray-500 line-clamp-2">{video.snippet.description}</p>
    </div>
  );
};
