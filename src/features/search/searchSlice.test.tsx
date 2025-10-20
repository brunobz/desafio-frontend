import { describe, it, expect, beforeEach, vi } from 'vitest';
import reducer, { addToHistory, clearHistory, setLastQuery, type SearchState } from './searchSlice';

describe('searchSlice', () => {
  let initialState = { history: [], lastQuery: null };

  beforeEach(() => {
    initialState = { history: [], lastQuery: null };
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    });
  });

  it('should handle initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state.history).toEqual([]);
    expect(state.lastQuery).toBeNull();
  });

  it('addToHistory adds a new query at the beginning', () => {
    const state = reducer(initialState, addToHistory('test'));
    expect(state.history).toEqual(['test']);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'search_history_v1',
      JSON.stringify(['test']),
    );
  });

  it('addToHistory trims and avoids duplicates', () => {
    let state: SearchState = { history: [], lastQuery: null };
    state = reducer(state, addToHistory(' old '));
    expect(state.history).toEqual(['old']);
  });

  it('addToHistory limits history to 10 items', () => {
    let state: SearchState = {
      history: Array.from({ length: 10 }, (_, i) => `item${i}`),
      lastQuery: null,
    };
    state = reducer(state, addToHistory('new'));
    expect(state.history).toHaveLength(10);
    expect(state.history[0]).toBe('new');
  });

  it('clearHistory empties the history and updates localStorage', () => {
    let state: SearchState = { history: ['a', 'b'], lastQuery: null };
    state = reducer(state, clearHistory());
    expect(state.history).toEqual([]);
    expect(localStorage.setItem).toHaveBeenCalledWith('search_history_v1', JSON.stringify([]));
  });

  it('setLastQuery updates lastQuery', () => {
    let state: SearchState = { history: [], lastQuery: null };
    state = reducer(state, setLastQuery('search term'));
    expect(state.lastQuery).toBe('search term');

    state = reducer(state, setLastQuery(null));
    expect(state.lastQuery).toBeNull();
  });
});
