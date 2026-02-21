import { puckConfig } from "./puck-config";
import type { Config } from "@puckeditor/core";
import React from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

// Blocks that should NOT be animated (structural elements)
const noAnimateBlocks = new Set(["Navigation", "Footer", "Spacer", "Divider"]);

/**
 * Creates an animated version of puckConfig where each block render
 * is wrapped in ScrollReveal for the preview page.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAnimatedConfig(): Config<any> {
  const animatedComponents: Record<string, unknown> = {};

  for (const [name, component] of Object.entries(puckConfig.components)) {
    if (noAnimateBlocks.has(name)) {
      animatedComponents[name] = component;
      continue;
    }

    const comp = component as { render: React.FC<Record<string, unknown>> };
    const OriginalRender = comp.render;

    animatedComponents[name] = {
      ...component,
      render: function AnimatedBlock(props: Record<string, unknown>) {
        return React.createElement(
          ScrollReveal,
          { animation: "fade-up" as const, duration: 600 },
          React.createElement(OriginalRender, props)
        );
      },
    };
  }

  return {
    ...puckConfig,
    components: animatedComponents,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as Config<any>;
}
