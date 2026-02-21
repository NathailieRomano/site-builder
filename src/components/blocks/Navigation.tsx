"use client";

import React, { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  logo: string;
  links: NavLink[];
  bgColor: string;
  textColor: string;
  sticky: boolean;
  style: "minimal" | "centered" | "split";
}

export function Navigation({ logo, links, bgColor, textColor, sticky, style = "minimal" }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={`w-full z-50 ${sticky ? "sticky top-0" : "relative"}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className={`flex items-center ${style === "centered" ? "flex-col gap-4" : "justify-between"}`}>
          {/* Logo */}
          <div className="flex items-center gap-3">
            {logo.startsWith("http") || logo.startsWith("data:") ? (
              <img src={logo} alt="Logo" className="h-8 object-contain" />
            ) : (
              <span className="text-lg font-bold" style={{ fontFamily: "var(--theme-heading-font)" }}>
                {logo || "Ihr Logo"}
              </span>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: textColor }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl"
            style={{ color: textColor }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden flex flex-col gap-3 pt-4 pb-2 border-t border-white/10 mt-4">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm font-medium py-2"
                style={{ color: textColor }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export const NavigationConfig = {
  label: "Navigation",
  fields: {
    logo: { type: "text" as const, label: "Logo (Text oder Bild-URL)" },
    links: {
      type: "array" as const,
      label: "Links",
      arrayFields: {
        label: { type: "text" as const, label: "Text" },
        href: { type: "text" as const, label: "Link" },
      },
    },
    bgColor: { type: "text" as const, label: "Hintergrundfarbe" },
    textColor: { type: "text" as const, label: "Textfarbe" },
    sticky: {
      type: "radio" as const,
      label: "Fixiert",
      options: [
        { value: true, label: "Ja (sticky)" },
        { value: false, label: "Nein" },
      ],
    },
    style: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "minimal", label: "Minimal" },
        { value: "centered", label: "Zentriert" },
      ],
    },
  },
  defaultProps: {
    logo: "Ihr Unternehmen",
    links: [
      { label: "Home", href: "#" },
      { label: "Über uns", href: "#about" },
      { label: "Leistungen", href: "#services" },
      { label: "Kontakt", href: "#contact" },
    ],
    bgColor: "#ffffff",
    textColor: "#0f172a",
    sticky: true,
    style: "minimal" as const,
  },
  render: Navigation,
};
