"use client";

import React from "react";

interface HeroProps {
  id?: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor: string;
  bgImage?: string;
  textColor: string;
  height: "medium" | "large" | "fullscreen";
}

const heightMap = {
  medium: "min-h-[50vh]",
  large: "min-h-[75vh]",
  fullscreen: "min-h-screen",
};

export function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  bgColor,
  bgImage,
  textColor,
  height = "large",
}: HeroProps) {
  return (
    <section
      className={`relative flex items-center justify-center ${heightMap[height]} overflow-hidden`}
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: textColor,
      }}
    >
      {bgImage && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bgColor, opacity: 0.6 }}
        />
      )}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <h1
          className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--theme-heading-font)", color: textColor }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed opacity-90 sm:text-2xl"
            style={{ color: textColor }}
          >
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <div className="mt-10">
            <a
              href={ctaLink}
              className="inline-block rounded-lg px-8 py-4 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4"
              style={{
                backgroundColor: "var(--theme-primary)",
                color: "#fff",
                borderRadius: "var(--theme-radius)",
              }}
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export const HeroConfig = {
  label: "Hero",
  fields: {
    title: {
      type: "text" as const,
      label: "Titel",
    },
    subtitle: {
      type: "textarea" as const,
      label: "Untertitel",
    },
    ctaText: {
      type: "text" as const,
      label: "Button Text",
    },
    ctaLink: {
      type: "text" as const,
      label: "Button Link",
    },
    bgColor: {
      type: "text" as const,
      label: "Hintergrundfarbe",
    },
    bgImage: {
      type: "text" as const,
      label: "Hintergrundbild URL",
    },
    textColor: {
      type: "text" as const,
      label: "Textfarbe",
    },
    height: {
      type: "radio" as const,
      label: "Höhe",
      options: [
        { value: "medium", label: "Mittel (50vh)" },
        { value: "large", label: "Groß (75vh)" },
        { value: "fullscreen", label: "Vollbild" },
      ],
    },
  },
  defaultProps: {
    title: "Ihre Überschrift hier",
    subtitle: "Ein kurzer, überzeugender Satz über Ihr Angebot.",
    ctaText: "Mehr erfahren",
    ctaLink: "#",
    bgColor: "#0f172a",
    bgImage: "",
    textColor: "#ffffff",
    height: "large" as const,
  },
  render: Hero,
};
