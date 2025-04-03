import { getAllPostSlugs, getPost } from "@/lib/posts";
import BlogIndex from "@/components/BlogIndex";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog | Cre8 Photography",
    description: "Explore my latest blog posts and photography insights.",
  };
}

export default async function BlogPage() {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));

  return <BlogIndex posts={posts} />;
}
