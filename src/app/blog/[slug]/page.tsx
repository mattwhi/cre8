import { getAllPostSlugs, getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug).then((res) => res);
  return {
    title: `${post.title} | Cre8 Photography`,
    description: post.metaDescription || post.summary,
    openGraph: {
      title: `${post.title} | Cre8 Photography`,
      description: post.metaDescription || post.summary,
      url: `https://cre8photography.co.uk/blog/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Cre8 Photography`,
      description: post.metaDescription || post.summary,
      site: "@cre8",
      creator: "@cre8",
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post: {
    slug: string;
    title: any;
    date: any;
    summary: any;
    tags: any;
    contentHtml: string;
    image: string;
    metaDescription: any;
  } = await getPost((await params).slug);
  if (!post) return notFound();

  return (
    <>
      <article className="text-white">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={1600}
            height={600}
            className="w-full max-h-[500px] object-cover rounded-xl mb-6"
            priority
          />
        )}

        <div className="max-w-3xl mx-auto px-4 py-8 prose prose-invert">
          <h1>{post.title}</h1>
          <p className="text-sm text-gray-400">{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </article>
    </>
  );
}
