"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: install lucide-react for icons

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-xl shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          cre8
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium text-gray-100">
          <Link href="/" className="hover:text-gray-400 transition">
            Home
          </Link>
          <Link href="/gallery" className="hover:text-gray-400 transition">
            Gallery
          </Link>
          <Link href="/blog" className="hover:text-gray-400 transition">
            Blog
          </Link>
          <Link href="/about" className="hover:text-gray-400 transition">
            About
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-100"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 bg-white/90 backdrop-blur-xl shadow-md rounded-b-2xl">
          <nav className="flex flex-col gap-3 font-medium text-gray-700">
            <Link href="/gallery" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
