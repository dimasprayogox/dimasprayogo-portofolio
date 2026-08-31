import { MOCK_SKILLS } from "@/features/skills/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit } from "lucide-react";

export default function AdminSkillsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Skills & Tech Stack</h1>
          <p className="text-xs font-mono text-zinc-400">Manage categories and technical competencies</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" /> Add Skill
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {["Frontend", "Backend", "Database", "DevOps & Tools"].map((cat) => (
          <div key={cat} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-3">
            <h2 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{cat}</h2>
            <div className="space-y-2">
              {MOCK_SKILLS.filter((s) => s.category === cat).map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-sm"
                >
                  <span className="font-medium text-white">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{skill.level}</Badge>
                    <button className="text-zinc-500 hover:text-red-400 p-1">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
