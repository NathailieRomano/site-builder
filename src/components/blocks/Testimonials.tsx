"use client";

import React from "react";

interface TestimonialsProps {
  items: { name: string; role: string; text: string; avatar: string }[];
  columns: "2" | "3";
  style: "cards" | "minimal";
}

export function Testimonials({ items, columns = "3", style = "cards" }: TestimonialsProps) {
  const gridCols = columns === "2" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-16 px-6">
      <div className={`mx-auto max-w-6xl grid grid-cols-1 ${gridCols} gap-6`}>
        {items.map((item, i) => (
          <div
            key={i}
            className={
              style === "cards"
                ? "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                : "border-l-4 pl-6 py-2"
            }
            style={style === "minimal" ? { borderColor: "var(--theme-primary)" } : undefined}
          >
            <p className="text-base leading-relaxed opacity-80 mb-4">&ldquo;{item.text}&rdquo;</p>
            <div className="flex items-center gap-3">
              {item.avatar && (
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                {item.role && <p className="text-xs opacity-60">{item.role}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const TestimonialsConfig = {
  label: "Testimonials",
  fields: {
    items: {
      type: "array" as const,
      label: "Bewertungen",
      arrayFields: {
        name: { type: "text" as const, label: "Name" },
        role: { type: "text" as const, label: "Rolle / Firma" },
        text: { type: "textarea" as const, label: "Bewertungstext" },
        avatar: { type: "text" as const, label: "Avatar URL" },
      },
    },
    columns: {
      type: "radio" as const,
      label: "Spalten",
      options: [
        { value: "2", label: "2 Spalten" },
        { value: "3", label: "3 Spalten" },
      ],
    },
    style: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "cards", label: "Karten" },
        { value: "minimal", label: "Minimal" },
      ],
    },
  },
  defaultProps: {
    items: [
      { name: "Anna Müller", role: "Unternehmerin", text: "Absolut professionelle Arbeit. Ich bin begeistert!", avatar: "" },
      { name: "Thomas Weber", role: "Gastronom", text: "Schnell, unkompliziert und das Ergebnis übertrifft meine Erwartungen.", avatar: "" },
      { name: "Sarah Keller", role: "Designerin", text: "Endlich eine Website die zu meinem Business passt. Top!", avatar: "" },
    ],
    columns: "3" as const,
    style: "cards" as const,
  },
  render: Testimonials,
};
