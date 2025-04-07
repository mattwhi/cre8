import Head from "next/head";
import Slider from "../components/Slider";
import LatestPosts from "@/components/LatestPosts";
import { fetchPostsFromSource, Post } from "@/lib/fetchPosts";

interface HomeProps {
  posts: Post[];
}

export const metadata = {
  title: "cre8 | The Home of Photography",
  description:
    "Discover inspiring stories, creative insights, and community updates in the cre8 community. Explore engaging blog posts that capture the innovative spirit and personal journeys of our creators",
  image: "/images/cre8.jpg",
  date: "2022-01-01",
  type: "website",
  twitter: {
    site: "@cre8",
    creator: "@cre8",
    card: "summary_large_image",
  },
  site: "@cre8",
  creator: "@cre8",
  card: "summary_large_image",
  url: "https://cre8photography.co.uk",
  robots: "index, follow",
  keywords: "cre8, photography, cre8 photography",
};

export default function Home() {
  const posts: Post[] = fetchPostsFromSource();
  return (
    <>
      <div className="relative mb-10">
        <Slider />
      </div>
      <div className="container mx-auto px-4">
        <LatestPosts posts={posts} />
      </div>
    </>
  );
}
