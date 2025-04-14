import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function GalleryIndexPage() {
  const galleryDir = path.join(process.cwd(), "public/photos/gallery");
  const sections = await fs.readdir(galleryDir);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-10">Explore Our Galleries</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sections.map((section) => {
          const formatted = section
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <Link
              key={section}
              href={`/gallery/${section}`}
              className="group relative block overflow-hidden rounded-xl bg-gray-900 shadow-md"
            >
              <Image
                src={`/photos/gallery/${section}/cover.jpg`}
                alt={`${formatted} gallery preview`}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h2 className="text-lg font-semibold text-white drop-shadow-md">
                  {formatted}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
