"use client";
import { usePathname } from "next/navigation";
import Head from "next/head";

export default function CanonicalHead() {
  const pathname = usePathname();
  const canonicalUrl = `https://cre8photography.co.uk${pathname}`;

  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
}
