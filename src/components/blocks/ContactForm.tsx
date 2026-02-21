"use client";

import React, { useState } from "react";

interface ContactFormProps {
  id?: string;
  heading: string;
  subheading?: string;
  buttonText: string;
  showPhone?: boolean;
  bgColor?: string;
}

export function ContactForm({
  heading,
  subheading,
  buttonText = "Absenden",
  showPhone = false,
  bgColor = "transparent",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Fehler beim Senden");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Senden. Bitte versuchen Sie es erneut.");
    } finally {
      setSending(false);
    }
  }

  const inputStyles: React.CSSProperties = {
    borderColor: "var(--theme-primary)",
    color: "var(--theme-text)",
    borderRadius: "var(--theme-radius)",
  };

  return (
    <section
      id="contact"
      className="py-20 px-6"
      style={{ backgroundColor: bgColor === "transparent" ? undefined : bgColor }}
    >
      <div className="max-w-2xl mx-auto">
        {heading && (
          <h2
            className="text-3xl font-bold mb-4 text-center"
            style={{
              fontFamily: "var(--theme-heading-font)",
              color: "var(--theme-text)",
            }}
          >
            {heading}
          </h2>
        )}
        {subheading && (
          <p
            className="text-center mb-10 opacity-70 leading-relaxed"
            style={{ color: "var(--theme-text)" }}
          >
            {subheading}
          </p>
        )}

        {submitted ? (
          <div
            className="rounded-xl p-8 text-center"
            style={{
              backgroundColor: "var(--theme-primary)",
              color: "#fff",
              borderRadius: "var(--theme-radius)",
            }}
          >
            <div className="text-4xl mb-3">✓</div>
            <h3 className="text-xl font-semibold mb-2">Vielen Dank!</h3>
            <p className="opacity-90">Ihre Nachricht wurde gesendet. Wir melden uns bald.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text)" }}
              >
                Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ihr Name"
                className="w-full border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-shadow bg-white dark:bg-zinc-800"
                style={inputStyles}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text)" }}
              >
                E-Mail *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ihre@email.de"
                className="w-full border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-shadow bg-white dark:bg-zinc-800"
                style={inputStyles}
              />
            </div>

            {showPhone && (
              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--theme-text)" }}
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+49 123 456789"
                  className="w-full border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-shadow bg-white dark:bg-zinc-800"
                  style={inputStyles}
                />
              </div>
            )}

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--theme-text)" }}
              >
                Nachricht *
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Wie können wir Ihnen helfen?"
                className="w-full border px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-shadow bg-white dark:bg-zinc-800 resize-none"
                style={inputStyles}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.01] focus:outline-none focus:ring-4 disabled:opacity-50"
              style={{
                backgroundColor: "var(--theme-primary)",
                borderRadius: "var(--theme-radius)",
              }}
            >
              {sending ? "Wird gesendet..." : buttonText}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export const ContactFormConfig = {
  label: "Kontaktformular",
  fields: {
    heading: {
      type: "text" as const,
      label: "Überschrift",
    },
    subheading: {
      type: "textarea" as const,
      label: "Untertext",
    },
    buttonText: {
      type: "text" as const,
      label: "Button Text",
    },
    showPhone: {
      type: "radio" as const,
      label: "Telefon-Feld anzeigen",
      options: [
        { value: true, label: "Ja" },
        { value: false, label: "Nein" },
      ],
    },
  },
  defaultProps: {
    heading: "Schreiben Sie uns",
    subheading: "Wir antworten innerhalb von 24 Stunden.",
    buttonText: "Nachricht senden",
    showPhone: false,
  },
  render: ContactForm,
};
