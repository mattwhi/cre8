"use client";

import { useState, useMemo } from "react";

interface SidebarProps {
  // Array of tags pulled from your posts (e.g., ["nature", "portrait", "wildlife", ...])
  tags: string[];
}

export default function Sidebar({ tags }: SidebarProps) {
  const [query, setQuery] = useState("");

  // Compute tag frequencies for the word cloud.
  const tagFrequencies = useMemo(() => {
    const freq: Record<string, number> = {};
    tags.forEach((tag) => {
      freq[tag] = (freq[tag] || 0) + 1;
    });
    return freq;
  }, [tags]);

  // Determine font size range for the word cloud.
  const minFont = 12;
  const maxFont = 32;
  const frequencies = Object.values(tagFrequencies);
  const minCount = Math.min(...frequencies);
  const maxCount = Math.max(...frequencies);

  const getFontSize = (count: number) => {
    if (maxCount === minCount) return `${(minFont + maxFont) / 2}px`;
    const size =
      minFont +
      ((count - minCount) / (maxCount - minCount)) * (maxFont - minFont);
    return `${size}px`;
  };

  return (
    <aside className="p-4 border-r border-gray-200">
      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Tags Section */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(tags)).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Word Cloud Section */}
      <div>
        <h3 className="font-bold mb-2">Word Cloud</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(tagFrequencies).map(([tag, count]) => (
            <span
              key={tag}
              style={{ fontSize: getFontSize(count) }}
              className="text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
