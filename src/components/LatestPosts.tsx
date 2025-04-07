"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { Post } from "@/lib/fetchPosts";
import FormattedDate from "./FormattedDate";
import SocialShareButtons from "./SocialShareButtons";

export default function LatestPosts({ posts }: { posts: Post[] }) {
  // Get the three most recent posts
  const latestPosts = useMemo(() => {
    return [...posts].slice(0, 3);
  }, [posts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {latestPosts.map((post) => (
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

            {/* Social Share Buttons */}
            <SocialShareButtons
              url={`https://cre8photography.co.uk/blog/${post.slug}`}
              title={post.title}
            />

            <Link
              href={`https://cre8photography.co.uk/blog/${post.slug}`}
              className="mt-4 text-sm inline-block px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 shadow-glow transition"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
