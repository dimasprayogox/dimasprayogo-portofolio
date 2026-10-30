"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { getProjectBySlug } from "@/features/projects/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/icons";
import { ArrowLeft, ExternalLink, Calendar, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Project } from "@/types";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getProjectBySlug(slug).then((res) => {
      if (isMounted) {
        setProject(res);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl py-12 text-center text-xs font-mono text-zinc-500">
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6 max-w-3xl py-12 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
        <p className="text-sm text-zinc-400">The requested project could not be located.</p>
        <Link href="/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" /> Back to all projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to all projects
      </Link>

      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(project.createdAt)}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {project.title}
        </h1>

        <p className="text-lg text-zinc-300 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag: string) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md">
                <GithubIcon className="h-4 w-4" /> View Source Code
              </Button>
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="md">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>

      {/* Project Screenshots Gallery */}
      {(() => {
        const images =
          project.images && project.images.length > 0
            ? project.images
            : project.imageUrl
            ? [project.imageUrl]
            : [];

        if (images.length === 0) {
          return (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-12 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-500">
                <ImageIcon className="h-6 w-6" />
              </div>
              <p className="text-sm font-mono text-zinc-400">No screenshot provided</p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                Visit the live demo or source code links above to view the project in action.
              </p>
            </div>
          );
        }

        const currentImg = images[activeImageIndex] || images[0];

        return (
          <div className="space-y-3">
            <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl flex items-center justify-center min-h-[300px] max-h-[580px] p-2 sm:p-4">
              <div
                className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${currentImg})` }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImg}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className="relative z-10 max-h-[520px] max-w-full w-auto h-auto object-contain rounded-lg shadow-2xl"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev > 0 ? prev - 1 : images.length - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/70 p-2 text-white/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev < images.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/70 p-2 text-white/80 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 right-3 z-20 rounded bg-black/80 px-2.5 py-1 text-xs font-mono text-zinc-300 backdrop-blur-xs">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border bg-zinc-900 transition-all cursor-pointer flex items-center justify-center p-0.5 ${
                      activeImageIndex === idx
                        ? "border-emerald-500 ring-2 ring-emerald-500/20"
                        : "border-zinc-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Project Overview</h2>
        <div className="whitespace-pre-line text-sm text-zinc-300 leading-relaxed">
          {project.longDescription || project.description}
        </div>
      </div>
    </div>
  );
}
