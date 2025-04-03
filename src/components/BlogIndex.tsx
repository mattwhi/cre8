"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

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

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.summary.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, posts]);

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

      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
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
              <p className="text-sm text-gray-400">{post.date}</p>
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

      {/* CTA Section */}
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold mb-4">Like what you see?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Join the cre8 newsletter for updates & inspiration.
        </p>
        <button className="px-6 py-3 rounded-full font-semibold text-white bg-black hover:bg-gray-900 shadow-glow transition-all">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
