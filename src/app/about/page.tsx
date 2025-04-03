import AboutPage from "@/components/About";

export const metadata = {
  title: "cre8",
  description: "cre8 photography",
  image: "/images/cre8.jpg",
  date: "2022-01-01",
  type: "website",
  twitter: {
    site: "@cre8",
    creator: "@cre8",
    card: "summary_large_image",
  },
  site: "@cre8",
  creator: "@cre8",
  card: "summary_large_image",
  url: "https://cre8photography.co.uk",
  canonical: "https://cre8photography.co.uk",
  robots: "index, follow",
  keywords: "cre8, photography, cre8 photography",
};

export default function About() {
  return (
    <>
      <AboutPage />
    </>
  );
}
