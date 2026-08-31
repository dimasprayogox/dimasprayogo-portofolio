import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle, Trash2 } from "lucide-react";

export default function AdminMessagesPage() {
  const messages = [
    {
      id: "1",
      name: "Alex Rivera",
      email: "alex@techfirm.io",
      message: "Interested in hiring you for a Next.js full-stack contract project.",
      date: "2026-08-30",
      read: false,
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      email: "sarah.j@designco.com",
      message: "Loved your DecentraShare portfolio piece! Would love to collaborate.",
      date: "2026-08-28",
      read: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">Contact Messages</h1>
        <p className="text-xs font-mono text-zinc-400">Incoming inquiries from the contact form</p>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-2 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-zinc-400" />
                <span className="font-semibold text-white text-sm">{msg.name}</span>
                <span className="text-xs font-mono text-zinc-500">({msg.email})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">{msg.date}</span>
                {!msg.read && <Badge variant="active">New</Badge>}
              </div>
            </div>
            <p className="text-sm text-zinc-300 pl-6 leading-relaxed">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
