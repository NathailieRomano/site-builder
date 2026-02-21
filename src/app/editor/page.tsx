"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Puck } from "@puckeditor/core";
import Link from "next/link";
import { puckConfig } from "@/lib/puck-config";
import {
  getOrCreateProject,
  saveProject,
  updatePageData,
  addPage,
  removePage,
  renamePage,
  updateTheme,
} from "@/lib/storage";
import { applyThemeToRoot } from "@/lib/theme";
import { ThemePanel } from "@/components/editor/ThemePanel";
import { PageManager } from "@/components/editor/PageManager";
import type { SiteProject } from "@/types";

type SidebarTab = "pages" | "theme";

export default function EditorPage() {
  const [project, setProject] = useState<SiteProject | null>(null);
  const [activeTab, setActiveTab] = useState<SidebarTab>("pages");
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load project on mount
  useEffect(() => {
    const p = getOrCreateProject();
    setProject(p);
    applyThemeToRoot(p.theme);
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (project) {
      applyThemeToRoot(project.theme);
    }
  }, [project?.theme]);

  const activePage = project?.pages.find((p) => p.id === project.activePageId);

  const handlePublish = useCallback(
    (data: Record<string, unknown>) => {
      if (!project || !activePage) return;
      const updated = updatePageData(project, activePage.id, data);
      saveProject(updated);
      setProject(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    [project, activePage]
  );

  const handleChange = useCallback(
    (data: Record<string, unknown>) => {
      if (!project || !activePage) return;
      const updated = updatePageData(project, activePage.id, data);
      setProject(updated);
    },
    [project, activePage]
  );

  const handleSelectPage = useCallback(
    (pageId: string) => {
      if (!project) return;
      // Save current page data first (already tracked via onChange)
      saveProject(project);
      setProject((prev) =>
        prev ? { ...prev, activePageId: pageId } : null
      );
    },
    [project]
  );

  const handleAddPage = useCallback(
    (name: string, slug: string) => {
      if (!project) return;
      const updated = addPage(project, name, slug);
      saveProject(updated);
      setProject(updated);
    },
    [project]
  );

  const handleRemovePage = useCallback(
    (pageId: string) => {
      if (!project) return;
      const updated = removePage(project, pageId);
      saveProject(updated);
      setProject(updated);
    },
    [project]
  );

  const handleRenamePage = useCallback(
    (pageId: string, name: string) => {
      if (!project) return;
      const updated = renamePage(project, pageId, name);
      saveProject(updated);
      setProject(updated);
    },
    [project]
  );

  const handleThemeChange = useCallback(
    (theme: SiteProject["theme"]) => {
      if (!project) return;
      const updated = updateTheme(project, theme);
      saveProject(updated);
      setProject(updated);
    },
    [project]
  );

  if (!project || !activePage) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⚡</div>
          <p>Editor wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 font-sans">
      {/* ── Left Sidebar ──────────────────────────────────────────────── */}
      {sidebarOpen && (
        <aside className="w-64 flex-shrink-0 flex flex-col bg-[#111118] border-r border-white/5 z-20">
          {/* Logo / Title */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <span className="text-sm font-semibold text-zinc-200">Site Builder</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
            >
              ◀
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-white/5">
            {(["pages", "theme"] as SidebarTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === tab
                    ? "text-indigo-400 border-b border-indigo-500"
                    : "text-zinc-500 hover:text-zinc-400"
                }`}
              >
                {tab === "pages" ? "📄 Seiten" : "🎨 Theme"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "pages" ? (
              <PageManager
                project={project}
                onSelectPage={handleSelectPage}
                onAddPage={handleAddPage}
                onRemovePage={handleRemovePage}
                onRenamePage={handleRenamePage}
              />
            ) : (
              <ThemePanel
                theme={project.theme}
                onChange={handleThemeChange}
              />
            )}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/5 space-y-2">
            <Link
              href="/preview"
              target="_blank"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-xs font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200 transition-colors"
            >
              <span>👁</span> Vorschau
            </Link>
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 py-2.5 text-xs font-medium text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
            >
              ← Dashboard
            </Link>
          </div>
        </aside>
      )}

      {/* ── Main Editor Area ──────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f0f14] border-b border-white/5 flex-shrink-0 z-10">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                ▶ Sidebar
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Seite:</span>
              <span className="text-xs font-medium text-zinc-300">{activePage.name}</span>
              <span className="text-xs text-zinc-600">{activePage.slug}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                ✓ Gespeichert
              </span>
            )}
            <button
              onClick={() => {
                saveProject(project);
                setSaved(true);
                setTimeout(() => setSaved(false), 2500);
              }}
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              Speichern
            </button>
          </div>
        </div>

        {/* Puck Editor */}
        <div className="flex-1 overflow-hidden">
          <Puck
            key={activePage.id}
            config={puckConfig}
            data={activePage.data as Parameters<typeof Puck>[0]["data"]}
            onPublish={handlePublish}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
