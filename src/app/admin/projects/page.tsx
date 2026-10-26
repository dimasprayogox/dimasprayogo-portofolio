"use client";

import { useState, useEffect } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/features/projects/services";
import { ProjectTable } from "@/features/projects/components/project-table";
import { ProjectModal, ProjectFormData } from "@/features/projects/components/project-modal";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { uploadPortfolioAsset } from "@/lib/storage";
import { Plus } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await deleteProject(id);
    await fetchProjects();
  };

  const handleSubmit = async (formData: ProjectFormData, newFiles: File[] = []) => {
    setUploading(true);

    let uploadedUrls: string[] = [];
    if (newFiles.length > 0) {
      uploadedUrls = await Promise.all(
        newFiles.map((file) => uploadPortfolioAsset(file, "projects"))
      );
    }

    const allImages: string[] = [...(formData.images || []), ...uploadedUrls];
    const slug = formData.slug.trim() || formData.title.toLowerCase().replace(/\s+/g, "-");
    const tags = typeof formData.tags === "string"
      ? formData.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : formData.tags;

    const payload = {
      title: formData.title,
      slug,
      description: formData.description,
      longDescription: formData.longDescription,
      tags,
      githubUrl: formData.githubUrl,
      demoUrl: formData.demoUrl,
      images: allImages,
      imageUrl: allImages[0] || "",
      featured: formData.featured,
    };

    if (editingProject) {
      await updateProject(editingProject.id, payload);
    } else {
      await createProject(payload);
    }

    setUploading(false);
    setIsModalOpen(false);
    setEditingProject(null);
    await fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects Management</h1>
          <p className="text-xs font-mono text-zinc-400">
            Full CRUD operations with Cloudflare R2 & Supabase Integration
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={handleOpenAdd}>
          <Plus className="h-4 w-4" /> Add New Project
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs font-mono text-zinc-500">
          Loading projects...
        </div>
      ) : (
        <ProjectTable
          projects={projects}
          onEdit={handleOpenEdit}
          onDelete={handleDelete}
        />
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingProject}
        uploading={uploading}
      />
    </div>
  );
}
