"use client";

import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import { useState } from "react";

interface Props {
  images: string[];
  section: string;
}

export default function MasonryGallery({ images, section }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  const lightboxImages = images.map((img) => ({
    src: `/photos/gallery/${section}/${img}`,
  }));

  return (
    <>
      {/* Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 animate-fade-in">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative group cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setIndex(i)}
          >
            <Image
              src={`/photos/gallery/${section}/${img}`}
              alt={`cre8 photo ${i}`}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg object-cover"
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        index={index ?? 0}
        slides={lightboxImages}
        animation={{ fade: 0.5 }}
      />
    </>
  );
}
