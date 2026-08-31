import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MOCK_PROJECTS } from "@/features/projects/data";
import { MOCK_SKILLS } from "@/features/skills/data";
import { MOCK_EXPERIENCES } from "@/features/experience/data";
import { FolderKanban, Cpu, Briefcase, Mail, Plus, ArrowUpRight } from "lucide-react";

export default function AdminOverviewPage() {
  const stats = [
    { label: "Total Projects", value: MOCK_PROJECTS.length, icon: FolderKanban, href: "/admin/projects" },
    { label: "Skills Listed", value: MOCK_SKILLS.length, icon: Cpu, href: "/admin/skills" },
    { label: "Work Experiences", value: MOCK_EXPERIENCES.length, icon: Briefcase, href: "/admin/experience" },
    { label: "Inbox Messages", value: "3", icon: Mail, href: "/admin/messages" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">CMS Dashboard Overview</h1>
          <p className="text-xs font-mono text-zinc-400">Manage your portfolio content & data access</p>
        </div>
        <Link href="/admin/projects">
          <Button variant="primary" size="sm">
            <Plus className="h-4 w-4" /> Add New Project
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:border-zinc-700 transition-colors">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-xs font-mono">{stat.label}</span>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Projects Table Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Projects</h2>
          <Link
            href="/admin/projects"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            Manage All <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden">
          <div className="divide-y divide-zinc-900">
            {MOCK_PROJECTS.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 text-sm hover:bg-zinc-900/40 transition-colors"
              >
                <div>
                  <div className="font-semibold text-white">{project.title}</div>
                  <div className="text-xs text-zinc-400">{project.description}</div>
                </div>
                <span className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800">
                  {project.slug}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
