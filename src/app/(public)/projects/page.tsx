import Link from "next/link";
import { MOCK_PROJECTS } from "@/features/projects/data";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/shared/icons";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Project } from "@/types";

export const metadata = {
  title: "Projects",
  description: "Explore selected projects built by Dimas Prayogo.",
};

export default function ProjectsPage() {
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
        <p className="text-sm text-zinc-400 max-w-xl">
          A showcase of recent web applications, CLI utilities, smart contracts, and full-stack projects.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {MOCK_PROJECTS.map((project: Project, index: number) => {
          const delays = ["delay-150", "delay-200", "delay-250", "delay-300"];
          return (
            <Card
              key={project.id}
              className={`flex flex-col justify-between group animate-load ${delays[index % delays.length]}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/projects/${project.slug}`} className="group-hover:underline">
                    <CardTitle>{project.title}</CardTitle>
                  </Link>
                  <div className="flex items-center gap-2 text-zinc-400 shrink-0">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
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
                        className="hover:text-white transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900">
                {project.tags.map((tag: string) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
