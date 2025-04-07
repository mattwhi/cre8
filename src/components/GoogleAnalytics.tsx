"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactGA from "react-ga4";

export default function AnalyticsWrapper() {
  const pathname = usePathname();
  const MEASUREMENT_ID = "G-4J8P78JZBF"; // Replace with your GA4 Measurement ID

  useEffect(() => {
    // Initialize GA4 when the component mounts (client side only)
    ReactGA.initialize(MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    // Send a pageview every time the pathname changes
    ReactGA.send({ hitType: "pageview", page: pathname });
  }, [pathname]);

  return null;
}
