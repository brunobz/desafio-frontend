import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  history: string[];
  lastQuery: string | null;
}

const LOCAL_KEY = 'search_history_v1';

const loadHistory = (): string[] => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveHistory = (items: string[]) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items.slice(0, 20)));
  } catch (error) {
    console.error('Failed to save search history:', error);
  }
};

const initialState: SearchState = {
  history: loadHistory(),
  lastQuery: null,
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<string>) {
      const value = action.payload.trim();
      if (!value) return;
      state.history = [value, ...state.history.filter((h) => h !== value)].slice(0, 10);
      saveHistory(state.history);
    },
    clearHistory(state) {
      state.history = [];
      saveHistory([]);
    },
    setLastQuery(state, action: PayloadAction<string | null>) {
      state.lastQuery = action.payload;
    },
  },
});

export const { addToHistory, clearHistory, setLastQuery } = slice.actions;
export default slice.reducer;
