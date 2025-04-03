"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  "/photos/slider1.jpg",
  "/photos/slider2.jpg",
  "/photos/slider3.jpg",
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="h-screen w-full relative overflow-hidden">
        {slides.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-20 transition-opacity duration-1000 bg-black ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt="Slider image"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-5xl font-bold">
        Your Photography, Reimagined.
      </div>
    </>
  );
}
