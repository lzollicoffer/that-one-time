'use client';

import { useState } from 'react';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

/**
 * Search Bar Component — That One Time
 * Located at top of browse page for timeline search
 * 
 * Features:
 * - Rounded pill shape (border-radius: 76px)
 * - Magnifying glass icon
 * - Muted placeholder text
 * - Type-ahead ready (placeholder for debounced search)
 */
export function SearchBar({
  placeholder = 'Search',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div
      className="relative w-full flex items-center"
      aria-label="Search timelines"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '76px',
        height: '49px',
        padding: '0 22px',
        border: '1px solid var(--color-card-border)',
      }}
    >
      {/* Magnifying glass icon */}
      <svg
        className="w-5 h-5 text-gray-400 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Input field */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--color-text-primary)',
        }}
      />
    </div>
  );
}
