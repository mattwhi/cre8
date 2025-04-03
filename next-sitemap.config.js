/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://cre8photography.co.uk",
  generateRobotsTxt: true, // (optional)
  changefreq: "weekly",
  priority: 0.7,
  lastmod: new Date().toISOString(),
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/api/",
      },
    ],
    additionalSitemaps: [
      "https://cre8photography.co.uk/sitemap-0.xml",
      "https://cre8photography.co.uk/sitemap-1.xml",
    ],
  },
  // ...other options
};
