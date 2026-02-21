"use client";

import React, { useRef } from "react";

interface ImageFieldProps {
  value: string;
  onChange: (val: string) => void;
  field: { label?: string };
}

export function ImageField({ value, onChange, field }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Maximal 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{field.label || "Bild"}</label>

      {value && (value.startsWith("http") || value.startsWith("data:")) ? (
        <div className="relative group mb-2">
          <img src={value} alt="Preview" className="w-full rounded border border-gray-200" style={{ maxHeight: 120, objectFit: "cover" }} />
          <button
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      ) : null}

      <div className="flex gap-2">
        <input
          type="text"
          value={value?.startsWith("data:") ? "" : value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL oder Bild hochladen →"
          className="flex-1 border rounded px-2 py-1.5 text-sm"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-3 py-1.5 bg-gray-100 rounded text-sm hover:bg-gray-200 transition-colors"
        >
          📷
        </button>
      </div>

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
    </div>
  );
}
