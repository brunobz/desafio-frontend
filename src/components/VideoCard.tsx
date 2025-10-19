import React from "react";
import type { YouTubeVideo } from "../types/youtube";

interface VideoCardProps {
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {

  return (
    <div
      onClick={() => onClick(video)}
      className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition p-2"
    >
      <img
        src={video.snippet.thumbnails.medium?.url}
        alt={video.snippet.title}
        className="rounded-lg w-full"
      />
      <h3 className="font-semibold text-sm mt-1">{video.snippet.title}</h3>
      <p className="text-xs text-gray-500 line-clamp-2">{video.snippet.description}</p>
    </div>
  );
};