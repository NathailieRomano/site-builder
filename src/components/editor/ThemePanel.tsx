"use client";

import React from "react";
import type { Theme } from "@/types";

interface ThemePanelProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const fontOptions = [
  { value: "'Inter', system-ui, sans-serif", label: "Inter (Modern)" },
  { value: "'Roboto', system-ui, sans-serif", label: "Roboto (Clean)" },
  { value: "'DM Sans', system-ui, sans-serif", label: "DM Sans (Friendly)" },
  { value: "'Lato', 'Helvetica Neue', sans-serif", label: "Lato (Classic)" },
  { value: "'Poppins', system-ui, sans-serif", label: "Poppins (Trendy)" },
  { value: "'Montserrat', system-ui, sans-serif", label: "Montserrat (Bold)" },
  { value: "'Open Sans', system-ui, sans-serif", label: "Open Sans (Neutral)" },
  { value: "Georgia, 'Times New Roman', serif", label: "Georgia (Serif)" },
  { value: "'Playfair Display', Georgia, serif", label: "Playfair (Elegant)" },
];

const radiusOptions = [
  { value: "0", label: "Keine (0)" },
  { value: "0.25rem", label: "Klein (4px)" },
  { value: "0.5rem", label: "Mittel (8px)" },
  { value: "0.75rem", label: "Groß (12px)" },
  { value: "1rem", label: "XL (16px)" },
  { value: "9999px", label: "Rund (pill)" },
];

export function ThemePanel({ theme, onChange }: ThemePanelProps) {
  function update(key: keyof Theme, value: string) {
    onChange({ ...theme, [key]: value });
  }

  return (
    <div className="space-y-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
        Farben
      </div>

      {[
        { key: "primaryColor" as const, label: "Primärfarbe" },
        { key: "secondaryColor" as const, label: "Sekundärfarbe" },
        { key: "accentColor" as const, label: "Akzentfarbe" },
        { key: "backgroundColor" as const, label: "Hintergrund" },
        { key: "textColor" as const, label: "Textfarbe" },
      ].map(({ key, label }) => (
        <div key={key} className="flex items-center gap-3">
          <input
            type="color"
            value={theme[key]}
            onChange={(e) => update(key, e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-transparent"
          />
          <div className="flex-1">
            <label className="block text-xs text-zinc-400 mb-0.5">{label}</label>
            <input
              type="text"
              value={theme[key]}
              onChange={(e) => update(key, e.target.value)}
              className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      ))}

      <div className="border-t border-zinc-800 pt-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          Typografie
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Schriftart (Body)</label>
            <select
              value={theme.fontFamily}
              onChange={(e) => update("fontFamily", e.target.value)}
              className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              {fontOptions.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Schriftart (Überschriften)</label>
            <select
              value={theme.headingFont}
              onChange={(e) => update("headingFont", e.target.value)}
              className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              {fontOptions.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          Abstände & Form
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">Ecken-Radius</label>
          <select
            value={theme.borderRadius}
            onChange={(e) => update("borderRadius", e.target.value)}
            className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
          >
            {radiusOptions.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
