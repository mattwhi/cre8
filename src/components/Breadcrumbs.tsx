"use client";

import Link from "next/link";

export default function Breadcrumbs({ section }: { section: string }) {
  const formatted = section
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="px-4 pt-6 pb-2 mb-5 text-sm text-gray-300">
      <Link href="/" className="hover:underline text-gray-400">
        Home
      </Link>{" "}
      /{" "}
      <Link href="/gallery" className="hover:underline text-gray-400">
        Gallery
      </Link>{" "}
      / <span className="text-white">{formatted}</span>
    </div>
  );
}
