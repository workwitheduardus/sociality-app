"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onQueryChange: (query: string) => void;
  onClose?: () => void;
}

export function SearchBar({ onQueryChange, onClose }: SearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => onQueryChange(value), 300);
    return () => clearTimeout(timeout);
  }, [value, onQueryChange]);

  return (
    <div className="flex flex-1 items-center gap-1.5 rounded-full border border-gray-900 bg-gray-950 px-3 py-2 md:px-4">
      <Search className="h-5 w-5 shrink-0 text-gray-500" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search users"
        className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
        autoFocus
      />
      {value && (
        <button onClick={() => setValue("")} aria-label="Clear search">
          <X className="h-4 w-4 text-gray-500" />
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close search"
          className="md:hidden"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      )}
    </div>
  );
}
