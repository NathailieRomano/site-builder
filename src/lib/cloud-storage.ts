import { supabase } from "./supabase";
import type { SiteProject } from "@/types";

export interface CloudProject {
  id: string;
  user_id: string;
  name: string;
  slug: string | null;
  data: Record<string, unknown>;
  theme: Record<string, unknown>;
  pages: Record<string, unknown>[];
  template_id: string | null;
  is_published: boolean;
  published_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * List all projects for the current user
 */
export async function listProjects(): Promise<CloudProject[]> {
  const { data, error } = await supabase
    .from("builder_projects")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Load a specific project by ID
 */
export async function loadCloudProject(id: string): Promise<CloudProject | null> {
  const { data, error } = await supabase
    .from("builder_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    throw error;
  }
  return data;
}

/**
 * Save a project to Supabase (upsert)
 */
export async function saveCloudProject(
  project: SiteProject,
  cloudId?: string
): Promise<CloudProject> {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error("Nicht eingeloggt");

  const payload = {
    user_id: user.data.user.id,
    name: project.name,
    theme: project.theme as unknown as Record<string, unknown>,
    pages: project.pages as unknown as Record<string, unknown>[],
    template_id: null,
  };

  if (cloudId) {
    // Update existing
    const { data, error } = await supabase
      .from("builder_projects")
      .update(payload)
      .eq("id", cloudId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Create new
    const { data, error } = await supabase
      .from("builder_projects")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

/**
 * Delete a project
 */
export async function deleteCloudProject(id: string): Promise<void> {
  const { error } = await supabase
    .from("builder_projects")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/**
 * Convert CloudProject to local SiteProject format
 */
export function cloudToLocal(cloud: CloudProject): SiteProject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pages = cloud.pages as any as SiteProject["pages"];
  return {
    id: cloud.id,
    name: cloud.name,
    theme: cloud.theme as unknown as SiteProject["theme"],
    pages,
    activePageId: pages[0]?.id || "",
    createdAt: cloud.created_at,
    updatedAt: cloud.updated_at,
  };
}
