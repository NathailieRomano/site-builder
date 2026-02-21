"use client";

import React from "react";
import type { PageSeo } from "@/types";

interface SeoPanelProps {
  pageName: string;
  seo: PageSeo;
  onChange: (seo: PageSeo) => void;
}

export function SeoPanel({ pageName, seo, onChange }: SeoPanelProps) {
  function update(key: keyof PageSeo, value: string) {
    onChange({ ...seo, [key]: value });
  }

  const titleLength = (seo.title || "").length;
  const descLength = (seo.description || "").length;

  return (
    <div className="space-y-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
        SEO — {pageName}
      </div>

      {/* Preview */}
      <div className="rounded-lg bg-white p-4 text-left">
        <p className="text-sm font-medium text-blue-700 truncate">
          {seo.title || pageName || "Seitentitel"}
        </p>
        <p className="text-xs text-green-700 truncate mt-0.5">
          ihredomain.ch{" "}
        </p>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
          {seo.description || "Beschreibung Ihrer Seite..."}
        </p>
      </div>

      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">
          Seitentitel{" "}
          <span className={titleLength > 60 ? "text-red-400" : "text-zinc-600"}>
            ({titleLength}/60)
          </span>
        </label>
        <input
          type="text"
          value={seo.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder={pageName}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">
          Beschreibung{" "}
          <span className={descLength > 160 ? "text-red-400" : "text-zinc-600"}>
            ({descLength}/160)
          </span>
        </label>
        <textarea
          value={seo.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Kurze Beschreibung Ihrer Seite für Suchmaschinen..."
          rows={3}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">OG-Image URL</label>
        <input
          type="text"
          value={seo.ogImage}
          onChange={(e) => update("ogImage", e.target.value)}
          placeholder="https://... (Vorschaubild für Social Media)"
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="rounded-lg border border-zinc-800 p-3">
        <p className="text-xs text-zinc-500">
          💡 <strong>Tipp:</strong> Titel unter 60 Zeichen, Beschreibung unter 160 Zeichen. So wird Ihre Seite in Google optimal angezeigt.
        </p>
      </div>
    </div>
  );
}
