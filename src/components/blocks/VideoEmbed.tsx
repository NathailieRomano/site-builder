"use client";

import React from "react";

interface VideoEmbedProps {
  url: string;
  caption: string;
  aspectRatio: "16:9" | "4:3" | "1:1";
  maxWidth: "small" | "medium" | "full";
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

const aspectMap = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

const widthMap = {
  small: "max-w-xl",
  medium: "max-w-3xl",
  full: "max-w-6xl",
};

export function VideoEmbed({ url, caption, aspectRatio = "16:9", maxWidth = "medium" }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(url);

  return (
    <section className="py-12 px-6">
      <div className={`mx-auto ${widthMap[maxWidth]}`}>
        {embedUrl ? (
          <div className={`relative w-full ${aspectMap[aspectRatio]} rounded-xl overflow-hidden bg-black`}>
            <iframe
              src={embedUrl}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        ) : (
          <div className={`relative w-full ${aspectMap[aspectRatio]} rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center`}>
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-sm">YouTube oder Vimeo URL eingeben</p>
            </div>
          </div>
        )}
        {caption && (
          <p className="mt-3 text-center text-sm opacity-60">{caption}</p>
        )}
      </div>
    </section>
  );
}

export const VideoEmbedConfig = {
  label: "Video",
  fields: {
    url: { type: "text" as const, label: "YouTube / Vimeo URL" },
    caption: { type: "text" as const, label: "Beschriftung" },
    aspectRatio: {
      type: "radio" as const,
      label: "Seitenverhältnis",
      options: [
        { value: "16:9", label: "16:9 (Breit)" },
        { value: "4:3", label: "4:3 (Standard)" },
        { value: "1:1", label: "1:1 (Quadrat)" },
      ],
    },
    maxWidth: {
      type: "radio" as const,
      label: "Breite",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "full", label: "Voll" },
      ],
    },
  },
  defaultProps: {
    url: "",
    caption: "",
    aspectRatio: "16:9" as const,
    maxWidth: "medium" as const,
  },
  render: VideoEmbed,
};
