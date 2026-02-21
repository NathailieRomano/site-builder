"use client";

import React from "react";

interface SpacerProps {
  id?: string;
  height: number;
}

export function Spacer({ height = 64 }: SpacerProps) {
  return <div style={{ height: `${height}px` }} aria-hidden="true" />;
}

export const SpacerConfig = {
  label: "Abstand",
  fields: {
    height: {
      type: "number" as const,
      label: "Höhe (px)",
      min: 8,
      max: 400,
    },
  },
  defaultProps: {
    height: 64,
  },
  render: Spacer,
};
