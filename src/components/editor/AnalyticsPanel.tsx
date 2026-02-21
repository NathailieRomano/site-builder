"use client";

import React from "react";

interface AnalyticsSettings {
  provider: "none" | "plausible" | "umami" | "google";
  siteId: string;
  scriptUrl: string;
}

interface AnalyticsPanelProps {
  settings: AnalyticsSettings;
  onChange: (settings: AnalyticsSettings) => void;
}

export function AnalyticsPanel({ settings, onChange }: AnalyticsPanelProps) {
  function update(key: keyof AnalyticsSettings, value: string) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <div className="space-y-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
        📈 Analytics
      </div>

      <div>
        <label className="block text-xs text-zinc-400 mb-1.5">Anbieter</label>
        <select
          value={settings.provider}
          onChange={(e) => update("provider", e.target.value)}
          className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
        >
          <option value="none">Keine Analytics</option>
          <option value="plausible">Plausible (Privacy-friendly)</option>
          <option value="umami">Umami (Self-hosted)</option>
          <option value="google">Google Analytics</option>
        </select>
      </div>

      {settings.provider !== "none" && (
        <>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">
              {settings.provider === "plausible" ? "Domain (z.B. meinefirma.ch)" :
               settings.provider === "umami" ? "Website ID" :
               "Measurement ID (G-XXXXX)"}
            </label>
            <input
              type="text"
              value={settings.siteId}
              onChange={(e) => update("siteId", e.target.value)}
              placeholder={
                settings.provider === "plausible" ? "meinefirma.ch" :
                settings.provider === "umami" ? "abc123-def456" :
                "G-XXXXXXXXXX"
              }
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {settings.provider === "umami" && (
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Script URL</label>
              <input
                type="text"
                value={settings.scriptUrl}
                onChange={(e) => update("scriptUrl", e.target.value)}
                placeholder="https://analytics.meinefirma.ch/script.js"
                className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
            <p className="text-xs text-emerald-400 mb-1 font-medium">
              {settings.provider === "plausible" ? "🌿 Plausible" :
               settings.provider === "umami" ? "📊 Umami" : "📈 Google Analytics"}
            </p>
            <p className="text-[10px] text-zinc-500">
              {settings.provider === "plausible"
                ? "Privacy-friendly, keine Cookies, DSGVO-konform. Script wird im Export automatisch eingebaut."
                : settings.provider === "umami"
                ? "Self-hosted Alternative. Geben Sie Ihre Script-URL und Website-ID ein."
                : "Umfassende Analytics. Benötigt Cookie-Consent für DSGVO-Konformität."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Generate analytics script tag for HTML export
 */
export function getAnalyticsScript(settings?: AnalyticsSettings): string {
  if (!settings || settings.provider === "none" || !settings.siteId) return "";

  switch (settings.provider) {
    case "plausible":
      return `<script defer data-domain="${settings.siteId}" src="https://plausible.io/js/script.js"></script>`;
    case "umami":
      return `<script defer src="${settings.scriptUrl || "https://analytics.umami.is/script.js"}" data-website-id="${settings.siteId}"></script>`;
    case "google":
      return `<script async src="https://www.googletagmanager.com/gtag/js?id=${settings.siteId}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${settings.siteId}');</script>`;
    default:
      return "";
  }
}
