import React, { useState } from "react";
import { SearchBar } from "../search/SearchBar";
import { VideoPlayer } from "../video/VideoPlayer";
import { VideoList } from "../video/VideoList";
import { VideoRecommended } from "../video/VideoRecommended";
import { useSearchVideosQuery } from "../../services/youtubeApi";
import type { YouTubeVideo } from "../../types/youtube";

export const Home: React.FC = () => {
  const [query, setQuery] = useState("React tutorials");
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const { data, isLoading } = useSearchVideosQuery({ q: query });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!data) return <p>No videos found</p>;

  const videos = data.items;

  const submitSearch = (value: string) => {
    if(value) {
       setQuery(value)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
      {/* Header */}
      <div className="col-span-12 md:col-span-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-600">YouTube</h1>
        <div className="flex-1 ml-4">
          <SearchBar onSubmit={submitSearch} />
        </div>
      </div>

      {/* Main content */}
      <div className="col-span-12 md:col-span-8">
        {selectedVideo ? (
          <VideoPlayer
            videoUrl={`https://www.youtube.com/embed/${
              typeof selectedVideo?.id === "string"
                ? selectedVideo.id
                : selectedVideo.id.videoId
            }`}
            title={selectedVideo.snippet.title}
            channelTitle={selectedVideo.snippet.channelTitle}
            description={selectedVideo.snippet.description}
            publishedAt={selectedVideo.snippet.publishedAt}
          />
        ) : (
          <VideoPlayer
            videoUrl={`https://www.youtube.com/embed/${
              typeof videos[0]?.id === "string" ? videos[0].id : videos[0].id.videoId
            }`}
            title={videos[0].snippet.title}
            channelTitle={videos[0].snippet.channelTitle}
            description={videos[0].snippet.description}
            publishedAt={videos[0].snippet.publishedAt}
          />
        )}
      </div>

      <div className="col-span-12 md:col-span-3">
        <VideoList videos={videos.slice(1, 4)} onSelect={setSelectedVideo} />
      </div>

      <div className="col-span-12">
        <VideoRecommended videos={videos.slice(4)} onSelect={setSelectedVideo} />
      </div>
    </div>
  );
};