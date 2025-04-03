import MasonryGallery from "@/components/MasonryGallery";
import fs from "fs/promises";
import path from "path";

export default async function GalleryPage() {
  const photosDir = path.join(process.cwd(), "public/photos");
  const files = await fs.readdir(photosDir);

  const images = files.filter((file) =>
    /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
  );

  return (
    <div className="relative">
      <MasonryGallery images={images} />
    </div>
  );
}
