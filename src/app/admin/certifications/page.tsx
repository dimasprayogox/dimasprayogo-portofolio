"use client";

import { useState } from "react";
import { Certification } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { uploadPortfolioAsset } from "@/lib/storage";
import { Plus, Award, Trash2, FileText, Upload, X, CheckCircle2, ExternalLink } from "lucide-react";

export default function AdminCertificationsPage() {
  const [certs, setCerts] = useState<Certification[]>([
    {
      id: "1",
      title: "Meta Full Stack Developer Certificate",
      issuer: "Coursera / Meta",
      issueDate: "2024",
      credentialUrl: "https://coursera.org/verify/meta-fullstack",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "2",
      title: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      issueDate: "2023",
      credentialUrl: "https://aws.amazon.com/verification",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    issueDate: "2024",
    credentialUrl: "",
    pdfUrl: "",
  });

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPdf(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let uploadedPdfUrl = form.pdfUrl;
    if (selectedPdf) {
      uploadedPdfUrl = await uploadPortfolioAsset(selectedPdf, "certificates");
    }

    const newCert: Certification = {
      id: String(Date.now()),
      title: form.title,
      issuer: form.issuer,
      issueDate: form.issueDate,
      credentialUrl: form.credentialUrl,
      pdfUrl: uploadedPdfUrl,
    };

    setCerts([newCert, ...certs]);
    setUploading(false);
    setIsModalOpen(false);
    setForm({ title: "", issuer: "", issueDate: "2024", credentialUrl: "", pdfUrl: "" });
    setSelectedPdf(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Certifications & Licenses</h1>
          <p className="text-xs font-mono text-zinc-400">Upload PDF certificates directly to Cloudflare R2</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Certificate
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {certs.map((c) => (
          <Card key={c.id} className="space-y-3 relative group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-emerald-400">
                <Award className="h-4 w-4" />
                <span className="text-xs font-mono">{c.issuer}</span>
              </div>
              <button
                onClick={() => setCerts(certs.filter((item) => item.id !== c.id))}
                className="text-zinc-500 hover:text-red-400 p-1"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <h2 className="text-base font-semibold text-white">{c.title}</h2>
            <p className="text-xs text-zinc-400 font-mono">Issued: {c.issueDate}</p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
              {c.pdfUrl && (
                <a
                  href={c.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs font-mono text-zinc-200 hover:border-zinc-700 hover:text-white"
                >
                  <FileText className="h-3.5 w-3.5 text-red-400" />
                  View Certificate PDF
                </a>
              )}
              {c.credentialUrl && (
                <a
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-zinc-800 px-2.5 py-1 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Credential Link
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Certificate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-lg p-6 bg-zinc-950 border-zinc-800 space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-400" />
                Add Certification & PDF
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Certificate Title *</label>
                <Input
                  required
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Issuer / Organization *</label>
                  <Input
                    required
                    placeholder="e.g. Meta / Coursera"
                    value={form.issuer}
                    onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Issue Year / Date</label>
                  <Input
                    placeholder="e.g. 2024"
                    value={form.issueDate}
                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                  />
                </div>
              </div>

              {/* PDF FILE UPLOAD FIELD (Cloudflare R2) */}
              <div className="space-y-2 border border-dashed border-zinc-800 rounded-lg p-4 bg-zinc-900/40">
                <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                  <span>Certificate Document (Cloudflare R2 PDF Upload)</span>
                  {selectedPdf && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> PDF Selected
                    </span>
                  )}
                </label>

                {selectedPdf ? (
                  <div className="flex items-center justify-between p-3 rounded-md bg-zinc-900 border border-zinc-800">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-200 truncate max-w-xs">
                      <FileText className="h-4 w-4 text-red-400 shrink-0" />
                      <span className="truncate">{selectedPdf.name}</span>
                      <span className="text-zinc-500">
                        ({(selectedPdf.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPdf(null)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center py-6 cursor-pointer border border-zinc-800 rounded-md hover:bg-zinc-900 transition-colors">
                    <Upload className="h-6 w-6 text-zinc-400 mb-1" />
                    <span className="text-xs text-zinc-300 font-medium">
                      Click to upload Certificate PDF (.pdf)
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono mt-1">
                      Saved to Cloudflare R2 Storage Bucket
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handlePdfChange}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">External Verification URL</label>
                <Input
                  placeholder="https://verify.coursera.org/..."
                  value={form.credentialUrl}
                  onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={uploading}>
                  {uploading ? "Uploading to R2..." : "Save Certificate"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
