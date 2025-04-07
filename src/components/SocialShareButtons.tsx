"use client";

import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

export default function SocialShareButtons({
  url,
  title,
}: SocialShareButtonsProps) {
  return (
    <div className="flex gap-2 mt-4">
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}
