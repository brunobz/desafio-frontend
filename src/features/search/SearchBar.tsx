import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppHooks';
import { addToHistory, setLastQuery } from '../../features/search/searchSlice';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('React tutorials');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((s) => s.search);

  const handleSearch = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    dispatch(setLastQuery(trimmed));
    dispatch(addToHistory(trimmed));
    setShowSuggestions(false);
  };

  const handleMouseDown = (term: string) => {
    setInputText(term);
    setShowSuggestions(false);
    dispatch(setLastQuery(term));
    onSubmit(term);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!inputRef.current?.parentElement?.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" role="search" aria-label="Search YouTube videos">
      <div className="flex items-center bg-white rounded-xl shadow p-2">
        <Search className="text-gray-500 mx-2" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search videos..."
          aria-label="Search videos"
          className="flex-1 outline-none text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 text-white rounded-lg px-4 py-1 ml-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition"
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Sugestões do histórico */}
      {showSuggestions && history.length > 0 && (
        <ul
          className="absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-md"
          role="listbox"
          aria-label="Recent search suggestions"
        >
          {history.map((term, index) => (
            <li
              key={index}
              role="option"
              tabIndex={0}
              onMouseDown={() => handleMouseDown(term)}
              className="px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate"
            >
              {term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
