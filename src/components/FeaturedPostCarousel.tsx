"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export default function FeaturedPostsCarousel({ posts }: { posts: Post[] }) {
  // Filter posts that are marked as featured
  const featuredPosts = posts.filter((post) => post.featured);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  if (featuredPosts.length === 0) return null;

  return (
    <div className="my-8">
      <Slider {...settings}>
        {featuredPosts.map((post) => (
          <div key={post.slug} className="relative">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-64 md:h-96">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 rounded-lg">
                  <h2 className="text-2xl font-bold text-white">
                    {post.title}
                  </h2>
                  <p className="text-white">{post.summary}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
