"use client";

import React from "react";

interface SocialLink {
  platform: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  size: "small" | "medium" | "large";
  align: "left" | "center" | "right";
  style: "icons" | "pills";
}

const platformIcons: Record<string, string> = {
  facebook: "📘",
  instagram: "📸",
  twitter: "🐦",
  linkedin: "💼",
  youtube: "▶️",
  tiktok: "🎵",
  email: "📧",
  website: "🌐",
  whatsapp: "💬",
  telegram: "✈️",
};

const platformLabels: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "X / Twitter",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
  email: "E-Mail",
  website: "Website",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
};

const sizeMap = { small: "text-xl", medium: "text-2xl", large: "text-3xl" };
const pillSize = { small: "px-3 py-1.5 text-xs", medium: "px-4 py-2 text-sm", large: "px-5 py-2.5 text-base" };

export function SocialLinks({ links, size = "medium", align = "center", style = "icons" }: SocialLinksProps) {
  return (
    <section className="py-8 px-6">
      <div className={`mx-auto max-w-4xl flex flex-wrap gap-4 justify-${align}`}>
        {links.map((link, i) => {
          const icon = platformIcons[link.platform] || "🔗";
          const label = platformLabels[link.platform] || link.platform;
          const href = link.platform === "email" ? `mailto:${link.url}` : link.url;

          if (style === "pills") {
            return (
              <a
                key={i}
                href={href}
                target={link.platform === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border border-gray-200 font-medium transition-all hover:scale-105 hover:shadow-md ${pillSize[size]}`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </a>
            );
          }

          return (
            <a
              key={i}
              href={href}
              target={link.platform === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`${sizeMap[size]} transition-transform hover:scale-110`}
              title={label}
            >
              {icon}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export const SocialLinksConfig = {
  label: "Social Links",
  fields: {
    links: {
      type: "array" as const,
      label: "Social Media",
      arrayFields: {
        platform: {
          type: "select" as const,
          label: "Plattform",
          options: [
            { value: "facebook", label: "Facebook" },
            { value: "instagram", label: "Instagram" },
            { value: "twitter", label: "X / Twitter" },
            { value: "linkedin", label: "LinkedIn" },
            { value: "youtube", label: "YouTube" },
            { value: "tiktok", label: "TikTok" },
            { value: "whatsapp", label: "WhatsApp" },
            { value: "telegram", label: "Telegram" },
            { value: "email", label: "E-Mail" },
            { value: "website", label: "Website" },
          ],
        },
        url: { type: "text" as const, label: "URL oder E-Mail" },
      },
    },
    size: {
      type: "radio" as const,
      label: "Grösse",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Gross" },
      ],
    },
    align: {
      type: "radio" as const,
      label: "Ausrichtung",
      options: [
        { value: "left", label: "Links" },
        { value: "center", label: "Mitte" },
        { value: "right", label: "Rechts" },
      ],
    },
    style: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "icons", label: "Nur Icons" },
        { value: "pills", label: "Pills mit Text" },
      ],
    },
  },
  defaultProps: {
    links: [
      { platform: "instagram", url: "https://instagram.com/" },
      { platform: "facebook", url: "https://facebook.com/" },
      { platform: "email", url: "info@example.ch" },
    ],
    size: "medium" as const,
    align: "center" as const,
    style: "icons" as const,
  },
  render: SocialLinks,
};
