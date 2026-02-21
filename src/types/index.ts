// ─── Theme ────────────────────────────────────────────────────────────────────

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  headingFont: string;
  borderRadius: string;
  spacing: string;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export interface PageSeo {
  title: string;
  description: string;
  ogImage: string;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  data: Record<string, unknown>;
  seo?: PageSeo;
}

// ─── Project ──────────────────────────────────────────────────────────────────

export interface SiteProject {
  id: string;
  name: string;
  theme: Theme;
  pages: Page[];
  activePageId: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export interface Template {
  id: string;
  name: string;
  description: string;
  category: "restaurant" | "handwerker" | "portfolio";
  thumbnail: string;
  theme: Theme;
  pages: Omit<Page, "id">[];
}
