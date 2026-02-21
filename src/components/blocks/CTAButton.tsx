"use client";

import React from "react";

interface CTAButtonProps {
  id?: string;
  text: string;
  link: string;
  variant: "primary" | "secondary" | "outline" | "ghost";
  size: "small" | "medium" | "large";
  align: "left" | "center" | "right";
  newTab: boolean;
}

const sizeMap = {
  small: "px-5 py-2.5 text-sm",
  medium: "px-7 py-3.5 text-base",
  large: "px-10 py-4 text-lg",
};

const alignMap = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export function CTAButton({
  text,
  link,
  variant = "primary",
  size = "medium",
  align = "center",
  newTab = false,
}: CTAButtonProps) {
  const baseStyles = `inline-block font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 ${sizeMap[size]}`;
  const radius = `rounded-[var(--theme-radius)]`;

  const variantStyles: Record<string, string> = {
    primary: `${baseStyles} ${radius} text-white shadow-md hover:shadow-lg`,
    secondary: `${baseStyles} ${radius} shadow-sm hover:shadow-md`,
    outline: `${baseStyles} ${radius} border-2`,
    ghost: `${baseStyles} underline underline-offset-4`,
  };

  const variantInlineStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--theme-primary)",
      color: "#ffffff",
    },
    secondary: {
      backgroundColor: "var(--theme-secondary)",
      color: "#ffffff",
    },
    outline: {
      borderColor: "var(--theme-primary)",
      color: "var(--theme-primary)",
      backgroundColor: "transparent",
    },
    ghost: {
      color: "var(--theme-primary)",
      backgroundColor: "transparent",
    },
  };

  return (
    <section className="py-8 px-6">
      <div className={`flex ${alignMap[align]}`}>
        <a
          href={link || "#"}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className={variantStyles[variant]}
          style={variantInlineStyles[variant]}
        >
          {text}
        </a>
      </div>
    </section>
  );
}

export const CTAButtonConfig = {
  label: "CTA Button",
  fields: {
    text: {
      type: "text" as const,
      label: "Button Text",
    },
    link: {
      type: "text" as const,
      label: "Link / URL",
    },
    variant: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
        { value: "outline", label: "Outline" },
        { value: "ghost", label: "Ghost" },
      ],
    },
    size: {
      type: "radio" as const,
      label: "Größe",
      options: [
        { value: "small", label: "Klein" },
        { value: "medium", label: "Mittel" },
        { value: "large", label: "Groß" },
      ],
    },
    align: {
      type: "radio" as const,
      label: "Ausrichtung",
      options: [
        { value: "left", label: "Links" },
        { value: "center", label: "Zentriert" },
        { value: "right", label: "Rechts" },
      ],
    },
    newTab: {
      type: "radio" as const,
      label: "In neuem Tab öffnen",
      options: [
        { value: true, label: "Ja" },
        { value: false, label: "Nein" },
      ],
    },
  },
  defaultProps: {
    text: "Jetzt starten",
    link: "#",
    variant: "primary" as const,
    size: "medium" as const,
    align: "center" as const,
    newTab: false,
  },
  render: CTAButton,
};
