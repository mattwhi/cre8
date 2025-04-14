import { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  section: "main" | "mega-galleries" | "mega-clients" | "footer";
  icon?: LucideIcon;
};

import {
  Camera,
  Users,
  MessageCircle,
  Star,
  LayoutDashboard,
  Briefcase,
} from "lucide-react";

export const navItems: NavItem[] = [
  { label: "Home", href: "/", section: "main" },
  { label: "Gallery", href: "/gallery", section: "main" },
  { label: "About", href: "/about", section: "main" },

  // Mega menu: Galleries
  // {
  //   label: "Street Photography",
  //   href: "/gallery/street",
  //   section: "mega-galleries",
  //   icon: LayoutDashboard,
  // },

  // Mega menu: Clients
  //   {
  //     label: "Hire a Creator",
  //     href: "/features/hire",
  //     section: "mega-clients",
  //     icon: Briefcase,
  //   },
  //   {
  //     label: "Messaging",
  //     href: "/features/messages",
  //     section: "mega-clients",
  //     icon: MessageCircle,
  //   },
  //   {
  //     label: "Reviews",
  //     href: "/features/reviews",
  //     section: "mega-clients",
  //     icon: Star,
  //   },
];
