import MasonryGallery from "@/components/DynamicMasonryGallery";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import GalleryHero from "@/components/GalleryHero";

export const dynamic = "force-dynamic";

// ✅ Proper static params for build-time generation (optional)
export async function generateStaticParams(): Promise<{ section: string }[]> {
  const sections = await fs.readdir(
    path.join(process.cwd(), "public/photos/gallery")
  );
  return sections.map((section) => ({ section }));
}

// ✅ CORRECT function signature
export async function generateMetadata(props: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await props.params;

  const title = `${section
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())} Gallery | cre8`;
  const description = `Browse photos from our ${section} photography collection on cre8. High-quality, curated images to inspire.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/gallery/${section}`,
      images: [
        {
          url: `/photos/gallery/${section}/cover.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    metadataBase: new URL("https://yourdomain.com"), // Replace with your actual domain
  };
}

// ✅ CORRECT function signature
export default async function GallerySectionPage(props: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await props.params;
  const photosDir = path.join(process.cwd(), "public/photos/gallery", section);

  let files: string[];

  try {
    files = await fs.readdir(photosDir);
  } catch (error) {
    return notFound(); // Return 404 if folder doesn't exist
  }

  const images = files.filter((file) =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
  );

  if (images.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <h2 className="text-xl font-semibold">
          No photos found in this section.
        </h2>
        <p>Check back soon or explore another gallery.</p>
      </div>
    );
  }

  const formattedTitle = section
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <>
      <Breadcrumbs section={section} />
      <GalleryHero section={section} />
      <div className="relative">
        <MasonryGallery images={images} section={section} />
      </div>
    </>
  );
}
