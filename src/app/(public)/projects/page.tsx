"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProjects } from "@/features/projects/services";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/shared/icons";
import { ExternalLink, ArrowLeft, Images } from "lucide-react";
import { Project } from "@/types";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-10">
      <div className="space-y-3 border-b border-zinc-800 pb-6 animate-load delay-100">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">All Projects</h1>

      </div>

      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-zinc-500">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center space-y-2">
          <p className="text-sm text-zinc-400 font-mono">No projects found.</p>
          <p className="text-xs text-zinc-500">
            Add projects via the Admin dashboard to display them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project: Project, index: number) => {
            const delays = ["delay-150", "delay-200", "delay-250", "delay-300"];
            const coverImage =
              project.images && project.images.length > 0
                ? project.images[0]
                : project.imageUrl;
            const totalImages =
              project.images?.length || (project.imageUrl ? 1 : 0);

            return (
              <div
                key={project.id}
                className={`relative group h-full animate-load ${delays[index % delays.length]}`}
              >
                <Card className="flex flex-col justify-between overflow-hidden p-0 h-full hover:border-zinc-700 transition-colors relative">
                  {coverImage && (
                    <div className="h-44 w-full overflow-hidden bg-zinc-900 border-b border-zinc-800 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {totalImages > 1 && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-xs">
                          <Images className="h-3 w-3" />
                          {totalImages}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="group-hover:underline">{project.title}</CardTitle>
                        <div className="flex items-center gap-2 text-zinc-400 shrink-0 relative z-20">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors p-1"
                              aria-label="GitHub"
                            >
                              <GithubIcon className="h-4 w-4" />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors p-1"
                              aria-label="Live Demo"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                      {project.tags.map((tag: string) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
                <Link
                  href={`/projects/${project.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`View ${project.title} details`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
