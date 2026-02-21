"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { getOrCreateProject, saveProject } from "@/lib/storage";
import { applyTemplate } from "@/lib/templates";
import { supabase } from "@/lib/supabase";
import type { SiteProject } from "@/types";
import { generateId } from "@/lib/storage";

export default function HomePage() {
  const [project, setProject] = useState<SiteProject | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setProject(getOrCreateProject());
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  function handleApplyTemplate(templateId: string) {
    const template = templates.find((t) => t.id === templateId);
    if (!template || !project) return;

    const { theme, pages } = applyTemplate(template);
    const newProject: SiteProject = {
      ...project,
      name: template.name,
      theme,
      pages: pages.map((p) => ({ ...p, id: generateId() })),
      activePageId: pages[0]?.id || project.activePageId,
      updatedAt: new Date().toISOString(),
    };
    // Fix activePageId
    newProject.activePageId = newProject.pages[0].id;
    saveProject(newProject);
    setProject(newProject);
    setShowTemplates(false);
  }

  function handleNewProject() {
    const homeId = generateId();
    const newProject: SiteProject = {
      id: generateId(),
      name: "Neue Website",
      theme: {
        primaryColor: "#6366f1",
        secondaryColor: "#ec4899",
        accentColor: "#f59e0b",
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        fontFamily: "'Inter', system-ui, sans-serif",
        headingFont: "'Inter', system-ui, sans-serif",
        borderRadius: "0.5rem",
        spacing: "1rem",
      },
      pages: [
        {
          id: homeId,
          name: "Startseite",
          slug: "/",
          data: { content: [], root: { props: {} } },
        },
      ],
      activePageId: homeId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProject(newProject);
    setProject(newProject);
  }

  const lastUpdated = project
    ? new Date(project.updatedAt).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Nav */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-white">Site Builder</span>
          </div>
          <nav className="flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 transition-colors"
              >
                Anmelden
              </Link>
            )}
            <Link
              href={isLoggedIn ? "/dashboard" : "/editor"}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              {isLoggedIn ? "Meine Projekte" : "Editor öffnen"} →
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-400">
            ✦ Phase 1 MVP — Drag & Drop Editor
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Websites erstellen,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ohne Code.
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Professionelle Websites per Drag & Drop. Perfekt für Restaurants,
            Handwerker, Portfolios — fertig in Minuten.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/editor"
              className="rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white hover:bg-indigo-500 transition-all duration-200 hover:scale-105 shadow-lg shadow-indigo-500/20"
            >
              Editor öffnen →
            </Link>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              Template auswählen
            </button>
          </div>
        </div>
      </section>

      {/* Current Project Status */}
      {project && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Aktuelles Projekt</p>
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p className="text-sm text-zinc-500 mt-1">
                    {project.pages.length} Seite{project.pages.length !== 1 ? "n" : ""} • Zuletzt geändert: {lastUpdated}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/preview"
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5 transition-colors"
                  >
                    Vorschau
                  </Link>
                  <Link
                    href="/editor"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                  >
                    Weiter bearbeiten →
                  </Link>
                </div>
              </div>

              {/* Pages List */}
              <div className="mt-5 flex gap-2 flex-wrap">
                {project.pages.map((page) => (
                  <span
                    key={page.id}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400"
                  >
                    {page.name} ({page.slug})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Templates */}
      {showTemplates && (
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-2">Starter-Templates</h2>
            <p className="text-zinc-500 mb-8">
              Wählen Sie ein Template als Startpunkt. Ihr aktuelles Projekt wird ersetzt.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleApplyTemplate(template.id)}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-4xl mb-4">{template.thumbnail}</div>
                  <h3 className="font-semibold text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{template.description}</p>
                  <div className="mt-4 text-xs text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Template anwenden →
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNewProject}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4"
              >
                Stattdessen mit leerem Projekt starten
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "8 Block-Typen", desc: "Hero, Text, Galerie, CTA, Kontaktformular und mehr" },
              { icon: "🎨", title: "Theme-System", desc: "Farben, Fonts und Abstände zentral anpassen" },
              { icon: "📄", title: "Multi-Page", desc: "Mehrere Seiten erstellen und verwalten" },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
