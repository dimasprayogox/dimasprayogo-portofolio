import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_PROJECTS } from "@/features/projects/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/icons";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Project } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p: Project) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = MOCK_PROJECTS.find((p: Project) => p.slug === slug);

  if (!project) {
    notFound();
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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{project.title}</h1>
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

      {/* Project Screenshot Display */}
      {project.imageUrl ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
            <ExternalLink className="h-6 w-6" />
          </div>
          <p className="text-sm font-mono text-zinc-400">Interactive Preview & Screenshots</p>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Visit the live deployment or source repository above to inspect the complete application architecture.
          </p>
        </div>
      )}

      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Project Overview</h2>
        <p>{project.longDescription || project.description}</p>
      </div>
    </div>
  );
}
