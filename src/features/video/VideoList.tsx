import React from "react";
import type { YouTubeVideo } from "../../types/youtube";
import { VideoCard } from "../../components/VideoCard";

interface VideoListProps {
  videos: YouTubeVideo[];
  onSelect: (video: YouTubeVideo) => void;
}

export const VideoList: React.FC<VideoListProps> = ({ videos, onSelect }) => {
  return (
    <div className="flex flex-col gap-3">
      {videos.slice(0, 3).map((video) => (
        <VideoCard key={typeof video.id === "string" ? video.id : video.id.videoId} video={video} onClick={onSelect} />
      ))}
    </div>
  );
};