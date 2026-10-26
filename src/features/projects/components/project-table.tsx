"use client";

import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Image as ImageIcon, ExternalLink } from "lucide-react";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function ProjectTable({ projects, onEdit, onDelete }: ProjectTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center text-zinc-400 font-mono text-sm">
        No projects found. Click &quot;Add New Project&quot; to create one.
      </div>
    );
  }

  return (
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
            {projects.map((project) => {
              const displayImage =
                project.images && project.images.length > 0
                  ? project.images[0]
                  : project.imageUrl;
              const imageCount =
                project.images?.length || (project.imageUrl ? 1 : 0);

              return (
              <tr key={project.id} className="hover:bg-zinc-900/40 transition-colors">
                <td className="px-4 py-3">
                  {displayImage ? (
                    <div className="relative h-10 w-16 overflow-hidden rounded border border-zinc-800 bg-zinc-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={displayImage}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                      {imageCount > 1 && (
                        <span className="absolute bottom-0 right-0 bg-black/80 px-1 text-[9px] font-mono text-zinc-300">
                          +{imageCount - 1}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-10 w-16 items-center justify-center rounded border border-zinc-800/80 bg-zinc-900/50 text-zinc-600">
                      <ImageIcon className="h-4 w-4" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-white">
                  <div className="flex items-center gap-1.5 font-semibold">
                    {project.title}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white"
                        title="Open Demo"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">/{project.slug}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] text-zinc-500 font-mono self-center">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {project.featured ? (
                    <Badge variant="active">Yes</Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-1">
                  <button
                    onClick={() => onEdit(project)}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    title="Edit Project"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="p-1.5 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
