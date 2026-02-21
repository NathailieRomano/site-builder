"use client";

import React, { useState } from "react";

interface FormField {
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "number" | "date";
  placeholder: string;
  required: boolean;
  options: string; // comma-separated for select
}

interface FormBuilderProps {
  heading: string;
  subtitle: string;
  fields: FormField[];
  buttonText: string;
  successMessage: string;
  bgColor: string;
}

export function FormBuilder({ heading, subtitle, fields, buttonText, successMessage, bgColor }: FormBuilderProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((v, k) => { data[k] = v.toString(); });

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data["Name"] || "Formular", email: data["E-Mail"] || data["Email"] || "keine", message: JSON.stringify(data, null, 2) }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Show success anyway for UX
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-16 px-6" style={{ backgroundColor: bgColor || "transparent" }}>
        <div className="mx-auto max-w-lg text-center">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-lg font-semibold">{successMessage || "Vielen Dank! Wir melden uns."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6" style={{ backgroundColor: bgColor || "transparent" }}>
      <div className="mx-auto max-w-lg">
        {heading && (
          <h2 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: "var(--theme-heading-font)" }}>
            {heading}
          </h2>
        )}
        {subtitle && <p className="text-center opacity-70 mb-8">{subtitle}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-0.5">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] resize-vertical"
                  style={{ borderRadius: "var(--theme-radius)" }}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.label}
                  required={field.required}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
                  style={{ borderRadius: "var(--theme-radius)" }}
                >
                  <option value="">{field.placeholder || "Bitte wählen..."}</option>
                  {field.options.split(",").map((opt, j) => (
                    <option key={j} value={opt.trim()}>{opt.trim()}</option>
                  ))}
                </select>
              ) : field.type === "checkbox" ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name={field.label} required={field.required} className="w-4 h-4 rounded" />
                  <span className="text-sm">{field.placeholder || field.label}</span>
                </label>
              ) : (
                <input
                  type={field.type}
                  name={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]"
                  style={{ borderRadius: "var(--theme-radius)" }}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--theme-primary)", borderRadius: "var(--theme-radius)" }}
          >
            {sending ? "Wird gesendet..." : buttonText || "Absenden"}
          </button>
        </form>
      </div>
    </section>
  );
}

export const FormBuilderConfig = {
  label: "Formular (Custom)",
  fields: {
    heading: { type: "text" as const, label: "Überschrift" },
    subtitle: { type: "text" as const, label: "Untertitel" },
    fields: {
      type: "array" as const,
      label: "Felder",
      arrayFields: {
        label: { type: "text" as const, label: "Feldname" },
        type: {
          type: "select" as const,
          label: "Typ",
          options: [
            { value: "text", label: "Text" },
            { value: "email", label: "E-Mail" },
            { value: "tel", label: "Telefon" },
            { value: "number", label: "Zahl" },
            { value: "date", label: "Datum" },
            { value: "textarea", label: "Textfeld (mehrzeilig)" },
            { value: "select", label: "Auswahl (Dropdown)" },
            { value: "checkbox", label: "Checkbox" },
          ],
        },
        placeholder: { type: "text" as const, label: "Platzhalter" },
        required: {
          type: "radio" as const,
          label: "Pflichtfeld",
          options: [
            { value: true, label: "Ja" },
            { value: false, label: "Nein" },
          ],
        },
        options: { type: "text" as const, label: "Optionen (kommagetrennt, nur für Dropdown)" },
      },
    },
    buttonText: { type: "text" as const, label: "Button-Text" },
    successMessage: { type: "text" as const, label: "Erfolgsmeldung" },
    bgColor: { type: "text" as const, label: "Hintergrundfarbe" },
  },
  defaultProps: {
    heading: "Kontaktformular",
    subtitle: "Füllen Sie das Formular aus und wir melden uns bei Ihnen.",
    fields: [
      { label: "Name", type: "text" as const, placeholder: "Ihr Name", required: true, options: "" },
      { label: "E-Mail", type: "email" as const, placeholder: "name@beispiel.ch", required: true, options: "" },
      { label: "Telefon", type: "tel" as const, placeholder: "+41 79 123 45 67", required: false, options: "" },
      { label: "Betreff", type: "select" as const, placeholder: "Bitte wählen...", required: true, options: "Allgemeine Anfrage, Offerte, Reklamation, Sonstiges" },
      { label: "Nachricht", type: "textarea" as const, placeholder: "Ihre Nachricht...", required: true, options: "" },
      { label: "Datenschutz akzeptiert", type: "checkbox" as const, placeholder: "Ich akzeptiere die Datenschutzerklärung", required: true, options: "" },
    ],
    buttonText: "Absenden",
    successMessage: "Vielen Dank! Wir melden uns so schnell wie möglich.",
    bgColor: "",
  },
  render: FormBuilder,
};
