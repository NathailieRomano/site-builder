"use client";

import React from "react";

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

interface GalleryProps {
  id?: string;
  heading?: string;
  images: GalleryImage[];
  columns: 2 | 3 | 4;
  gap: "small" | "medium" | "large";
  rounded: boolean;
}

const columnsMap = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

const gapMap = {
  small: "gap-2",
  medium: "gap-4",
  large: "gap-8",
};

export function Gallery({
  heading,
  images = [],
  columns = 3,
  gap = "medium",
  rounded = true,
}: GalleryProps) {
  return (
    <section className="py-16 px-6" id="gallery">
      {heading && (
        <h2
          className="text-3xl font-bold mb-10 text-center"
          style={{
            fontFamily: "var(--theme-heading-font)",
            color: "var(--theme-text)",
          }}
        >
          {heading}
        </h2>
      )}
      <div className={`max-w-6xl mx-auto grid ${columnsMap[columns]} ${gapMap[gap]}`}>
        {images.length === 0 ? (
          <div className="col-span-full aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
            <p className="text-zinc-400 text-sm">Fügen Sie Bilder hinzu</p>
          </div>
        ) : (
          images.map((img, i) => (
            <figure key={i} className="group overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className={`w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105 ${
                  rounded ? "rounded-lg" : ""
                }`}
                style={{ borderRadius: rounded ? "var(--theme-radius)" : undefined }}
              />
              {img.caption && (
                <figcaption
                  className="mt-2 text-sm text-center opacity-60"
                  style={{ color: "var(--theme-text)" }}
                >
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))
        )}
      </div>
    </section>
  );
}

export const GalleryConfig = {
  label: "Galerie",
  fields: {
    heading: {
      type: "text" as const,
      label: "Überschrift",
    },
    images: {
      type: "array" as const,
      label: "Bilder",
      arrayFields: {
        url: {
          type: "custom" as const,
          label: "Bild",
          render: ({ value, onChange, field }: { value: string; onChange: (v: string) => void; field: { label: string } }) => {
            const { ImageField } = require("@/components/fields/ImageField");
            return ImageField({ value, onChange, field });
          },
        },
        alt: { type: "text" as const, label: "Alt-Text" },
        caption: { type: "text" as const, label: "Bildunterschrift (optional)" },
      },
      defaultItemProps: {
        url: "https://picsum.photos/seed/gallery/800/600",
        alt: "Galeriebild",
        caption: "",
      },
    },
    columns: {
      type: "radio" as const,
      label: "Spalten",
      options: [
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
      ],
    },
    gap: {
      type: "radio" as const,
      label: "Abstand",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Groß" },
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
    heading: "Galerie",
    images: [
      { url: "https://picsum.photos/seed/g1/800/600", alt: "Bild 1", caption: "" },
      { url: "https://picsum.photos/seed/g2/800/600", alt: "Bild 2", caption: "" },
      { url: "https://picsum.photos/seed/g3/800/600", alt: "Bild 3", caption: "" },
    ],
    columns: 3 as const,
    gap: "medium" as const,
    rounded: true,
  },
  render: Gallery,
};
