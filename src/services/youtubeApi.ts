import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { YoutubeSearchResponse } from '../types/youtube';

const API_KEY = import.meta.env.VITE_YT_API_KEY;
const BASE = 'https://www.googleapis.com/youtube/v3';

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  endpoints: (builder) => ({
    searchVideos: builder.query<YoutubeSearchResponse, { q: string; pageToken?: string }>({
      query: ({ q, pageToken }) => {
        const params = new URLSearchParams({
          key: API_KEY,
          part: 'snippet',
          maxResults: '12',
          q,
          type: 'video',
        });
        if (pageToken) params.set('pageToken', pageToken);
        return `search?${params.toString()}`;
      },
    }),
    getVideosByIds: builder.query<unknown, string>({
      query: (ids) => {
        const params = new URLSearchParams({
          key: API_KEY,
          part: 'snippet,statistics,contentDetails',
          id: ids,
        });
        return `videos?${params.toString()}`;
      },
    }),
  }),
});

export const { useSearchVideosQuery, useGetVideosByIdsQuery } = youtubeApi;
