import { SITE_CONFIG } from "@/constants/site";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-black text-zinc-400">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-xs text-zinc-500 font-mono">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Built with Next.js & Tailwind CSS.
        </p>

        <div className="flex items-center gap-4 text-zinc-400">
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="transition-colors hover:text-white"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
