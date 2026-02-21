"use client";

import React, { useRef, useState, useEffect } from "react";

interface CustomFont {
  name: string;
  data: string; // base64 data URL
  format: string;
}

const STORAGE_KEY = "site-builder-custom-fonts";

export function getCustomFonts(): CustomFont[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function registerCustomFonts() {
  const fonts = getCustomFonts();
  fonts.forEach((font) => {
    const style = document.createElement("style");
    style.textContent = `@font-face { font-family: '${font.name}'; src: url(${font.data}) format('${font.format}'); font-display: swap; }`;
    document.head.appendChild(style);
  });
}

export function FontUploader({
  onFontsChange,
}: {
  onFontsChange?: () => void;
}) {
  const [fonts, setFonts] = useState<CustomFont[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFonts(getCustomFonts());
    registerCustomFonts();
  }, []);

  function handleUpload(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const formatMap: Record<string, string> = {
      woff2: "woff2",
      woff: "woff",
      ttf: "truetype",
      otf: "opentype",
    };
    const format = formatMap[ext];
    if (!format) {
      alert("Unterstützte Formate: .woff2, .woff, .ttf, .otf");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Maximal 2 MB pro Schriftart");
      return;
    }

    const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const newFont: CustomFont = { name, data: reader.result, format };
      const updated = [...fonts, newFont];
      setFonts(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Register immediately
      const style = document.createElement("style");
      style.textContent = `@font-face { font-family: '${name}'; src: url(${reader.result}) format('${format}'); font-display: swap; }`;
      document.head.appendChild(style);

      onFontsChange?.();
    };
    reader.readAsDataURL(file);
  }

  function removeFont(index: number) {
    const updated = fonts.filter((_, i) => i !== index);
    setFonts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    onFontsChange?.();
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-zinc-400">Custom Fonts</label>
        <button
          onClick={() => inputRef.current?.click()}
          className="rounded bg-indigo-600/20 px-2 py-1 text-xs text-indigo-400 hover:bg-indigo-600/30 transition-colors"
        >
          + Upload
        </button>
      </div>

      {fonts.length > 0 && (
        <div className="space-y-1.5">
          {fonts.map((font, i) => (
            <div key={i} className="flex items-center justify-between rounded bg-white/5 px-3 py-2">
              <span className="text-xs text-zinc-300" style={{ fontFamily: `'${font.name}'` }}>
                {font.name}
              </span>
              <button
                onClick={() => removeFont(i)}
                className="text-xs text-zinc-600 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {fonts.length === 0 && (
        <p className="text-xs text-zinc-600">.woff2, .woff, .ttf, .otf · max 2MB</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".woff2,.woff,.ttf,.otf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />
    </div>
  );
}
