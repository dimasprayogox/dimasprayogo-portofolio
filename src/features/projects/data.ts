import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Project } from "@/types";

export { MOCK_PROJECTS } from "./mock";

export {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from "./services";
