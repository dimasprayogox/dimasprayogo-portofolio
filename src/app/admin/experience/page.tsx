import { MOCK_EXPERIENCES } from "@/features/experience/data";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Experience } from "@/types";

export default function AdminExperiencePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Work Experience</h1>
          <p className="text-xs font-mono text-zinc-400">Manage career history and roles</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {MOCK_EXPERIENCES.map((exp: Experience) => (
          <div key={exp.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">{exp.role}</h2>
                <p className="text-xs font-mono text-zinc-400">{exp.company} • {exp.period}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-zinc-400 hover:text-white">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-1.5 text-red-400 hover:text-red-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside">
              {exp.description.map((desc: string, i: number) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
