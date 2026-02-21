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
import { exportProjectAsZip } from "@/lib/export";
import { applyThemeToRoot } from "@/lib/theme";
import { ThemePanel } from "@/components/editor/ThemePanel";
import { PageManager } from "@/components/editor/PageManager";
import { SeoPanel } from "@/components/editor/SeoPanel";
import { WhiteLabelPanel } from "@/components/editor/WhiteLabelPanel";
import { VersionPanel } from "@/components/editor/VersionPanel";
import { saveVersion } from "@/lib/versioning";
import { saveCloudProject } from "@/lib/cloud-storage";
import { supabase } from "@/lib/supabase";
import type { SiteProject, PageSeo, WhiteLabelSettings } from "@/types";

type SidebarTab = "pages" | "theme" | "seo" | "settings";

export default function EditorPage() {
  const [project, setProject] = useState<SiteProject | null>(null);
  const [activeTab, setActiveTab] = useState<SidebarTab>("pages");
  const [saved, setSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cloudId, setCloudId] = useState<string | null>(null);
  const [cloudSaving, setCloudSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load project on mount + check auth + cloud project ID
  useEffect(() => {
    const p = getOrCreateProject();
    setProject(p);
    applyThemeToRoot(p.theme);

    // Check for cloud project ID in URL
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("project");
    if (pid) setCloudId(pid);

    // Check if logged in
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    if (project) {
      applyThemeToRoot(project.theme);
    }
  }, [project?.theme]);

  // Auto-save to localStorage every 5s, cloud every 30s
  useEffect(() => {
    if (!project) return;
    const localTimer = setInterval(() => {
      saveProject(project);
      saveVersion(project); // Auto-snapshot (throttled to 60s internally)
    }, 5000);
    const cloudTimer = setInterval(async () => {
      if (!isLoggedIn || !cloudId) return;
      try {
        setCloudSaving(true);
        await saveCloudProject(project, cloudId);
      } catch (err) {
        console.error("Auto-save failed:", err);
      } finally {
        setCloudSaving(false);
      }
    }, 30000);
    return () => { clearInterval(localTimer); clearInterval(cloudTimer); };
  }, [project, isLoggedIn, cloudId]);

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
            {(["pages", "theme", "seo", "settings"] as SidebarTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-[10px] font-medium transition-colors ${
                  activeTab === tab
                    ? "text-indigo-400 border-b border-indigo-500"
                    : "text-zinc-500 hover:text-zinc-400"
                }`}
              >
                {tab === "pages" ? "📄" : tab === "theme" ? "🎨" : tab === "seo" ? "🔍" : "⚙️"}
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
            ) : activeTab === "theme" ? (
              <ThemePanel
                theme={project.theme}
                onChange={handleThemeChange}
              />
            ) : activeTab === "seo" ? (
              <SeoPanel
                pageName={activePage?.name || ""}
                seo={activePage?.seo || { title: "", description: "", ogImage: "" }}
                onChange={(seo: PageSeo) => {
                  if (!project || !activePage) return;
                  const updatedPages = project.pages.map((p) =>
                    p.id === activePage.id ? { ...p, seo } : p
                  );
                  const updated = { ...project, pages: updatedPages, updatedAt: new Date().toISOString() };
                  saveProject(updated);
                  setProject(updated);
                }}
              />
            ) : (
              <div className="space-y-6">
                <VersionPanel
                  project={project}
                  onRestore={(restored) => {
                    saveProject(restored);
                    setProject(restored);
                  }}
                />
                <div className="border-t border-zinc-800 pt-4">
                  <WhiteLabelPanel
                    settings={project?.whiteLabel || { enabled: false, customBrand: "", hidePoweredBy: false }}
                    onChange={(wl: WhiteLabelSettings) => {
                      if (!project) return;
                      const updated = { ...project, whiteLabel: wl, updatedAt: new Date().toISOString() };
                      saveProject(updated);
                      setProject(updated);
                    }}
                  />
                </div>
              </div>
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
            {isLoggedIn && (
              <button
                onClick={async () => {
                  if (!project) return;
                  setCloudSaving(true);
                  try {
                    saveProject(project);
                    const cloud = await saveCloudProject(project, cloudId || undefined);
                    if (!cloudId) setCloudId(cloud.id);
                    setSaved(true);
                    setTimeout(() => setSaved(false), 2000);
                  } catch (err) {
                    console.error("Cloud save failed:", err);
                    alert("Cloud-Speicherung fehlgeschlagen");
                  } finally {
                    setCloudSaving(false);
                  }
                }}
                disabled={cloudSaving}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30 py-2.5 text-xs font-medium text-indigo-400 hover:bg-indigo-600/30 hover:text-indigo-300 transition-colors disabled:opacity-50"
              >
                <span>☁️</span> {cloudSaving ? "Speichern..." : "In Cloud speichern"}
              </button>
            )}
            <button
              onClick={async () => {
                if (!project) return;
                saveProject(project);
                const blob = await exportProjectAsZip(project);
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}.zip`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 py-2.5 text-xs font-medium text-emerald-400 hover:bg-emerald-600/30 hover:text-emerald-300 transition-colors"
            >
              <span>📦</span> Als ZIP exportieren
            </button>
            <Link
              href={isLoggedIn ? "/dashboard" : "/"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 py-2.5 text-xs font-medium text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 transition-colors"
            >
              ← {isLoggedIn ? "Dashboard" : "Startseite"}
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
              <input
                type="text"
                value={project.name}
                onChange={(e) => {
                  const updated = { ...project, name: e.target.value, updatedAt: new Date().toISOString() };
                  setProject(updated);
                  saveProject(updated);
                }}
                className="bg-transparent text-xs font-semibold text-zinc-200 border-b border-transparent hover:border-zinc-700 focus:border-indigo-500 focus:outline-none px-1 py-0.5 max-w-[150px]"
                title="Projekt umbenennen"
              />
              <span className="text-zinc-700 text-xs">·</span>
              <span className="text-xs text-zinc-500">{activePage.name}</span>
              <span className="text-xs text-zinc-600">{activePage.slug}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-600 hidden lg:inline" title="Undo: Ctrl+Z / Redo: Ctrl+Y">
              ↩ Ctrl+Z &nbsp; ↪ Ctrl+Y
            </span>
            {cloudSaving && (
              <span className="text-xs text-indigo-400 flex items-center gap-1 animate-pulse">
                ☁️ Speichern...
              </span>
            )}
            {saved && !cloudSaving && (
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
