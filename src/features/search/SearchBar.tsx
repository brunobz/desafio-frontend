import React, { useState, useCallback } from 'react';
import { useSearchVideosQuery } from '../../services/youtubeApi';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppHooks';
import { addToHistory, setLastQuery } from './searchSlice';
import type { YoutubeVideo } from '../../types/youtube';

export const SearchBar: React.FC = () => {
  const [q, setQ] = useState('');
  const dispatch = useAppDispatch();
  const lastQuery = useAppSelector((s) => s.search.lastQuery);

  // debounced
  const handleSearch = useCallback(() => {
    if (!q.trim()) return;
    dispatch(addToHistory(q.trim()));
    dispatch(setLastQuery(q.trim()));
  }, [q, dispatch]);

  // Use RTK Query with the lastQuery (so it triggers network when confirmed)
  const { data, isLoading, error } = useSearchVideosQuery({ q: lastQuery ?? '', pageToken: undefined }, {
    skip: !lastQuery,
  });

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Search videos..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="px-3 py-2 bg-slate-800 text-white rounded" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="mt-4">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data && (
          <ul>
            {data.items.map((it: YoutubeVideo) => (
              <li key={typeof it.id === 'string' ? it.id : (it.id.videoId ?? Math.random())}>
                {it.snippet.title} — {it.snippet.channelTitle}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};