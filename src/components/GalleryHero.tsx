import Image from "next/image";

export default function GalleryHero({ section }: { section: string }) {
  const title = section
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="relative h-[50vh] w-full overflow-hidden bg-black">
      <Image
        src={`/photos/gallery/${section}/cover.jpg`} // optional fallback coming below
        alt={`${title} Hero`}
        fill
        priority
        className="object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/90 flex items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
          {title} Gallery
        </h1>
      </div>
    </div>
  );
}
