"use client";

import Link from "next/link";
import { navItems } from "@/lib/navigation";

export default function NavMenu() {
  const mainLinks = navItems.filter((item) => item.section === "main");
  const galleryLinks = navItems.filter(
    (item) => item.section === "mega-galleries"
  );
  const clientLinks = navItems.filter(
    (item) => item.section === "mega-clients"
  );

  const hasMegaMenu = galleryLinks.length > 0 || clientLinks.length > 0;

  return (
    <nav className="hidden md:flex gap-6 font-medium text-gray-100 relative">
      {/* Main links */}
      {mainLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="hover:text-gray-400 transition"
        >
          {item.label}
        </Link>
      ))}

      {/* Mega Menu — only show if either section has items */}
      {hasMegaMenu && (
        <div className="relative group">
          <button className="hover:text-gray-400 transition">Showcase</button>

          <div className="absolute left-0 top-full z-50 group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
            <div className="p-6 grid grid-cols-1 gap-6 w-[260px] bg-white/80 backdrop-blur-md text-black rounded-2xl shadow-2xl">
              {/* For Creators */}
              {galleryLinks.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900 text-sm">
                    Gallery Showcase
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {galleryLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 hover:text-black hover:underline"
                        >
                          {item.icon && <item.icon size={18} />}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* For Clients */}
              {clientLinks.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900 text-sm">
                    For Clients
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {clientLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 hover:text-black hover:underline"
                        >
                          {item.icon && <item.icon size={18} />}
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
