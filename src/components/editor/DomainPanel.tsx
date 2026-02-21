"use client";

import React from "react";

interface DomainSettings {
  customDomain: string;
  subdomain: string;
}

interface DomainPanelProps {
  settings: DomainSettings;
  onChange: (settings: DomainSettings) => void;
  isPublished: boolean;
}

export function DomainPanel({ settings, onChange, isPublished }: DomainPanelProps) {
  return (
    <div className="space-y-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
        🔗 Domain & Hosting
      </div>

      {/* Subdomain */}
      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">Subdomain (gratis)</label>
        <div className="flex items-center gap-0">
          <input
            type="text"
            value={settings.subdomain}
            onChange={(e) => onChange({ ...settings, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
            placeholder="meine-firma"
            className="flex-1 rounded-l-lg bg-zinc-800 border border-zinc-700 border-r-0 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
          />
          <span className="rounded-r-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs text-zinc-500">
            .sitebuilder.ch
          </span>
        </div>
      </div>

      {/* Custom Domain */}
      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">Custom Domain (Pro)</label>
        <input
          type="text"
          value={settings.customDomain}
          onChange={(e) => onChange({ ...settings, customDomain: e.target.value })}
          placeholder="www.meinefirma.ch"
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {settings.customDomain && (
        <div className="rounded-lg border border-zinc-800 p-3 space-y-2">
          <p className="text-xs text-zinc-400 font-medium">DNS-Einrichtung:</p>
          <div className="rounded bg-zinc-900 p-2 font-mono text-[10px] text-zinc-500 space-y-1">
            <p>Typ: CNAME</p>
            <p>Name: {settings.customDomain.startsWith("www.") ? "www" : "@"}</p>
            <p>Wert: cname.vercel-dns.com</p>
          </div>
          <p className="text-[10px] text-zinc-600">
            Füge diesen DNS-Eintrag bei deinem Domain-Provider hinzu. SSL wird automatisch aktiviert.
          </p>
        </div>
      )}

      {/* Status */}
      <div className="rounded-lg bg-white/5 p-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPublished ? "bg-emerald-400" : "bg-zinc-600"}`} />
          <span className="text-xs text-zinc-400">
            {isPublished ? "Veröffentlicht" : "Nicht veröffentlicht"}
          </span>
        </div>
        {!isPublished && (
          <p className="text-[10px] text-zinc-600 mt-1.5">
            Custom Domains werden beim Veröffentlichen aktiv. Hosting-Abo erforderlich.
          </p>
        )}
      </div>

      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
        <p className="text-xs text-amber-400">
          💡 Custom Domains sind ein Premium-Feature. Subdomain-Hosting ist im Basis-Plan inklusive.
        </p>
      </div>
    </div>
  );
}
