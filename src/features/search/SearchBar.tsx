import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [inputText, setInputText] = useState("React tutorials")

  return (
    <div className="flex items-center w-full bg-white rounded-xl shadow p-2">
      <Search className="text-gray-500 mx-2" />
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Search"
        className="flex-1 outline-none text-gray-700"
      />
      <button
        onClick={() => onSubmit(inputText)}
        className="bg-red-600 text-white rounded-lg px-4 py-1 ml-2 hover:bg-red-700 transition"
      >
        Search
      </button>
    </div>
  );
};