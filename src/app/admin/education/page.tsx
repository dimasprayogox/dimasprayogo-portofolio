import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, GraduationCap } from "lucide-react";
import { MOCK_EDUCATION } from "@/features/education/data";
import { Education } from "@/types";

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

      <div className="space-y-4">
        {MOCK_EDUCATION.map((edu: Education) => (
          <Card key={edu.id} className="p-6 space-y-3">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-zinc-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-white">{edu.degree}</h2>
                <p className="text-xs font-mono text-zinc-400">
                  {edu.institution} • {edu.period} {edu.gpa ? `• IPK: ${edu.gpa}` : ""}
                </p>
                {edu.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                    {edu.description}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
