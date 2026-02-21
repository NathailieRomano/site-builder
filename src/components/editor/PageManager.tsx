"use client";

import React, { useState } from "react";
import type { Page, SiteProject } from "@/types";

interface PageManagerProps {
  project: SiteProject;
  onSelectPage: (pageId: string) => void;
  onAddPage: (name: string, slug: string) => void;
  onRemovePage: (pageId: string) => void;
  onRenamePage: (pageId: string, name: string) => void;
}

export function PageManager({
  project,
  onSelectPage,
  onAddPage,
  onRemovePage,
  onRenamePage,
}: PageManagerProps) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  function handleAdd() {
    if (!newName.trim()) return;
    const slug = newSlug.trim() || "/" + newName.toLowerCase().replace(/\s+/g, "-");
    onAddPage(newName.trim(), slug);
    setNewName("");
    setNewSlug("");
    setAdding(false);
  }

  function startEdit(page: Page) {
    setEditingId(page.id);
    setEditName(page.name);
  }

  function confirmEdit(pageId: string) {
    if (editName.trim()) {
      onRenamePage(pageId, editName.trim());
    }
    setEditingId(null);
  }

  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
        Seiten
      </div>

      {project.pages.map((page) => (
        <div
          key={page.id}
          className={`group flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
            project.activePageId === page.id
              ? "bg-indigo-500/20 text-indigo-300"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          }`}
          onClick={() => onSelectPage(page.id)}
        >
          <span className="text-xs">📄</span>
          {editingId === page.id ? (
            <input
              autoFocus
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={() => confirmEdit(page.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmEdit(page.id);
                if (e.key === "Escape") setEditingId(null);
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-transparent border-b border-indigo-500 text-xs text-zinc-200 focus:outline-none"
            />
          ) : (
            <span className="flex-1 text-xs truncate">{page.name}</span>
          )}

          <div className="hidden group-hover:flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); startEdit(page); }}
              className="rounded p-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Umbenennen"
            >
              ✏️
            </button>
            {project.pages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemovePage(page.id); }}
                className="rounded p-0.5 text-zinc-500 hover:text-red-400 transition-colors"
                title="Löschen"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      ))}

      {adding ? (
        <div className="mt-3 space-y-2">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Seitenname"
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
              if (e.key === "Escape") setAdding(false);
            }}
          />
          <input
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
            placeholder="URL-Pfad (z.B. /ueber-uns)"
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 rounded-lg bg-indigo-600 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
            >
              Hinzufügen
            </button>
            <button
              onClick={() => setAdding(false)}
              className="flex-1 rounded-lg bg-zinc-800 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-2 w-full flex items-center gap-2 rounded-lg border border-dashed border-zinc-700 px-3 py-2.5 text-xs text-zinc-500 hover:border-zinc-500 hover:text-zinc-400 transition-colors"
        >
          <span>+</span>
          <span>Neue Seite</span>
        </button>
      )}
    </div>
  );
}
