"use client";

import React from "react";

interface ImageBlockProps {
  id?: string;
  src: string;
  alt: string;
  caption?: string;
  link?: string;
  width: "small" | "medium" | "large" | "full";
  align: "left" | "center" | "right";
  rounded: boolean;
}

const widthMap = {
  small: "max-w-xs",
  medium: "max-w-md",
  large: "max-w-2xl",
  full: "max-w-full",
};

const alignMap = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

export function ImageBlock({
  src,
  alt,
  caption,
  link,
  width = "large",
  align = "center",
  rounded = false,
}: ImageBlockProps) {
  const imgElement = src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto object-cover shadow-md ${rounded ? "rounded-xl" : ""}`}
      style={{ borderRadius: rounded ? "var(--theme-radius)" : undefined }}
    />
  ) : (
    <div
      className={`w-full aspect-video bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center ${rounded ? "rounded-xl" : ""}`}
    >
      <span className="text-zinc-400 text-sm">Kein Bild ausgewählt</span>
    </div>
  );

  return (
    <section className="py-12 px-6">
      <figure className={`${widthMap[width]} ${alignMap[align]}`}>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {imgElement}
          </a>
        ) : (
          imgElement
        )}
        {caption && (
          <figcaption
            className="mt-3 text-sm text-center opacity-60"
            style={{ color: "var(--theme-text)" }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}

export const ImageBlockConfig = {
  label: "Bild",
  fields: {
    src: {
      type: "text" as const,
      label: "Bild URL",
    },
    alt: {
      type: "text" as const,
      label: "Alt-Text",
    },
    caption: {
      type: "text" as const,
      label: "Bildunterschrift",
    },
    link: {
      type: "text" as const,
      label: "Link (optional)",
    },
    width: {
      type: "radio" as const,
      label: "Breite",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Groß" },
        { value: "full", label: "Volle Breite" },
      ],
    },
    align: {
      type: "radio" as const,
      label: "Ausrichtung",
      options: [
        { value: "left", label: "Links" },
        { value: "center", label: "Zentriert" },
        { value: "right", label: "Rechts" },
      ],
    },
    rounded: {
      type: "radio" as const,
      label: "Abgerundete Ecken",
      options: [
        { value: true, label: "Ja" },
        { value: false, label: "Nein" },
      ],
    },
  },
  defaultProps: {
    src: "https://picsum.photos/seed/block/1200/600",
    alt: "Bild",
    caption: "",
    link: "",
    width: "large" as const,
    align: "center" as const,
    rounded: true,
  },
  render: ImageBlock,
};
