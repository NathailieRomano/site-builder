"use client";

import React, { useState } from "react";

interface FAQProps {
  heading: string;
  items: { question: string; answer: string }[];
  style: "simple" | "bordered";
}

export function FAQ({ heading, items, style = "bordered" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-3xl">
        {heading && (
          <h2
            className="text-3xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--theme-heading-font)" }}
          >
            {heading}
          </h2>
        )}
        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={
                  style === "bordered"
                    ? "rounded-xl border border-gray-200 overflow-hidden"
                    : "border-b border-gray-200"
                }
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-medium transition-colors hover:bg-gray-50"
                >
                  <span>{item.question}</span>
                  <span
                    className="ml-4 text-xl transition-transform duration-200 flex-shrink-0"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm leading-relaxed opacity-75">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const FAQConfig = {
  label: "FAQ",
  fields: {
    heading: { type: "text" as const, label: "Überschrift" },
    items: {
      type: "array" as const,
      label: "Fragen",
      arrayFields: {
        question: { type: "text" as const, label: "Frage" },
        answer: { type: "textarea" as const, label: "Antwort" },
      },
    },
    style: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "bordered", label: "Karten" },
        { value: "simple", label: "Einfach" },
      ],
    },
  },
  defaultProps: {
    heading: "Häufig gestellte Fragen",
    items: [
      { question: "Wie lange dauert die Erstellung?", answer: "Je nach Umfang zwischen 5 und 20 Arbeitstagen. Nach dem Briefing erhalten Sie einen genauen Zeitplan." },
      { question: "Was kostet eine Website?", answer: "Unsere Pakete starten ab CHF 590. Den genauen Preis erfahren Sie nach einem kurzen Gespräch über Ihre Anforderungen." },
      { question: "Kann ich die Website selbst bearbeiten?", answer: "Ja! Sie erhalten Zugang zu einem einfachen Editor, mit dem Sie Texte und Bilder jederzeit selbst ändern können." },
    ],
    style: "bordered" as const,
  },
  render: FAQ,
};
