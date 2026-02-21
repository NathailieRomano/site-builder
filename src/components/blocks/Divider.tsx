"use client";

import React from "react";

interface DividerProps {
  id?: string;
  style: "solid" | "dashed" | "dotted" | "gradient";
  color: string;
  width: "narrow" | "medium" | "wide" | "full";
  thickness: number;
}

const widthMap = {
  narrow: "max-w-xs",
  medium: "max-w-md",
  wide: "max-w-3xl",
  full: "max-w-full",
};

export function Divider({
  style = "solid",
  color,
  width = "wide",
  thickness = 1,
}: DividerProps) {
  const resolvedColor = color || "var(--theme-primary)";

  return (
    <div className="py-4 px-6">
      <div className={`mx-auto ${widthMap[width]}`}>
        {style === "gradient" ? (
          <div
            className="h-px"
            style={{
              height: `${thickness}px`,
              background: `linear-gradient(to right, transparent, ${resolvedColor}, transparent)`,
            }}
          />
        ) : (
          <hr
            style={{
              borderStyle: style,
              borderColor: resolvedColor,
              borderTopWidth: `${thickness}px`,
              borderBottom: "none",
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}

export const DividerConfig = {
  label: "Trennlinie",
  fields: {
    style: {
      type: "radio" as const,
      label: "Stil",
      options: [
        { value: "solid", label: "Durchgezogen" },
        { value: "dashed", label: "Gestrichelt" },
        { value: "dotted", label: "Gepunktet" },
        { value: "gradient", label: "Gradient" },
      ],
    },
    color: {
      type: "text" as const,
      label: "Farbe (hex/css)",
    },
    width: {
      type: "radio" as const,
      label: "Breite",
      options: [
        { value: "narrow", label: "Schmal" },
        { value: "medium", label: "Mittel" },
        { value: "wide", label: "Breit" },
        { value: "full", label: "Voll" },
      ],
    },
    thickness: {
      type: "number" as const,
      label: "Dicke (px)",
      min: 1,
      max: 8,
    },
  },
  defaultProps: {
    style: "solid" as const,
    color: "#e2e8f0",
    width: "wide" as const,
    thickness: 1,
  },
  render: Divider,
};
