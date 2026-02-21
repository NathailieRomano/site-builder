import { Theme } from "@/types";

export const defaultTheme: Theme = {
  primaryColor: "#6366f1",
  secondaryColor: "#ec4899",
  accentColor: "#f59e0b",
  backgroundColor: "#ffffff",
  textColor: "#0f172a",
  fontFamily: "'Inter', system-ui, sans-serif",
  headingFont: "'Inter', system-ui, sans-serif",
  borderRadius: "0.5rem",
  spacing: "1rem",
};

export const themePresets: Record<string, Theme> = {
  default: defaultTheme,
  restaurant: {
    primaryColor: "#b45309",
    secondaryColor: "#d97706",
    accentColor: "#fbbf24",
    backgroundColor: "#fffbf5",
    textColor: "#1c1917",
    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
    headingFont: "'Playfair Display', Georgia, serif",
    borderRadius: "0.25rem",
    spacing: "1rem",
  },
  handwerker: {
    primaryColor: "#1e40af",
    secondaryColor: "#3b82f6",
    accentColor: "#f59e0b",
    backgroundColor: "#f8fafc",
    textColor: "#0f172a",
    fontFamily: "'Roboto', system-ui, sans-serif",
    headingFont: "'Roboto Slab', Georgia, serif",
    borderRadius: "0.375rem",
    spacing: "1rem",
  },
  portfolio: {
    primaryColor: "#7c3aed",
    secondaryColor: "#a78bfa",
    accentColor: "#34d399",
    backgroundColor: "#0f0f1a",
    textColor: "#f1f5f9",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    headingFont: "'DM Sans', system-ui, sans-serif",
    borderRadius: "0.75rem",
    spacing: "1.25rem",
  },
};

export function themeToCssVars(theme: Theme): Record<string, string> {
  return {
    "--theme-primary": theme.primaryColor,
    "--theme-secondary": theme.secondaryColor,
    "--theme-accent": theme.accentColor,
    "--theme-bg": theme.backgroundColor,
    "--theme-text": theme.textColor,
    "--theme-font": theme.fontFamily,
    "--theme-heading-font": theme.headingFont,
    "--theme-radius": theme.borderRadius,
    "--theme-spacing": theme.spacing,
  };
}

export function applyThemeToRoot(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const vars = themeToCssVars(theme);
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
