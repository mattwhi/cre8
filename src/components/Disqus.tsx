"use client";

import { useEffect } from "react";

// Define an interface for the props
interface CommentsProps {
  postSlug: string;
  postIdentifier: string;
  postTitle: string;
}

export default function Comments({
  postSlug,
  postIdentifier,
  postTitle,
}: CommentsProps) {
  useEffect(() => {
    // Check if a Disqus instance already exists.
    if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: function () {
          this.page.identifier = postIdentifier; // Unique identifier for the post
          this.page.url = window.location.href; // Current page URL
          this.page.title = postTitle; // Post title
        },
      });
    } else {
      // If Disqus isn't loaded, create a script element to load it.
      const d = document,
        s = d.createElement("script");
      // Replace YOUR_DISQUS_SHORTNAME with your actual Disqus shortname.
      s.src = "https://cre8photography.disqus.com/embed.js";
      s.setAttribute("data-timestamp", String(+new Date()));
      (d.head || d.body).appendChild(s);
    }
  }, [postIdentifier, postTitle]);

  return (
    <div>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript" rel="noreferrer">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
}
