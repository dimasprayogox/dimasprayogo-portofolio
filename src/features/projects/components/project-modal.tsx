"use client";

import { useState, useEffect, useRef } from "react";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileImage, Upload, X, CheckCircle2, Plus } from "lucide-react";

export interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  tags: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  images: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ProjectFormData, files: File[]) => Promise<void>;
  initialData?: Project | null;
  uploading: boolean;
}

export function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  uploading,
}: ProjectModalProps) {
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<{ file: File; previewUrl: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    tags: "Next.js, TypeScript",
    githubUrl: "",
    demoUrl: "",
    featured: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        slug: initialData.slug || "",
        description: initialData.description || "",
        longDescription: initialData.longDescription || "",
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : "",
        githubUrl: initialData.githubUrl || "",
        demoUrl: initialData.demoUrl || "",
        featured: initialData.featured ?? false,
      });

      const initialImgs = Array.isArray(initialData.images) && initialData.images.length > 0
        ? initialData.images
        : initialData.imageUrl
        ? [initialData.imageUrl]
        : [];
      setExistingImages(initialImgs);
    } else {
      setForm({
        title: "",
        slug: "",
        description: "",
        longDescription: "",
        tags: "Next.js, TypeScript, Tailwind CSS",
        githubUrl: "",
        demoUrl: "",
        featured: true,
      });
      setExistingImages([]);
    }

    return () => {
      newFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const added = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setNewFiles((prev) => [...prev, ...added]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index: number) => {
    setNewFiles((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(
      {
        ...form,
        images: existingImages,
      },
      newFiles.map((item) => item.file)
    );
  };

  const totalImagesCount = existingImages.length + newFiles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm overflow-y-auto">
      <Card className="w-full max-w-xl p-6 bg-zinc-950 border-zinc-800 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileImage className="h-5 w-5 text-zinc-400" />
            {initialData ? "Edit Project Entry" : "Add New Project Entry"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitForm} className="space-y-4 text-left">
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

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-300">Long Overview Description</label>
            <Textarea
              placeholder="Detailed description for project page..."
              value={form.longDescription}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
            />
          </div>

          {/* MULTI-SCREENSHOT UPLOAD */}
          <div className="space-y-2 border border-dashed border-zinc-800 rounded-lg p-4 bg-zinc-900/40">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-zinc-300">
                Project Screenshots ({totalImagesCount} image{totalImagesCount !== 1 ? "s" : ""})
              </label>
              {newFiles.length > 0 && (
                <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> {newFiles.length} ready to upload
                </span>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFilesChange}
            />

            {totalImagesCount > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {existingImages.map((url, idx) => (
                  <div
                    key={`existing-${idx}`}
                    className="relative group rounded-md overflow-hidden border border-zinc-800 bg-zinc-900 h-28"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Project screenshot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 bg-emerald-500/90 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-1 right-1 bg-black/80 text-zinc-400 hover:text-white rounded-full p-1 transition-colors"
                      title="Remove image"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                {newFiles.map((item, idx) => {
                  const isCover = existingImages.length === 0 && idx === 0;
                  return (
                    <div
                      key={`new-${idx}`}
                      className="relative group rounded-md overflow-hidden border border-emerald-500/40 bg-zinc-900 h-28"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.previewUrl}
                        alt={`New upload ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 bg-zinc-900/90 text-emerald-400 text-[10px] font-mono px-1.5 py-0.5 rounded border border-emerald-500/30">
                        {isCover ? "Cover (New)" : "New"}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNewFile(idx)}
                        className="absolute top-1 right-1 bg-black/80 text-zinc-400 hover:text-white rounded-full p-1 transition-colors"
                        title="Remove image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center h-28 border border-dashed border-zinc-700 rounded-md hover:bg-zinc-800/50 hover:border-zinc-500 transition-colors text-zinc-400 hover:text-white"
                >
                  <Plus className="h-5 w-5 mb-1" />
                  <span className="text-[11px] font-mono">Add more</span>
                </button>
              </div>
            ) : (
              <label
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center py-6 cursor-pointer border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors"
              >
                <Upload className="h-6 w-6 text-zinc-400 mb-1" />
                <span className="text-xs text-zinc-300 font-medium">
                  Click to upload screenshots (multiple allowed)
                </span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">
                  Cloudflare R2 Object Storage (.png, .jpg, .webp)
                </span>
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
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={uploading}>
              {uploading ? "Saving..." : initialData ? "Update Project" : "Save Project"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
