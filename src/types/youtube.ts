export interface YoutubeVideo {
  id: { videoId: string } | string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export interface YoutubeSearchResponse {
  kind: string;
  etag?: string;
  nextPageToken?: string;
  prevPageToken?: string;
  items: YoutubeVideo[];
}