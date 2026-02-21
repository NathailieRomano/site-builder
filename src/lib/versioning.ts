import type { SiteProject } from "@/types";

interface ProjectVersion {
  timestamp: string;
  label: string;
  data: string; // JSON stringified SiteProject
}

const MAX_VERSIONS = 20;
const STORAGE_PREFIX = "site-builder-versions-";

function getKey(projectId: string): string {
  return STORAGE_PREFIX + projectId;
}

/**
 * Get all versions for a project
 */
export function getVersions(projectId: string): ProjectVersion[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(getKey(projectId)) || "[]");
  } catch {
    return [];
  }
}

/**
 * Save a snapshot of the current project state
 */
export function saveVersion(project: SiteProject, label?: string): void {
  if (typeof window === "undefined") return;
  const versions = getVersions(project.id);

  // Don't save if last version was < 60s ago
  if (versions.length > 0) {
    const lastTs = new Date(versions[versions.length - 1].timestamp).getTime();
    if (Date.now() - lastTs < 60000) return;
  }

  const version: ProjectVersion = {
    timestamp: new Date().toISOString(),
    label: label || `Auto-Save ${new Date().toLocaleTimeString("de-DE")}`,
    data: JSON.stringify(project),
  };

  versions.push(version);

  // Keep only last MAX_VERSIONS
  const trimmed = versions.slice(-MAX_VERSIONS);
  localStorage.setItem(getKey(project.id), JSON.stringify(trimmed));
}

/**
 * Restore a specific version
 */
export function restoreVersion(projectId: string, index: number): SiteProject | null {
  const versions = getVersions(projectId);
  const version = versions[index];
  if (!version) return null;
  try {
    return JSON.parse(version.data);
  } catch {
    return null;
  }
}

/**
 * Delete all versions for a project
 */
export function clearVersions(projectId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getKey(projectId));
}
