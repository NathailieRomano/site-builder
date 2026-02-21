"use client";

import React from "react";

interface Language {
  code: string;
  label: string;
  flag: string;
  href: string;
}

interface LanguageSwitcherProps {
  languages: Language[];
  style: "flags" | "text" | "dropdown";
  activeCode: string;
}

export function LanguageSwitcher({ languages, style = "flags", activeCode }: LanguageSwitcherProps) {
  if (style === "dropdown") {
    return (
      <div className="inline-block">
        <select
          value={activeCode}
          onChange={(e) => {
            const lang = languages.find((l) => l.code === e.target.value);
            if (lang?.href) window.location.href = lang.href;
          }}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 py-2 px-4 justify-center">
      {languages.map((lang) => (
        <a
          key={lang.code}
          href={lang.href || "#"}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
            lang.code === activeCode
              ? "font-semibold opacity-100"
              : "opacity-60 hover:opacity-100"
          }`}
          style={lang.code === activeCode ? { backgroundColor: "var(--theme-primary)", color: "#fff", borderRadius: "var(--theme-radius)" } : undefined}
        >
          {style === "flags" && <span>{lang.flag}</span>}
          <span>{style === "flags" ? lang.code.toUpperCase() : lang.label}</span>
        </a>
      ))}
    </div>
  );
}

export const LanguageSwitcherConfig = {
  label: "Sprachauswahl",
  fields: {
    languages: {
      type: "array" as const,
      label: "Sprachen",
      arrayFields: {
        code: { type: "text" as const, label: "Code (z.B. de)" },
        label: { type: "text" as const, label: "Name" },
        flag: { type: "text" as const, label: "Flagge (Emoji)" },
        href: { type: "text" as const, label: "Link (Seite oder URL)" },
      },
    },
    activeCode: { type: "text" as const, label: "Aktive Sprache (Code)" },
    style: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "flags", label: "Flaggen" },
        { value: "text", label: "Text" },
        { value: "dropdown", label: "Dropdown" },
      ],
    },
  },
  defaultProps: {
    languages: [
      { code: "de", label: "Deutsch", flag: "🇩🇪", href: "/" },
      { code: "fr", label: "Français", flag: "🇫🇷", href: "/fr" },
      { code: "it", label: "Italiano", flag: "🇮🇹", href: "/it" },
      { code: "en", label: "English", flag: "🇬🇧", href: "/en" },
    ],
    activeCode: "de",
    style: "flags" as const,
  },
  render: LanguageSwitcher,
};
