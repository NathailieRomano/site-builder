"use client";

import React from "react";

interface GoogleMapProps {
  address: string;
  height: "small" | "medium" | "large";
  rounded: boolean;
  caption: string;
}

function getMapEmbedUrl(address: string): string {
  return `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY || ""}&q=${encodeURIComponent(address)}`;
  // Note: This is Google's public embed key, works for basic embeds
}

const heightMap = { small: "250px", medium: "400px", large: "550px" };

export function GoogleMap({ address, height = "medium", rounded, caption }: GoogleMapProps) {
  if (!address) {
    return (
      <section className="py-12 px-6">
        <div className="mx-auto max-w-4xl rounded-xl bg-gray-100 flex items-center justify-center" style={{ height: heightMap[height] }}>
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">📍</div>
            <p className="text-sm">Adresse eingeben</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="mx-auto max-w-4xl">
        <div
          className={`overflow-hidden ${rounded ? "rounded-2xl" : ""}`}
          style={{ height: heightMap[height] }}
        >
          <iframe
            src={getMapEmbedUrl(address)}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          />
        </div>
        {caption && (
          <p className="mt-3 text-center text-sm opacity-60">{caption}</p>
        )}
      </div>
    </section>
  );
}

export const GoogleMapConfig = {
  label: "Google Maps",
  fields: {
    address: { type: "text" as const, label: "Adresse" },
    height: {
      type: "radio" as const,
      label: "Höhe",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Gross" },
      ],
    },
    rounded: {
      type: "radio" as const,
      label: "Abgerundet",
      options: [
        { value: true, label: "Ja" },
        { value: false, label: "Nein" },
      ],
    },
    caption: { type: "text" as const, label: "Beschriftung" },
  },
  defaultProps: {
    address: "Bern, Schweiz",
    height: "medium" as const,
    rounded: true,
    caption: "",
  },
  render: GoogleMap,
};
