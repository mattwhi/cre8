"use client";

import path from "path";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  images: string[];
}

export default function GalleryPage({ images }: Props) {
  const photosDir = path.join(process.cwd(), "public/photos");

  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalImg ? "hidden" : "auto";
  }, [modalImg]);

  return (
    <>
      {/* Grid Masonry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative group cursor-pointer"
            onClick={() => setModalImg(`/photos/${img}`)}
          >
            <Image
              src={`/photos/${img}`}
              alt={`cre8 photo ${i}`}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg object-cover"
              placeholder="blur"
              blurDataURL="/placeholder.jpg" // use a tiny base64 or static blur
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImg && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/80 backdrop-blur-sm transition-opacity duration-300 animate-fade"
          onClick={() => setModalImg(null)}
        >
          <div
            className="max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImg}
              alt="modal view"
              className="rounded-xl w-full h-auto shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
