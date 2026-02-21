"use client";

import React from "react";

interface Column {
  content: string;
  heading: string;
  icon: string;
  align: "left" | "center" | "right";
}

interface ColumnsProps {
  columns: Column[];
  layout: "2-equal" | "3-equal" | "4-equal" | "1-2" | "2-1" | "1-1-1-1";
  gap: "small" | "medium" | "large";
  verticalAlign: "top" | "center" | "bottom";
  bgColor: string;
}

const gapMap = { small: "gap-4", medium: "gap-6", large: "gap-10" };
const alignMap = { top: "items-start", center: "items-center", bottom: "items-end" };

const layoutGrids: Record<string, string> = {
  "2-equal": "grid-cols-1 md:grid-cols-2",
  "3-equal": "grid-cols-1 md:grid-cols-3",
  "4-equal": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  "1-2": "grid-cols-1 md:grid-cols-[1fr_2fr]",
  "2-1": "grid-cols-1 md:grid-cols-[2fr_1fr]",
  "1-1-1-1": "grid-cols-2 md:grid-cols-4",
};

export function Columns({ columns, layout = "2-equal", gap = "medium", verticalAlign = "top", bgColor }: ColumnsProps) {
  const gridCls = layoutGrids[layout] || layoutGrids["2-equal"];

  return (
    <section className="py-12 px-6" style={{ backgroundColor: bgColor || "transparent" }}>
      <div className={`mx-auto max-w-6xl grid ${gridCls} ${gapMap[gap]} ${alignMap[verticalAlign]}`}>
        {columns.map((col, i) => (
          <div key={i} className={`text-${col.align || "left"}`}>
            {col.icon && <div className="text-4xl mb-3">{col.icon}</div>}
            {col.heading && (
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--theme-heading-font)" }}
              >
                {col.heading}
              </h3>
            )}
            {col.content && (
              <p className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap">{col.content}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export const ColumnsConfig = {
  label: "Spalten-Layout",
  fields: {
    layout: {
      type: "select" as const,
      label: "Layout",
      options: [
        { value: "2-equal", label: "2 gleich" },
        { value: "3-equal", label: "3 gleich" },
        { value: "4-equal", label: "4 gleich" },
        { value: "1-2", label: "1/3 + 2/3" },
        { value: "2-1", label: "2/3 + 1/3" },
      ],
    },
    columns: {
      type: "array" as const,
      label: "Spalten",
      arrayFields: {
        icon: { type: "text" as const, label: "Icon (Emoji)" },
        heading: { type: "text" as const, label: "Überschrift" },
        content: { type: "textarea" as const, label: "Inhalt" },
        align: {
          type: "select" as const,
          label: "Ausrichtung",
          options: [
            { value: "left", label: "Links" },
            { value: "center", label: "Mitte" },
            { value: "right", label: "Rechts" },
          ],
        },
      },
    },
    gap: {
      type: "radio" as const,
      label: "Abstand",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Gross" },
      ],
    },
    verticalAlign: {
      type: "radio" as const,
      label: "Vertikale Ausrichtung",
      options: [
        { value: "top", label: "Oben" },
        { value: "center", label: "Mitte" },
        { value: "bottom", label: "Unten" },
      ],
    },
    bgColor: { type: "text" as const, label: "Hintergrundfarbe" },
  },
  defaultProps: {
    layout: "3-equal" as const,
    columns: [
      { icon: "🚀", heading: "Schnell", content: "Blitzschnelle Ladezeiten für Ihre Besucher.", align: "center" as const },
      { icon: "🎨", heading: "Modern", content: "Zeitgemässes Design das Eindruck macht.", align: "center" as const },
      { icon: "📱", heading: "Responsive", content: "Perfekt auf jedem Gerät — vom Handy bis zum Desktop.", align: "center" as const },
    ],
    gap: "medium" as const,
    verticalAlign: "top" as const,
    bgColor: "",
  },
  render: Columns,
};
