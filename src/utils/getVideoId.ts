import type { YouTubeVideo } from '../types/youtube';

/** Safely extracts the videoId whether it's a string or object */
export function getVideoId(video: YouTubeVideo): string {
  if (!video) return '';
  const id = video.id;
  if (typeof id === 'string') return id;
  if (id && typeof id === 'object' && 'videoId' in id) {
    return id.videoId;
  }
  return '';
}
