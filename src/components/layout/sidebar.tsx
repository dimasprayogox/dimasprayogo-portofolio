"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FolderKanban,
  Cpu,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  ArrowLeft,
  LogOut,
} from "lucide-react";

const ADMIN_LINKS = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Skills", href: "/admin/skills", icon: Cpu },
  { label: "Experience", href: "/admin/experience", icon: Briefcase },
  { label: "Education", href: "/admin/education", icon: GraduationCap },
  { label: "Certifications", href: "/admin/certifications", icon: Award },
  { label: "Messages", href: "/admin/messages", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-800/80 bg-zinc-950/80 p-4 min-h-screen hidden md:flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="font-mono text-sm font-semibold text-white tracking-wider">
            ADMIN CMS
          </span>
        </div>

        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-100 text-zinc-950 font-semibold"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-zinc-800/80 pt-4 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Public Site
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 text-xs font-mono text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors px-3 py-2 rounded-lg"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
