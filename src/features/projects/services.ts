import { createClient } from "@/lib/supabase/client";
import { Project } from "@/types";
import { MOCK_PROJECTS } from "./mock";

const LOCAL_STORAGE_KEY = "portfolio_projects_custom_v1";
const ORDER_STORAGE_KEY = "portfolio_projects_order_v1";

function mapFromDb(item: Record<string, unknown>, fallbackIndex: number = 0): Project {
  let images = Array.isArray(item.images)
    ? (item.images as string[])
    : typeof item.image_url === "string" && item.image_url
    ? [item.image_url]
    : [];

  // Convert blocked Cloudflare R2 development domains (r2.dev) to our local API proxy
  images = images.map((url) => {
    if (typeof url === "string" && url.includes(".r2.dev/")) {
      return url.replace(/https?:\/\/[^/]+\.r2\.dev\//, "/api/assets/");
    }
    return url;
  });

  return {
    id: String(item.id),
    slug: String(item.slug || ""),
    title: String(item.title || ""),
    description: String(item.description || ""),
    longDescription: typeof item.long_description === "string" ? item.long_description : "",
    tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
    githubUrl: typeof item.github_url === "string" ? item.github_url : "",
    demoUrl: typeof item.demo_url === "string" ? item.demo_url : "",
    images,
    imageUrl: images[0] || "",
    featured: Boolean(item.featured),
    orderIndex:
      typeof item.order_index === "number"
        ? item.order_index
        : typeof item.display_order === "number"
        ? item.display_order
        : fallbackIndex,
    createdAt: typeof item.created_at === "string" ? item.created_at : new Date().toISOString(),
  };
}

function mapToDb(project: Partial<Project>) {
  const dbObj: Record<string, unknown> = {};
  if (project.slug !== undefined) dbObj.slug = project.slug;
  if (project.title !== undefined) dbObj.title = project.title;
  if (project.description !== undefined) dbObj.description = project.description;
  if (project.longDescription !== undefined) dbObj.long_description = project.longDescription;
  if (project.tags !== undefined) dbObj.tags = project.tags;
  if (project.githubUrl !== undefined) dbObj.github_url = project.githubUrl;
  if (project.demoUrl !== undefined) dbObj.demo_url = project.demoUrl;
  if (project.images !== undefined) {
    dbObj.images = project.images;
    dbObj.image_url = project.images[0] || "";
  } else if (project.imageUrl !== undefined) {
    dbObj.image_url = project.imageUrl;
    dbObj.images = project.imageUrl ? [project.imageUrl] : [];
  }
  if (project.featured !== undefined) dbObj.featured = project.featured;
  if (project.orderIndex !== undefined) dbObj.order_index = project.orderIndex;
  return dbObj;
}

function getStoredOrderIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const cached = localStorage.getItem(ORDER_STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
}

function saveStoredOrderIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error("LocalStorage save order error:", err);
  }
}

function sortAndApplyOrder(projects: Project[]): Project[] {
  const storedIds = getStoredOrderIds();
  const idToOrder = new Map<string, number>();

  if (storedIds.length > 0) {
    storedIds.forEach((id, idx) => idToOrder.set(id, idx));
  }

  const sorted = [...projects].sort((a, b) => {
    if (idToOrder.has(a.id) || idToOrder.has(b.id)) {
      const orderA = idToOrder.get(a.id) ?? Infinity;
      const orderB = idToOrder.get(b.id) ?? Infinity;
      if (orderA !== orderB) return orderA - orderB;
    }

    const idxA = typeof a.orderIndex === "number" ? a.orderIndex : Infinity;
    const idxB = typeof b.orderIndex === "number" ? b.orderIndex : Infinity;
    if (idxA !== idxB) return idxA - idxB;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sorted.map((p, idx) => ({ ...p, orderIndex: idx }));
}

function getLocalProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!cached) {
      return [];
    }
    return JSON.parse(cached);
  } catch {
    return [];
  }
}

function saveLocalProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error("LocalStorage save error:", err);
  }
}

