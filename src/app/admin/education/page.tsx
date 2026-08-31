import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, GraduationCap } from "lucide-react";

export default function AdminEducationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Education</h1>
          <p className="text-xs font-mono text-zinc-400">Academic background and qualifications</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      <Card className="p-6 text-center space-y-3">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
          <GraduationCap className="h-5 w-5" />
        </div>
        <h2 className="text-base font-semibold text-white">Bachelor of Computer Science</h2>
        <p className="text-xs font-mono text-zinc-400">State University • 2020 — 2024</p>
      </Card>
    </div>
  );
}
