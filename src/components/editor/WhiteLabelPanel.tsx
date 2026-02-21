"use client";

import React from "react";
import type { WhiteLabelSettings } from "@/types";

interface WhiteLabelPanelProps {
  settings: WhiteLabelSettings;
  onChange: (settings: WhiteLabelSettings) => void;
}

export function WhiteLabelPanel({ settings, onChange }: WhiteLabelPanelProps) {
  function update(key: keyof WhiteLabelSettings, value: unknown) {
    onChange({ ...settings, [key]: value });
  }

  return (
    <div className="space-y-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
        🏷️ White Label
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-300 font-medium">White Label aktivieren</p>
          <p className="text-xs text-zinc-600 mt-0.5">Entfernt &quot;Site Builder&quot; Branding</p>
        </div>
        <button
          onClick={() => update("enabled", !settings.enabled)}
          className={`w-10 h-5 rounded-full transition-colors ${
            settings.enabled ? "bg-indigo-600" : "bg-zinc-700"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-0.5 ${
              settings.enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {settings.enabled && (
        <>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">Eigenes Branding</label>
            <input
              type="text"
              value={settings.customBrand}
              onChange={(e) => update("customBrand", e.target.value)}
              placeholder="z.B. Webdesign Müller"
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-300 font-medium">&quot;Powered by&quot; verstecken</p>
              <p className="text-xs text-zinc-600 mt-0.5">Im Export und Preview</p>
            </div>
            <button
              onClick={() => update("hidePoweredBy", !settings.hidePoweredBy)}
              className={`w-10 h-5 rounded-full transition-colors ${
                settings.hidePoweredBy ? "bg-indigo-600" : "bg-zinc-700"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-0.5 ${
                  settings.hidePoweredBy ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-xs text-amber-400">
              💡 White Label ist ein Premium-Feature. Bei gehosteten Websites wird es mit dem Abo freigeschaltet.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
