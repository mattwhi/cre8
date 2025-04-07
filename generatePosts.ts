import OpenAI from "openai";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import axios from "axios";
import { parseStringPromise } from "xml2js";

dotenv.config();
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
console.log("UNSPLASH_ACCESS_KEY:", process.env.UNSPLASH_ACCESS_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const unsplashKey = process.env.UNSPLASH_ACCESS_KEY!;

// Ensure required directories exist
const postsDir = path.join(process.cwd(), "posts");
const photosDir = path.join(process.cwd(), "public/photos");
if (!fs.existsSync(postsDir)) {
  console.log("Creating posts directory...");
  fs.mkdirSync(postsDir, { recursive: true });
}
if (!fs.existsSync(photosDir)) {
  console.log("Creating public/photos directory...");
  fs.mkdirSync(photosDir, { recursive: true });
}

/**
 * Fetch trending photography topics from one of multiple RSS feeds.
 * Returns an array of dynamic topic objects.
 */
async function fetchTrendingTopics(): Promise<
  Array<{ title: string; summary: string; tags: string[] }>
> {
  // Define multiple RSS feed URLs
  const feedUrls = [
    "https://news.google.com/rss/search?q=photography&hl=en-US&gl=US&ceid=US:en",
    "https://www.flickr.com/services/feeds/photos_public.gne?tags=photography&format=rss2",
    "https://www.35mmc.com/feed/",
    "http://feeds.feedburner.com/4kShooters",
    "http://www.a2zcamerablog.com/feed/",
    "https://www.diyphotography.net/feed/",
    "https://www.slrlounge.com/feed/",
    "https://www.stuckincustoms.com/feed/",
    "https://www.thephoblographer.com/feed/",
    "https://www.petapixel.com/feed/",
    "https://www.fstoppers.com/feed/",
    "https://www.photofocus.com/feed/",
    "https://www.popphoto.com/rss/",
    "https://www.nationalgeographic.com/photography/photo-of-the-day/rss",
    // Add more feeds if desired.
  ];

  // Randomly select one feed URL.
  const randomIndex = Math.floor(Math.random() * feedUrls.length);
  const rssUrl = feedUrls[randomIndex];

  try {
    const res = await axios.get(rssUrl);
    const result = await parseStringPromise(res.data);
    const items = result.rss.channel[0].item;

    // Map the first 20 items to our topic format.
    const topics = items.slice(0, 20).map((item: any) => {
      const title = item.title[0];
      return {
        title,
        summary: `${title} - A trending topic in photography.`,
        tags: ["photography", "trending"],
      };
    });

    console.log("Using feed:", rssUrl);
    console.log(
      "Dynamic topics fetched:",
      topics.map((t: { title: any }) => t.title)
    );
    return topics;
  } catch (error) {
    console.error("Error fetching trending topics from feed:", rssUrl, error);
    return [];
  }
}

/**
 * Fetch a collection of images from Unsplash based on a query.
 * Returns an array of relative paths for the downloaded images.
 */
async function fetchImages(
  query: string,
  slug: string,
  count: number
): Promise<string[]> {
  try {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: count },
      headers: { Authorization: `Client-ID ${unsplashKey}` },
    });

    const results = res.data.results;
    if (!results || results.length === 0)
      throw new Error("No Unsplash images found");

    const downloadedImages: string[] = [];
    for (let i = 0; i < results.length; i++) {
      const imageUrl = results[i].urls.full;
      let ext = imageUrl.split("?")[0].split(".").pop();
      if (!ext || ext.includes("/")) {
        ext = "jpg";
      }
      const imageName = `${slug}-${i + 1}.${ext}`;
      const imagePath = path.join(photosDir, imageName);

      console.log(`Downloading image for query "${query}" to: ${imagePath}`);

      const imageRes = await axios.get(imageUrl, { responseType: "stream" });
      const writer = fs.createWriteStream(imagePath);
      imageRes.data.pipe(writer);

      await new Promise<void>((resolve, reject) => {
        writer.on("finish", () => {
          console.log(`Finished writing ${imageName}`);
          resolve();
        });
        writer.on("error", reject);
      });
      downloadedImages.push(`/photos/${imageName}`);
    }
    return downloadedImages;
  } catch (error) {
    console.error("Error in fetchImages:", error);
    throw error;
  }
}

