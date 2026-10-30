"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site";
import { MOCK_PROJECTS, getProjects } from "@/features/projects/data";
import { MOCK_SKILLS } from "@/features/skills/data";
import { MOCK_EXPERIENCES } from "@/features/experience/data";
import { MOCK_EDUCATION } from "@/features/education/data";
import { MOCK_CERTIFICATIONS } from "@/features/certifications/data";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/shared/icons";
import { ArrowUpRight, ExternalLink, Mail, CheckCircle2, Terminal, Images, GraduationCap, Award } from "lucide-react";
import { Project, Experience, Skill, Education, Certification } from "@/types";
import { ProjectCoverImage } from "@/features/projects/components/project-cover-image";
import HeroSection from "@/components/home/hero-section";
import BorderGlow from "@/components/ui/border-glow";
import { motion } from "motion/react";

const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const featuredProjects = projects.filter((p: Project) => Boolean(p.featured));

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Projects Section */}
      <section id="projects" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="flex items-center justify-between border-b border-zinc-800 pb-4"
        >
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
          >
            View all ({projects.length}) <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {featuredProjects.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center text-xs font-mono text-zinc-500">
            No featured projects yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project: Project, index: number) => {
              const isEven = index % 2 === 0;
              const coverImage =
                project.images && project.images.length > 0
                  ? project.images[0]
                  : project.imageUrl;
              const totalImages =
                project.images?.length || (project.imageUrl ? 1 : 0);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: easeCurve, delay: index * 0.18 }}
                  className="relative group h-full"
                >
                  <Card className="flex flex-col justify-between overflow-hidden p-0 h-full hover:border-zinc-700 transition-colors relative">
                    {coverImage && (
                      <ProjectCoverImage
                        src={coverImage}
                        alt={project.title}
                        totalImages={totalImages}
                      />
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
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="border-b border-zinc-800 pb-4"
        >
          <h2 className="text-xl font-bold text-white tracking-tight">Work Experience</h2>
        </motion.div>

        <div className="space-y-8 pl-2 border-l border-zinc-800">
          {MOCK_EXPERIENCES.map((exp: Experience, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isEven ? -35 : 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: easeCurve, delay: index * 0.2 }}
                className="relative pl-6 space-y-2 group"
              >
                <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-400 transition-colors group-hover:bg-emerald-400" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {exp.role}
                      <span className="hidden sm:inline text-zinc-400 font-normal"> @ {exp.company}</span>
                    </h3>
                    <p className="text-xs text-zinc-400 sm:hidden">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                </div>
                {exp.location && (
                  <p className="text-xs font-mono text-zinc-500">{exp.location}</p>
                )}
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
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Riwayat Pendidikan Section */}
      <section id="education" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="border-b border-zinc-800 pb-4"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Riwayat Pendidikan</h2>
          </div>
        </motion.div>

        <div className="space-y-4">
          {MOCK_EDUCATION.map((edu: Education, index: number) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: easeCurve, delay: index * 0.2 }}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-white">{edu.institution}</h3>
                  <p className="text-sm text-zinc-300">
                    {edu.degree} {edu.gpa ? <span className="font-mono text-xs text-zinc-400">| IPK: {edu.gpa}</span> : null}
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-400">{edu.period}</span>
              </div>
              {edu.description && (
                <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sertifikasi Section */}
      <section id="certifications" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="border-b border-zinc-800 pb-4"
        >
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-zinc-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Sertifikasi</h2>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_CERTIFICATIONS.map((cert: Certification, index: number) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: easeCurve, delay: index * 0.15 }}
              >
                <Card className="p-5 space-y-3 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                      <span>{cert.issuer}</span>
                      <span className="text-zinc-500">{cert.issueDate}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white leading-snug">{cert.title}</h3>
                    {cert.credentialId && (
                      <p className="text-xs font-mono text-zinc-400">
                        Kredensial: <span className="text-zinc-200">{cert.credentialId}</span>
                      </p>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <div className="pt-2 border-t border-zinc-900">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Lihat Sertifikat
                      </a>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack & Skills Section */}
      <section id="skills" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easeCurve }}
          className="border-b border-zinc-800 pb-4"
        >
          <h2 className="text-xl font-bold text-white tracking-tight">Keahlian & Tech Stack</h2>
        </motion.div>

        <div className="grid gap-2.5 sm:gap-4 sm:grid-cols-2">
          {["Bahasa Pemrograman", "Frontend", "Backend & API", "Database", "Tools"].map((category: string, index: number) => {
            const categorySkills = MOCK_SKILLS.filter((s: Skill) => s.category === category);

            // Varied entrance direction per card (Left, Right, Fade Down, Zoom In)
            const initialVariations = [
              { opacity: 0, x: -40 },
              { opacity: 0, x: 40 },
              { opacity: 0, y: 35 },
              { opacity: 0, scale: 0.9 }
            ];

            const initialStyle = initialVariations[index % 4];

            return (
              <motion.div
                key={category}
                initial={initialStyle}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: easeCurve, delay: index * 0.15 }}
              >
                <BorderGlow
                  edgeSensitivity={35}
                  glowColor="0 0 100"
                  backgroundColor="#09090b"
                  borderRadius={14}
                  glowRadius={25}
                  glowIntensity={1.0}
                  coneSpread={30}
                  animated={false}
                  colors={["#ffffff", "#e4e4e7", "#a1a1aa"]}
                >
                  <div className="p-3.5 sm:p-6 space-y-2 sm:space-y-3">
                    <h3 className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-wider">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                      {categorySkills.map((skill: Skill) => (
                        <span
                          key={skill.id}
                          className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:text-white"
                        >
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-400" />
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: easeCurve }}
        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 sm:p-12 text-center space-y-6"
      >
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
      </motion.section>
    </div>
  );
}
