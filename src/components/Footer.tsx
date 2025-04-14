"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Brand */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
            cre8
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col gap-2">
          <Link
            href="/about"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            Blog
          </Link>
          <Link
            href="/gallery"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition"
          >
            Contact
          </Link>
        </div>

        {/* Right: Socials */}
        <div className="flex items-start gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            <Instagram />
          </a>
          <a
            href="https://www.facebook.com/cre8photographywebsite"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            <Facebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            <Twitter />
          </a>
          <a
            href="mailto:info@cre8.com"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
          >
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  );
}
