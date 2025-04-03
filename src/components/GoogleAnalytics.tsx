import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Load the GA library */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-4J8P78JZBF`}
      />
      {/* Initialize GA */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4J8P78JZBF, {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
