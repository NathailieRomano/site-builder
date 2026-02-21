"use client";

import React, { useRef, useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export function ImageUploadField({ value, onChange, label }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Bild darf maximal 5 MB gross sein.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="space-y-2">
      {label && <label className="block text-xs text-zinc-400">{label}</label>}
      
      {value ? (
        <div className="relative group">
          <img src={value} alt="Vorschau" className="w-full rounded-lg border border-zinc-700" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="rounded bg-zinc-700 px-3 py-1.5 text-xs text-white hover:bg-zinc-600"
            >
              Ändern
            </button>
            <button
              onClick={() => onChange("")}
              className="rounded bg-red-600/80 px-3 py-1.5 text-xs text-white hover:bg-red-500"
            >
              Entfernen
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            dragging
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-zinc-700 hover:border-zinc-500"
          }`}
        >
          <div className="text-2xl mb-2">📷</div>
          <p className="text-xs text-zinc-400">Klicken oder hierher ziehen</p>
          <p className="text-xs text-zinc-600 mt-1">Max. 5 MB · JPG, PNG, WebP</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* Fallback URL input */}
      <input
        type="text"
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Oder Bild-URL eingeben..."
        className="w-full rounded bg-zinc-800 border border-zinc-700 px-2 py-1.5 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500"
      />
    </div>
  );
}
