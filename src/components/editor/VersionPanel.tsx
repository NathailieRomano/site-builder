"use client";

import React, { useEffect, useState } from "react";
import { getVersions, restoreVersion, saveVersion } from "@/lib/versioning";
import type { SiteProject } from "@/types";

interface VersionPanelProps {
  project: SiteProject;
  onRestore: (project: SiteProject) => void;
}

export function VersionPanel({ project, onRestore }: VersionPanelProps) {
  const [versions, setVersions] = useState<{ timestamp: string; label: string }[]>([]);

  useEffect(() => {
    setVersions(getVersions(project.id));
  }, [project.id]);

  function handleSaveSnapshot() {
    const label = prompt("Name für diese Version:", `Snapshot ${new Date().toLocaleTimeString("de-DE")}`);
    if (!label) return;
    saveVersion(project, label);
    setVersions(getVersions(project.id));
  }

  function handleRestore(index: number) {
    const v = versions[index];
    if (!confirm(`Version "${v.label}" vom ${new Date(v.timestamp).toLocaleString("de-DE")} wiederherstellen?`)) return;
    const restored = restoreVersion(project.id, index);
    if (restored) {
      onRestore(restored);
      alert("Version wiederhergestellt!");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Versionen
        </div>
        <button
          onClick={handleSaveSnapshot}
          className="rounded bg-indigo-600/20 px-2 py-1 text-xs text-indigo-400 hover:bg-indigo-600/30 transition-colors"
        >
          + Snapshot
        </button>
      </div>

      {versions.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-3xl mb-2 opacity-30">📸</div>
          <p className="text-xs text-zinc-600">Noch keine Versionen.</p>
          <p className="text-xs text-zinc-700 mt-1">Snapshots werden automatisch beim Speichern erstellt.</p>
        </div>
      ) : (
        <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
          {[...versions].reverse().map((v, i) => {
            const realIndex = versions.length - 1 - i;
            const date = new Date(v.timestamp);
            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5 group hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-xs text-zinc-300 font-medium">{v.label}</p>
                  <p className="text-[10px] text-zinc-600 mt-0.5">
                    {date.toLocaleDateString("de-DE")} · {date.toLocaleTimeString("de-DE")}
                  </p>
                </div>
                <button
                  onClick={() => handleRestore(realIndex)}
                  className="rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 hover:bg-indigo-600/20 hover:text-indigo-400 transition-all"
                >
                  ↩ Restore
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="rounded-lg border border-zinc-800 p-3">
        <p className="text-[10px] text-zinc-600">
          Max. 20 Versionen gespeichert. Auto-Snapshots alle 60s. Lokal im Browser gespeichert.
        </p>
      </div>
    </div>
  );
}
