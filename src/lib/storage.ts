import { SiteProject, Theme, Page } from "@/types";
import { defaultTheme } from "./theme";

const STORAGE_KEY = "site-builder-project";

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function createDefaultProject(): SiteProject {
  const homePageId = generateId();
  return {
    id: generateId(),
    name: "Meine Website",
    theme: defaultTheme,
    pages: [
      {
        id: homePageId,
        name: "Startseite",
        slug: "/",
        data: { content: [], root: { props: {} } },
      },
    ],
    activePageId: homePageId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function saveProject(project: SiteProject): void {
  if (typeof localStorage === "undefined") return;
  const updated = { ...project, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function loadProject(): SiteProject | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SiteProject;
  } catch {
    return null;
  }
}

export function getOrCreateProject(): SiteProject {
  const existing = loadProject();
  if (existing) return existing;
  const project = createDefaultProject();
  saveProject(project);
  return project;
}

export function updatePageData(
  project: SiteProject,
  pageId: string,
  data: Record<string, unknown>
): SiteProject {
  return {
    ...project,
    pages: project.pages.map((p) => (p.id === pageId ? { ...p, data } : p)),
    updatedAt: new Date().toISOString(),
  };
}

export function addPage(
  project: SiteProject,
  name: string,
  slug: string
): SiteProject {
  const newPage: Page = {
    id: generateId(),
    name,
    slug,
    data: { content: [], root: { props: {} } },
  };
  return {
    ...project,
    pages: [...project.pages, newPage],
    activePageId: newPage.id,
    updatedAt: new Date().toISOString(),
  };
}

export function removePage(project: SiteProject, pageId: string): SiteProject {
  if (project.pages.length <= 1) return project;
  const pages = project.pages.filter((p) => p.id !== pageId);
  const activePageId =
    project.activePageId === pageId ? pages[0].id : project.activePageId;
  return { ...project, pages, activePageId, updatedAt: new Date().toISOString() };
}

export function renamePage(
  project: SiteProject,
  pageId: string,
  name: string
): SiteProject {
  return {
    ...project,
    pages: project.pages.map((p) => (p.id === pageId ? { ...p, name } : p)),
    updatedAt: new Date().toISOString(),
  };
}

export function updateTheme(project: SiteProject, theme: Theme): SiteProject {
  return { ...project, theme, updatedAt: new Date().toISOString() };
}
