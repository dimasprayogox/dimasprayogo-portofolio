import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site";
import { MOCK_PROJECTS } from "@/features/projects/data";
import { MOCK_SKILLS } from "@/features/skills/data";
import { MOCK_EXPERIENCES } from "@/features/experience/data";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/shared/icons";
import { ArrowUpRight, ExternalLink, Mail, CheckCircle2, Terminal } from "lucide-react";
import { Project, Experience, Skill } from "@/types";

export default function HomePage() {
  const featuredProjects = MOCK_PROJECTS.filter((p: Project) => p.featured);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3.5 py-1 text-xs font-mono text-zinc-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{SITE_CONFIG.status}</span>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Hi, I&apos;m <span className="underline decoration-zinc-700 underline-offset-8">{SITE_CONFIG.name}</span>.
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-300 font-medium">
            {SITE_CONFIG.role} crafting minimalist, scalable web applications.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed pt-2 max-w-2xl">
            {SITE_CONFIG.bio}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/projects">
            <Button variant="primary" size="lg">
              View Projects
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </Link>
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            View all ({MOCK_PROJECTS.length}) <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project: Project) => (
            <Card key={project.id} className="flex flex-col justify-between group overflow-hidden p-0">
              {project.imageUrl && (
                <div className="h-44 w-full overflow-hidden bg-zinc-900 border-b border-zinc-800 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
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
                          aria-label="GitHub Repository"
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

                <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Work Experience</h2>
        </div>

        <div className="space-y-8 pl-2 border-l border-zinc-800">
          {MOCK_EXPERIENCES.map((exp: Experience) => (
            <div key={exp.id} className="relative pl-6 space-y-2">
              <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-400" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-white">
                  {exp.role} <span className="text-zinc-400 font-normal">@ {exp.company}</span>
                </h3>
                <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
              </div>
              <ul className="space-y-1 text-sm text-zinc-400 list-disc list-inside">
                {exp.description.map((item: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skills.map((skill: string) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack & Skills Section */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Skills & Tech Stack</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {["Frontend", "Backend", "Database", "DevOps & Tools"].map((category: string) => {
            const categorySkills = MOCK_SKILLS.filter((s: Skill) => s.category === category);
            return (
              <Card key={category} className="space-y-3">
                <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill: Skill) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-200"
                    >
                      <CheckCircle2 className="h-3 w-3 text-zinc-400" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 sm:p-12 text-center space-y-6">
        <div className="mx-auto max-w-md space-y-2">
          <h2 className="text-2xl font-bold text-white">Let&apos;s build something together</h2>
          <p className="text-sm text-zinc-400">
            Have a project in mind or looking for a developer? Feel free to reach out.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <Button variant="primary" size="lg">
              <Mail className="h-4 w-4" /> Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
