"use client";

import React from "react";

interface TextBlockProps {
  id?: string;
  heading: string;
  content: string;
  align: "left" | "center" | "right";
  size: "small" | "medium" | "large";
}

const sizeMap = {
  small: { heading: "text-xl", content: "text-base", max: "max-w-2xl" },
  medium: { heading: "text-3xl", content: "text-lg", max: "max-w-3xl" },
  large: { heading: "text-4xl", content: "text-xl", max: "max-w-4xl" },
};

const alignMap = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ml-auto",
};

export function TextBlock({
  heading,
  content,
  align = "left",
  size = "medium",
}: TextBlockProps) {
  const s = sizeMap[size];
  const a = alignMap[align];

  return (
    <section className="py-16 px-6">
      <div className={`${s.max} ${a}`}>
        {heading && (
          <h2
            className={`${s.heading} font-bold leading-tight mb-6`}
            style={{
              fontFamily: "var(--theme-heading-font)",
              color: "var(--theme-text)",
            }}
          >
            {heading}
          </h2>
        )}
        {content && (
          <div
            className={`${s.content} leading-relaxed whitespace-pre-line`}
            style={{ color: "var(--theme-text)", opacity: 0.85 }}
          >
            {content}
          </div>
        )}
      </div>
    </section>
  );
}

export const TextBlockConfig = {
  label: "Text",
  fields: {
    heading: {
      type: "text" as const,
      label: "Überschrift",
    },
    content: {
      type: "textarea" as const,
      label: "Text",
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
    size: {
      type: "radio" as const,
      label: "Textgröße",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Groß" },
      ],
    },
  },
  defaultProps: {
    heading: "Überschrift",
    content: "Schreiben Sie hier Ihren Text. Beschreiben Sie Ihr Angebot, Ihre Geschichte oder andere wichtige Informationen.",
    align: "left" as const,
    size: "medium" as const,
  },
  render: TextBlock,
};
