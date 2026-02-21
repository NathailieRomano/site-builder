"use client";

import React, { useState } from "react";

// Curated icon set using emoji + common unicode symbols
const iconCategories = {
  "Business": ["💼", "📧", "📞", "🏢", "💰", "📊", "🤝", "🎯", "⭐", "🏆", "📋", "🔑"],
  "Tech": ["💻", "📱", "🌐", "⚙️", "🔧", "💡", "🔒", "☁️", "📡", "🖥️", "⌨️", "🖨️"],
  "Essen": ["🍕", "🍔", "🥗", "☕", "🍷", "🍰", "🍳", "🥘", "🍣", "🥖", "🫕", "🍺"],
  "Natur": ["🌿", "🌸", "🌊", "☀️", "🌙", "⛰️", "🌲", "🍂", "❄️", "🌈", "🔥", "💧"],
  "Personen": ["👤", "👥", "👋", "💪", "❤️", "🙏", "✋", "👍", "🎓", "👨‍💼", "👩‍💼", "🧑‍🔧"],
  "Pfeile": ["→", "←", "↑", "↓", "↗", "↘", "⟶", "⟵", "▶", "◀", "▲", "▼"],
  "Symbole": ["✓", "✕", "★", "♦", "●", "◆", "■", "▪", "✦", "✧", "⬤", "◎"],
  "Medien": ["📷", "🎬", "🎵", "🎨", "📝", "📚", "🎤", "🎧", "📺", "🖼️", "✏️", "📰"],
};

interface IconBlockProps {
  icon: string;
  size: "small" | "medium" | "large" | "xlarge";
  align: "left" | "center" | "right";
  heading: string;
  description: string;
  link: string;
}

const sizeMap = { small: "text-3xl", medium: "text-5xl", large: "text-7xl", xlarge: "text-8xl" };

export function IconBlock({ icon, size = "medium", align = "center", heading, description, link }: IconBlockProps) {
  const content = (
    <div className={`py-8 px-6 text-${align}`}>
      <div className={`${sizeMap[size]} mb-4`}>{icon || "⭐"}</div>
      {heading && (
        <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--theme-heading-font)" }}>
          {heading}
        </h3>
      )}
      {description && <p className="text-sm opacity-70 max-w-md mx-auto">{description}</p>}
    </div>
  );

  if (link) {
    return <a href={link} className="block hover:opacity-80 transition-opacity">{content}</a>;
  }
  return content;
}

// Icon picker as custom field
function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Business");

  const filteredIcons = search
    ? Object.values(iconCategories).flat().filter((i) => i.includes(search))
    : iconCategories[activeCategory as keyof typeof iconCategories] || [];

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-2xl cursor-pointer hover:bg-white/20 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {value || "⭐"}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Icon oder Emoji..."
          className="flex-1 rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      {open && (
        <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-3 space-y-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen..."
            className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1 text-xs focus:outline-none focus:border-indigo-500"
          />
          {!search && (
            <div className="flex flex-wrap gap-1">
              {Object.keys(iconCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded px-2 py-0.5 text-xs ${activeCategory === cat ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          <div className="grid grid-cols-6 gap-1">
            {filteredIcons.map((icon, i) => (
              <button
                key={i}
                onClick={() => { onChange(icon); setOpen(false); }}
                className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center text-lg transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const IconBlockConfig = {
  label: "Icon",
  fields: {
    icon: {
      type: "custom" as const,
      label: "Icon",
      render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) =>
        IconPicker({ value, onChange }),
    },
    heading: { type: "text" as const, label: "Überschrift" },
    description: { type: "textarea" as const, label: "Beschreibung" },
    link: { type: "text" as const, label: "Link (optional)" },
    size: {
      type: "select" as const,
      label: "Grösse",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Gross" },
        { value: "xlarge", label: "XL" },
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
  },
  defaultProps: {
    icon: "⭐",
    heading: "",
    description: "",
    link: "",
    size: "medium" as const,
    align: "center" as const,
  },
  render: IconBlock,
};
