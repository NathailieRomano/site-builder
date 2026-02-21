"use client";

import React, { useEffect, useState } from "react";
import { Render } from "@puckeditor/core";
import Link from "next/link";
import { puckConfig } from "@/lib/puck-config";
import { createAnimatedConfig } from "@/lib/puck-config-animated";
import { loadProject } from "@/lib/storage";
import { applyThemeToRoot, themeToCssVars } from "@/lib/theme";
import { CookieBanner } from "@/components/CookieBanner";
import type { SiteProject, Page } from "@/types";

export default function PreviewPage() {
  const [project, setProject] = useState<SiteProject | null>(null);
  const [activePage, setActivePage] = useState<Page | null>(null);
  const [showNav, setShowNav] = useState(true);
  const [animatedConfig] = useState(() => createAnimatedConfig());

  useEffect(() => {
    const p = loadProject();
    if (p) {
      setProject(p);
      const page = p.pages.find((pg) => pg.id === p.activePageId) || p.pages[0];
      setActivePage(page);
      applyThemeToRoot(p.theme);
    }
  }, []);

  if (!project || !activePage) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-xl font-semibold text-zinc-700 mb-2">Keine Inhalte</h2>
          <p className="text-zinc-500 mb-6">Erstellen Sie zuerst eine Seite im Editor.</p>
          <Link
            href="/editor"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            Zum Editor →
          </Link>
        </div>
      </div>
    );
  }

  const themeVars = themeToCssVars(project.theme);

  return (
    <div style={themeVars as React.CSSProperties}>
      {/* Preview Navigation Bar */}
      {showNav && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-zinc-900/95 backdrop-blur-sm px-4 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="flex items-center gap-1.5 rounded-md bg-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-600 transition-colors"
            >
              ← Editor
            </Link>
            <span className="text-xs text-zinc-500">Vorschau</span>
            <span className="text-xs font-medium text-zinc-300">{project.name}</span>
          </div>

          {/* Page Navigation */}
          {project.pages.length > 1 && (
            <nav className="flex items-center gap-1">
              {project.pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePage(page)}
                  className={`rounded-md px-3 py-1.5 text-xs transition-colors ${
                    activePage.id === page.id
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </nav>
          )}

          <button
            onClick={() => setShowNav(false)}
            className="rounded-md p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-xs"
            title="Vorschau-Leiste ausblenden"
          >
            ✕
          </button>
        </div>
      )}

      {/* Show nav toggle when hidden */}
      {!showNav && (
        <button
          onClick={() => setShowNav(true)}
          className="fixed top-4 right-4 z-50 rounded-full bg-zinc-900/80 backdrop-blur-sm px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors border border-white/10"
        >
          Editor-Leiste anzeigen
        </button>
      )}

      {/* Content */}
      <div
        className="preview-root"
        onClick={(e) => {
          // Intercept internal page links
          const target = (e.target as HTMLElement).closest("a");
          if (!target) return;
          const href = target.getAttribute("href");
          if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return;
          // Find matching page by slug
          const matchedPage = project.pages.find(
            (p) => p.slug === href || p.slug === "/" + href.replace(/^\//, "")
          );
          if (matchedPage) {
            e.preventDefault();
            setActivePage(matchedPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        style={{
          paddingTop: showNav ? "48px" : "0",
          backgroundColor: project.theme.backgroundColor,
          color: project.theme.textColor,
          fontFamily: project.theme.fontFamily,
        }}
      >
        <Render
          config={animatedConfig}
          data={activePage.data as Parameters<typeof Render>[0]["data"]}
        />
      </div>

      <CookieBanner />
    </div>
  );
}
