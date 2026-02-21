"use client";

import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  companyName: string;
  tagline: string;
  links: FooterLink[];
  bgColor: string;
  textColor: string;
  showCopyright: boolean;
}

export function Footer({ companyName, tagline, links, bgColor, textColor, showCopyright }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor }} className="py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-lg font-bold" style={{ fontFamily: "var(--theme-heading-font)" }}>
              {companyName}
            </p>
            {tagline && <p className="text-sm mt-1 opacity-60">{tagline}</p>}
          </div>
          {links.length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-sm transition-opacity hover:opacity-70"
                  style={{ color: textColor }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
        {showCopyright && (
          <div className="mt-8 pt-6 border-t text-xs opacity-50" style={{ borderColor: `${textColor}20` }}>
            © {year} {companyName}. Alle Rechte vorbehalten.
          </div>
        )}
      </div>
    </footer>
  );
}

export const FooterConfig = {
  label: "Footer",
  fields: {
    companyName: { type: "text" as const, label: "Firmenname" },
    tagline: { type: "text" as const, label: "Slogan" },
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
    showCopyright: {
      type: "radio" as const,
      label: "Copyright anzeigen",
      options: [
        { value: true, label: "Ja" },
        { value: false, label: "Nein" },
      ],
    },
  },
  defaultProps: {
    companyName: "Ihr Unternehmen",
    tagline: "Professionelle Dienstleistungen für Sie.",
    links: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
      { label: "AGB", href: "#" },
    ],
    bgColor: "#0f172a",
    textColor: "#e2e8f0",
    showCopyright: true,
  },
  render: Footer,
};
