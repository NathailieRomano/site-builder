"use client";

import React, { useState, useRef } from "react";

interface HtmlAppEditorProps {
  htmlContent: string;
  onChange: (html: string) => void;
  onSave: () => void;
}

export function HtmlAppEditor({ htmlContent, onChange, onSave }: HtmlAppEditorProps) {
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".html") && !file.name.endsWith(".htm")) {
      alert("Bitte eine HTML-Datei auswählen (.html oder .htm)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      if (content) onChange(content);
    };
    reader.readAsText(file);
    // Reset input so same file can be re-uploaded
    e.target.value = "";
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#111118] border-b border-white/5">
        <span className="text-xs text-zinc-500 mr-auto">🖥️ HTML-App Editor</span>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
        >
          📁 HTML-Datei laden
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".html,.htm"
          className="hidden"
          onChange={handleFileUpload}
        />

        <button
          onClick={() => setPreviewMode(!previewMode)}
          className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
            previewMode
              ? "border-indigo-500 bg-indigo-500/10 text-indigo-300"
              : "border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500"
          }`}
        >
          {previewMode ? "✏️ Code" : "👁 Vorschau"}
        </button>

        <button
          onClick={onSave}
          className="rounded-md bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          💾 Speichern
        </button>
      </div>

      {/* Content Area */}
      {previewMode ? (
        <iframe
          srcDoc={htmlContent}
          className="flex-1 w-full bg-white"
          sandbox="allow-scripts allow-same-origin"
          title="HTML-App Vorschau"
        />
      ) : (
        <textarea
          value={htmlContent}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 w-full bg-[#0d0d12] text-zinc-300 font-mono text-sm p-4 resize-none focus:outline-none border-none"
          placeholder="HTML-Code hier einfügen oder Datei laden..."
          spellCheck={false}
          autoCorrect="off"
        />
      )}
    </div>
  );
}
