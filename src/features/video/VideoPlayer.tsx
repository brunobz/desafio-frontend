import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  channelTitle,
  publishedAt,
  description,
}) => {
  return (
    <section
      className="bg-white rounded-xl shadow p-3 flex flex-col"
      aria-label={`Video player for ${title}`}
    >
      <iframe
        src={videoUrl}
        title={`YouTube video player: ${title}`}
        allowFullScreen
        className="w-full aspect-video rounded-lg"
      ></iframe>

      <div className="mt-3">
        <h2 className="text-lg font-semibold" id={`video-title-${title}`}>
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-1" aria-labelledby={`video-title-${title}`}>
          {description}
        </p>
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>{channelTitle}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </section>
  );
};
