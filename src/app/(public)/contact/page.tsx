"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/constants/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate server action submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="space-y-10 max-w-3xl">
      <div className="space-y-3 border-b border-zinc-800 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-white">Get in Touch</h1>
        <p className="text-sm text-zinc-400">
          Have a project opportunity, question, or just want to connect? Send a message below.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Direct info sidebar */}
        <div className="space-y-4">
          <Card className="space-y-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-200">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-400">Email</p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-xs font-medium text-white hover:underline"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-zinc-900 pt-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-200">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-400">Location</p>
                <p className="text-xs font-medium text-white">{SITE_CONFIG.location}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card className="p-6">
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Message Sent!</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  Thank you for reaching out. I will get back to you as soon as possible.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-300">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-300">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-zinc-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    placeholder="How can I help you?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <Button type="submit" variant="primary" size="md" className="w-full" disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
