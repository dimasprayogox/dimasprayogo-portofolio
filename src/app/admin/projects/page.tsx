"use client";

import { useState } from "react";
import { MOCK_PROJECTS } from "@/features/projects/data";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { uploadPortfolioAsset } from "@/lib/storage";
import { Plus, Edit, Trash2, Image as ImageIcon, Upload, X, CheckCircle2, FileImage } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    tags: "Next.js, TypeScript, Tailwind CSS",
    githubUrl: "",
    demoUrl: "",
    imageUrl: "",
    featured: false,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let uploadedUrl = form.imageUrl;
    if (selectedFile) {
      uploadedUrl = await uploadPortfolioAsset(selectedFile, "projects");
    }

    const newProject: Project = {
      id: String(Date.now()),
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
      title: form.title,
      description: form.description,
      longDescription: form.longDescription,
      tags: form.tags.split(",").map((t) => t.trim()),
      githubUrl: form.githubUrl,
      demoUrl: form.demoUrl,
      imageUrl: uploadedUrl,
      featured: form.featured,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProjects([newProject, ...projects]);
    setUploading(false);
    setIsModalOpen(false);
    setForm({
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      tags: "Next.js, TypeScript",
      githubUrl: "",
      demoUrl: "",
      imageUrl: "",
      featured: false,
    });
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects Management</h1>
          <p className="text-xs font-mono text-zinc-400">Cloudflare R2 Object Storage integration for screenshots</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add New Project
        </Button>
      </div>

      {/* Projects Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="border-b border-zinc-800 bg-zinc-900/60 font-mono text-xs text-zinc-400 uppercase">
              <tr>
                <th className="px-4 py-3">Screenshot</th>
                <th className="px-4 py-3">Title & Slug</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="px-4 py-3">
                    {project.imageUrl ? (
                      <div className="h-10 w-16 overflow-hidden rounded border border-zinc-800 bg-zinc-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-10 w-16 items-center justify-center rounded border border-zinc-800/80 bg-zinc-900/50 text-zinc-600">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-white">
                    <div className="font-semibold">{project.title}</div>
                    <div className="text-xs text-zinc-500 font-mono">/{project.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {project.featured ? (
                      <Badge variant="active">Yes</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => setProjects(projects.filter((p) => p.id !== project.id))}
                      className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
          <Card className="w-full max-w-xl p-6 bg-zinc-950 border-zinc-800 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileImage className="h-5 w-5 text-zinc-400" />
                Add New Project Entry
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Project Title *</label>
                  <Input
                    required
                    placeholder="e.g. AI Portfolio CMS"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">URL Slug</label>
                  <Input
                    placeholder="e.g. ai-portfolio-cms"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Short Description *</label>
                <Input
                  required
                  placeholder="Brief summary of the project"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* PROJECT SCREENSHOT UPLOAD FIELD (Cloudflare R2) */}
              <div className="space-y-2 border border-dashed border-zinc-800 rounded-lg p-4 bg-zinc-900/40">
                <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                  <span>Project Screenshot Image (Cloudflare R2 Upload)</span>
                  {selectedFile && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Ready for R2
                    </span>
                  )}
                </label>

                {imagePreview ? (
                  <div className="relative group rounded-md overflow-hidden border border-zinc-800 max-h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-1 hover:bg-red-950"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-6 cursor-pointer border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors">
                    <Upload className="h-6 w-6 text-zinc-400 mb-1" />
                    <span className="text-xs text-zinc-300 font-medium">
                      Click to upload screenshot (.png, .jpg, .webp)
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Uploaded directly to Cloudflare R2 Bucket
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">GitHub Repository URL</label>
                  <Input
                    placeholder="https://github.com/..."
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Live Demo URL</label>
                  <Input
                    placeholder="https://my-demo.com"
                    value={form.demoUrl}
                    onChange={(e) => setForm({ ...form, demoUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Tags (comma separated)</label>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded border-zinc-800 bg-zinc-900"
                />
                <label htmlFor="featured" className="text-xs font-mono text-zinc-300 cursor-pointer">
                  Feature on Home Page
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={uploading}>
                  {uploading ? "Uploading to R2..." : "Save Project"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
