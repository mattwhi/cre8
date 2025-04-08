"use client";
import ParallaxSections from "@/components/ParallaxSections";
import { ParallaxProvider } from "react-scroll-parallax";

const sections = [
  {
    image: "/photos/gallery/_MG_3086-1-2.jpg",
    title: "Inspiring Photography",
    content: "Discover breathtaking images and creative insights.",
  },
  {
    image: "/photos/gallery/_MG_3912-1.jpg",
    title: "Creative Techniques",
    content: "Learn advanced techniques to capture stunning photos.",
  },
  {
    image: "/photos/gallery/Maddie_Ben_Wedding_14_04_2022.jpg",
    title: "Community Spotlight",
    content:
      "Explore the work of talented photographers from around the world.",
  },
];

export default function HomePage() {
  return (
    <ParallaxProvider>
      <ParallaxSections sections={sections} />
    </ParallaxProvider>
  );
}