/**
 * Helper to generate a markdown image tag with alt text.
 */
function getImageMarkdown(image: string, altText: string = "Image"): string {
  return `![${altText}](${image})\n\n`;
}

/**
 * Extract keywords from text using OpenAI.
 */
async function extractKeywords(text: string): Promise<string[]> {
  const prompt = `Extract 5-10 relevant keywords from the following text and output them as a comma-separated list:\n\n"${text}"`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });
  const keywordString = response.choices[0].message.content?.trim() || "";
  const keywords = keywordString
    .split(",")
    .map((k) => k.trim())
    .filter((k) => k);
  console.log("Extracted keywords:", keywords);
  return keywords;
}

/**
 * Generate a blog post based on a given topic.
 * Fetches a collection of related images and extracts keywords from the generated content to add as tags.
 * Skips generation if a post with the same slug already exists.
 */
async function generateBlogPost(topic: {
  title: string;
  summary: string;
  tags: string[];
}) {
  try {
    const imageCount = 3; // Number of images to fetch
    const date = new Date().toISOString().split("T")[0];
    const slug = `${date}-${topic.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;

    // Define the output path and check if the post already exists.
    const outputPath = path.join(postsDir, `${slug}.md`);
    if (fs.existsSync(outputPath)) {
      console.log(
        `Post already exists for "${topic.title}" with slug ${slug}. Skipping...`
      );
      return;
    }

    const prompt = `Write a 2000 word markdown formatted blog post titled "${topic.title}" for photographers. Include clear paragraphs, at least one markdown image tag (e.g., ![alt text](/path/to/image)) within the content, an introduction, practical tips, and a conclusion. Ensure the content is well-spaced and visually appealing.`;

    console.log(`Generating blog post for: ${topic.title}`);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let content = response.choices[0].message.content?.trim() || "";
    // Extract keywords from the generated content.
    const extractedKeywords = await extractKeywords(content);
    // Merge extracted keywords with the original tags (deduplicated).
    const mergedTags = Array.from(
      new Set([...topic.tags, ...extractedKeywords])
    );

    // Fetch a collection of related images.
    const images = await fetchImages(topic.title, slug, imageCount);
    const featuredImage = images[0]; // Use the first image as the featured image.

    // Create a masonry gallery HTML block using Tailwind CSS.
    const galleryHTML = `
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  ${images
    .map(
      (img, index) =>
        `<img src="${img}" alt="Related photo ${
          index + 1
        }" class="w-full rounded-lg" />`
    )
    .join("\n")}
</div>
`;

    // Generate markdown image tags using getImageMarkdown.
    const imagesMarkdown = images
      .map((img, index) => getImageMarkdown(img, `Related photo ${index + 1}`))
      .join("\n");

    // Construct the full markdown with frontmatter.
    const markdown = `---
title: "${topic.title}"
date: "${date}"
summary: "${topic.summary}"
tags: ${JSON.stringify(mergedTags)}
image: "${featuredImage}"
images: ${JSON.stringify(images)}
metaTitle: "${topic.title} | cre8 Photography"
metaDescription: "Learn about ${topic.title.toLowerCase()} in photography with practical tips and insights."
canonical: "https://cre8photography.co.uk/blog/${slug}"
featured: true
---

<!-- Gallery as HTML -->
${galleryHTML}

<!-- Gallery as Markdown -->
${imagesMarkdown}

${content}

`;

    fs.writeFileSync(outputPath, markdown);
    console.log(`✅ Blog post created: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to generate post for "${topic.title}":`, error);
  }
}

/**
 * Main function: Fetch dynamic topics from multiple RSS feeds and generate blog posts.
 */
async function generateAll() {
  let dynamicTopics = await fetchTrendingTopics();
  if (dynamicTopics.length === 0) {
    dynamicTopics = [
      {
        title: "Static Topic Example",
        summary: "A fallback topic in photography.",
        tags: ["photography", "fallback"],
      },
    ];
  }

  // Randomize the topics array to vary the order daily.
  dynamicTopics.sort(() => Math.random() - 0.5);

  // Generate a blog post for each dynamic topic.
  for (const topic of dynamicTopics) {
    await generateBlogPost(topic);
  }
}

generateAll();
