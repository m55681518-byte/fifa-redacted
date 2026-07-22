"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Shield } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

interface SubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmissionModal({ open, onOpenChange }: SubmissionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [year, setYear] = useState("");
  const [token, setToken] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !description.trim() || !token) return;

      setStatus("verifying");

      try {
        const res = await fetch("/api/verify-turnstile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const { success } = await res.json();
        if (!success) {
          setStatus("error");
          return;
        }

        const submitRes = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            mediaUrl: mediaUrl.trim() || undefined,
            year: year ? parseInt(year) : undefined,
          }),
        });

        if (submitRes.ok) {
          setStatus("success");
          setTimeout(() => {
            onOpenChange(false);
            setTitle("");
            setDescription("");
            setMediaUrl("");
            setYear("");
            setToken("");
            setStatus("idle");
          }, 1500);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    },
    [title, description, mediaUrl, year, token, onOpenChange]
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg rounded-xl border border-dossier-700 bg-dossier-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-dossier-700 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-red/30 bg-accent-red/10">
                  <Upload className="h-4 w-4 text-accent-red" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-dossier-100">Submit Classified Intel</h2>
                  <p className="text-[10px] text-dossier-500">Your identity remains sealed</p>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-md p-1.5 text-dossier-500 transition-colors hover:text-dossier-300 hover:bg-dossier-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-[10px] font-semibold tracking-wider text-dossier-500 uppercase">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Phantom Goal"
                  className="w-full rounded-md border border-dossier-700 bg-dossier-800 px-3 py-2 text-sm text-dossier-200 placeholder-dossier-600 outline-none transition-colors focus:border-accent-red/50"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-semibold tracking-wider text-dossier-500 uppercase">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the secret intel..."
                  rows={3}
                  className="w-full resize-none rounded-md border border-dossier-700 bg-dossier-800 px-3 py-2 text-sm text-dossier-200 placeholder-dossier-600 outline-none transition-colors focus:border-accent-red/50"
                  required
                  maxLength={500}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold tracking-wider text-dossier-500 uppercase">
                    Tournament Year
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g., 2026"
                    min={1930}
                    max={2026}
                    step={4}
                    className="w-full rounded-md border border-dossier-700 bg-dossier-800 px-3 py-2 text-sm text-dossier-200 placeholder-dossier-600 outline-none transition-colors focus:border-accent-red/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-semibold tracking-wider text-dossier-500 uppercase">
                    Media URL
                  </label>
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="YouTube / Image link"
                    className="w-full rounded-md border border-dossier-700 bg-dossier-800 px-3 py-2 text-sm text-dossier-200 placeholder-dossier-600 outline-none transition-colors focus:border-accent-red/50"
                  />
                </div>
              </div>

              <div className="flex justify-center py-2">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onSuccess={(t) => setToken(t)}
                  options={{
                    theme: "dark",
                    size: "flexible",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "verifying" || !token || !title.trim() || !description.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-accent-red/30 bg-accent-red/10 px-4 py-3 text-sm font-bold text-accent-red transition-all hover:bg-accent-red/20 disabled:opacity-40"
              >
                {status === "verifying" ? (
                  "Verifying..."
                ) : status === "success" ? (
                  "✓ Submitted"
                ) : status === "error" ? (
                  "Error — Try Again"
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Submit to Archives
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
