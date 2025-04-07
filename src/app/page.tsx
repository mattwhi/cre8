import Head from "next/head";
import Slider from "../components/Slider";
export const metadata = {
  title: "cre8 | The Home of Photography",
  description:
    "Discover inspiring stories, creative insights, and community updates in the cre8 community. Explore engaging blog posts that capture the innovative spirit and personal journeys of our creators",
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
  robots: "index, follow",
  keywords: "cre8, photography, cre8 photography",
};

export default function Home() {
  return (
    <>
      <div className="relative">
        <Slider />
      </div>
    </>
  );
}