export async function getProjects(): Promise<Project[]> {
  const localProjects = getLocalProjects();

  try {
    const supabase = createClient();
    let { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      const fallback = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      data = fallback.data;
      error = fallback.error;
    }

    if (!error && data && data.length > 0) {
      const dbProjects = data.map((item, idx) => mapFromDb(item, idx));
      const ordered = sortAndApplyOrder(dbProjects);
      saveLocalProjects(ordered);
      return ordered;
    }
  } catch (err) {
    console.warn("Supabase fetch warning:", err);
  }

  const baseProjects = localProjects.length > 0 ? localProjects : MOCK_PROJECTS;
  return sortAndApplyOrder(baseProjects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function createProject(
  input: Omit<Project, "id" | "createdAt">
): Promise<Project> {
  const supabase = createClient();
  const dbData = mapToDb(input);

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert([dbData])
      .select("*")
      .single();

    if (!error && data) {
      const newProject = mapFromDb(data);
      const current = getLocalProjects();
      saveLocalProjects([newProject, ...current]);
      return newProject;
    } else if (error) {
      console.warn("Supabase insert error (falling back to local storage):", error.message);
    }
  } catch (err) {
    console.warn("Supabase create exception (using local fallback):", err);
  }

  // Fallback to local storage persistence
  const fallbackImages = input.images || (input.imageUrl ? [input.imageUrl] : []);
  const fallbackProject: Project = {
    ...input,
    images: fallbackImages,
    imageUrl: fallbackImages[0] || "",
    orderIndex: input.orderIndex ?? 0,
    id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    createdAt: new Date().toISOString(),
  };

  const current = getLocalProjects();
  const updated = [fallbackProject, ...current].map((p, idx) => ({ ...p, orderIndex: idx }));
  saveLocalProjects(updated);
  saveStoredOrderIds(updated.map((p) => p.id));
  return fallbackProject;
}

export async function reorderProjects(orderedProjects: Project[]): Promise<boolean> {
  const updatedProjects = orderedProjects.map((p, index) => ({
    ...p,
    orderIndex: index,
  }));

  saveLocalProjects(updatedProjects);
  saveStoredOrderIds(updatedProjects.map((p) => p.id));

  try {
    const supabase = createClient();
    await Promise.allSettled(
      updatedProjects.map((p) =>
        supabase
          .from("projects")
          .update({ order_index: p.orderIndex })
          .eq("id", p.id)
      )
    );
  } catch (err) {
    console.warn("Supabase reorder sync warning:", err);
  }

  return true;
}

export async function updateProject(
  id: string,
  input: Partial<Project>
): Promise<Project> {
  const supabase = createClient();
  const dbData = mapToDb(input);

  try {
    const { data, error } = await supabase
      .from("projects")
      .update(dbData)
      .eq("id", id)
      .select("*")
      .single();

    if (!error && data) {
      const updatedProject = mapFromDb(data);
      const current = getLocalProjects();
      saveLocalProjects(
        current.map((p) => (p.id === id ? updatedProject : p))
      );
      return updatedProject;
    }
  } catch (err) {
    console.warn("Supabase update failed, updating local fallback:", err);
  }

  // Local fallback update
  const current = getLocalProjects();
  const existing = current.find((p) => p.id === id);
  const updatedImages = input.images ?? existing?.images ?? (input.imageUrl ? [input.imageUrl] : (existing?.imageUrl ? [existing.imageUrl] : []));
  const updatedProject: Project = {
    ...existing,
    ...input,
    id,
    title: input.title ?? existing?.title ?? "",
    slug: input.slug ?? existing?.slug ?? "",
    description: input.description ?? existing?.description ?? "",
    tags: input.tags ?? existing?.tags ?? [],
    images: updatedImages,
    imageUrl: updatedImages[0] || "",
    featured: input.featured ?? existing?.featured ?? false,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  };

  const newList = current.map((p) => (p.id === id ? updatedProject : p));
  saveLocalProjects(newList);
  return updatedProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase delete warning:", err);
  }

  // Always update local cache
  const current = getLocalProjects();
  saveLocalProjects(current.filter((p) => p.id !== id));
  return true;
}
