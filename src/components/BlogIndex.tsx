"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import FormattedDate from "./FormattedDate";

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image: string;
}

export default function BlogIndex({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  // Sort posts by date (latest first)
  const sortedPosts = useMemo(() => {
    return [...posts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [posts]);

  // Filter posts based on the search query (applied on the sorted posts)
  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.summary.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedPosts]);

  // Only display the first visibleCount posts
  const postsToDisplay = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">The Blog</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Discover thoughts, stories, and snapshots from creators in the cre8
          community.
        </p>

        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-6 w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg dark:bg-black dark:text-white"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {postsToDisplay.map((post) => (
          <div
            key={post.slug}
            className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-black transition-all hover:scale-[1.02]"
          >
            {post.image && (
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={500}
                  placeholder="blur"
                  blurDataURL="/placeholder.jpg"
                  className="w-full h-56 object-cover"
                />
              </Link>
            )}
            <div className="p-4 flex flex-col gap-2">
              <Link
                href={`/blog/${post.slug}`}
                className="text-xl font-semibold hover:underline"
              >
                {post.title}
              </Link>
              <FormattedDate date={post.date} />
              <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 text-sm inline-block px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 shadow-glow transition"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleSeeMore}
            className="px-6 py-3 rounded-full font-semibold text-white bg-black hover:bg-gray-900 shadow-glow transition-all"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}
