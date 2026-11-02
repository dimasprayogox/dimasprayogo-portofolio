import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/features/projects/services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/icons";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ProjectGallery } from "@/features/projects/components/project-gallery";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const ogImage =
    project.images && project.images.length > 0
      ? project.images[0]
      : project.imageUrl || "/screenshots/hero.png";

  return {
    title: project.title,
    description: project.description,
    keywords: [project.title, ...project.tags, "Full Stack Developer", "Software Engineer"],
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: [
        {
          url: ogImage,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const images =
    project.images && project.images.length > 0
      ? project.images
      : project.imageUrl
      ? [project.imageUrl]
      : [];

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
      <ProjectGallery title={project.title} images={images} />

      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <h2 className="text-xl font-bold text-white">Project Overview</h2>
        <div className="whitespace-pre-line text-sm text-zinc-300 leading-relaxed">
          {project.longDescription || project.description}
        </div>
      </div>
    </div>
  );
}
