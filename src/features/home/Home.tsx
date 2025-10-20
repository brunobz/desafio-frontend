import React, { useState } from 'react';
import { SearchBar } from '../search/SearchBar';
import { VideoPlayer } from '../video/VideoPlayer';
import { VideoList } from '../video/VideoList';
import { VideoRecommended } from '../video/VideoRecommended';
import { useSearchVideosQuery } from '../../services/youtubeApi';
import type { YouTubeVideo } from '../../types/youtube';
import { LoaderCircle } from 'lucide-react';
import { getVideoId } from '../../utils/getVideoId';

export const Home: React.FC = () => {
  const [query, setQuery] = useState('React tutorials');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const { data, isLoading, error } = useSearchVideosQuery({ q: query });

  const submitSearch = (value: string) => {
    if (value.trim()) setQuery(value);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen" role="status" aria-live="polite">
        <LoaderCircle className="animate-spin text-red-500 w-8 h-8" />
        <span className="ml-2 text-gray-600">Loading videos...</span>
      </div>
    );

  if (error)
    return (
      <p role="alert" className="text-center text-red-500 mt-10">
        Something went wrong while loading videos.
      </p>
    );

  if (!data || !data.items.length)
    return (
      <p role="alert" className="text-center text-gray-600 mt-10">
        No videos found for this search.
      </p>
    );

  const videos = data.items;

  return (
    <main className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4" role="main">
      {/* Header */}
      <header
        className="col-span-12 md:col-span-8 flex items-center justify-between"
        aria-label="YouTube header"
      >
        <h1 className="text-2xl font-bold text-red-600" aria-label="YouTube logo">
          YouTube
        </h1>
        <div className="flex-1 ml-4">
          <SearchBar onSubmit={submitSearch} />
        </div>
      </header>

      {/* Main video player */}
      <section className="col-span-12 md:col-span-8" aria-label="Main video player">
        <VideoPlayer
          videoUrl={`https://www.youtube.com/embed/${getVideoId(selectedVideo ?? videos[0])}`}
          title={selectedVideo?.snippet.title ?? videos[0].snippet.title}
          channelTitle={selectedVideo?.snippet.channelTitle ?? videos[0]?.snippet.channelTitle}
          description={selectedVideo?.snippet.description ?? videos[0].snippet.description}
          publishedAt={selectedVideo?.snippet.publishedAt ?? videos[0].snippet.publishedAt}
        />
      </section>

      {/* Sidebar list */}
      <aside className="col-span-12 md:col-span-3" aria-label="Related videos" role="complementary">
        <VideoList videos={videos.slice(1, 4)} onSelect={setSelectedVideo} />
      </aside>

      {/* Recommended section */}
      <section className="col-span-12" aria-label="Recommended videos">
        <VideoRecommended videos={videos.slice(4)} onSelect={setSelectedVideo} />
      </section>
    </main>
  );
};
