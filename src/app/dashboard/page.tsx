"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  listProjects,
  saveCloudProject,
  deleteCloudProject,
  cloudToLocal,
  type CloudProject,
} from "@/lib/cloud-storage";
import { saveProject } from "@/lib/storage";
import { templates } from "@/lib/templates";
import { applyTemplate } from "@/lib/templates";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<CloudProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      window.location.href = "/auth";
      return;
    }
    setUser(data.user);
    await loadProjects();
  }

  async function loadProjects() {
    try {
      const data = await listProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }

  async function createNewProject(templateId?: string) {
    if (!user) return;
    setCreating(true);
    try {
      const templateObj = templateId ? templates.find((t) => t.id === templateId) : null;
      const local = templateObj
        ? (() => {
            const { theme, pages } = applyTemplate(templateObj);
            return {
              id: crypto.randomUUID(),
              name: templateObj.name,
              theme,
              pages: pages.map((p) => ({ ...p, id: crypto.randomUUID() })),
              activePageId: pages[0]?.id || crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
          })()
        : (() => {
            const pageId = crypto.randomUUID();
            return {
              id: crypto.randomUUID(),
              name: "Neue Website",
              theme: templates[0].theme,
              pages: [
                {
                  id: pageId,
                  name: "Startseite",
                  slug: "/",
                  data: { content: [], root: { props: {} } },
                },
              ],
              activePageId: pageId,

              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
          })();

      // Save to cloud
      const cloud = await saveCloudProject(local, undefined);

      // Save to localStorage for editor (using cloud ID)
      const localProject = cloudToLocal(cloud);
      saveProject(localProject);

      // Navigate to editor
      window.location.href = `/editor?project=${cloud.id}`;
    } catch (err) {
      console.error("Failed to create project:", err);
      alert("Fehler beim Erstellen des Projekts");
    } finally {
      setCreating(false);
    }
  }

  async function openProject(cloud: CloudProject) {
    // Load into localStorage and open editor
    const local = cloudToLocal(cloud);
    saveProject(local);
    window.location.href = `/editor?project=${cloud.id}`;
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`)) return;
    try {
      await deleteCloudProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Fehler beim Löschen");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a12] flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Laden...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <span>🏗️</span> Site Builder
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/5 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Meine Websites</h1>
            <p className="text-sm text-zinc-500 mt-1">{projects.length} Projekt{projects.length !== 1 ? "e" : ""}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 transition-colors"
            >
              📋 Mit Template
            </button>
            <button
              onClick={() => createNewProject()}
              disabled={creating}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
              {creating ? "Erstelle..." : "+ Neues Projekt"}
            </button>
          </div>
        </div>

        {/* Template Picker */}
        {showTemplates && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-[#12121a] p-6">
            <h2 className="text-sm font-semibold text-zinc-400 mb-4">Template wählen</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setShowTemplates(false);
                    createNewProject(t.id);
                  }}
                  className="rounded-xl border border-white/10 p-4 text-left hover:bg-white/5 hover:border-indigo-500/30 transition-all group"
                >
                  <div className="text-3xl mb-2">{t.thumbnail}</div>
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white">{t.name}</p>
                  <p className="text-xs text-zinc-600 mt-0.5 line-clamp-2">{t.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">
            <div className="text-5xl mb-4">🏗️</div>
            <h2 className="text-lg font-semibold mb-2">Noch keine Projekte</h2>
            <p className="text-sm text-zinc-500 mb-6">Erstelle dein erstes Projekt und bau deine Website!</p>
            <button
              onClick={() => createNewProject()}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium hover:bg-indigo-500 transition-colors"
            >
              + Erstes Projekt erstellen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl border border-white/10 bg-[#12121a] overflow-hidden hover:border-indigo-500/30 transition-all group"
              >
                {/* Preview placeholder */}
                <div
                  className="h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center cursor-pointer"
                  onClick={() => openProject(project)}
                >
                  <span className="text-4xl opacity-30 group-hover:opacity-60 transition-opacity">🌐</span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="cursor-pointer" onClick={() => openProject(project)}>
                      <h3 className="font-semibold text-sm group-hover:text-indigo-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {new Date(project.updated_at).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(project.id, project.name)}
                      className="rounded p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs"
                      title="Löschen"
                    >
                      🗑
                    </button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openProject(project)}
                      className="flex-1 rounded-lg bg-white/5 py-1.5 text-xs font-medium text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      ✏️ Bearbeiten
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
