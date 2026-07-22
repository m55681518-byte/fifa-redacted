"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Shield, AlertTriangle } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useToast } from "./toast";

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
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !description.trim() || !token) return;

      setSubmitting(true);

      try {
        const verifyRes = await fetch("/api/verify-turnstile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
          addToast("error", "Turnstile verification failed. Please try again.");
          setSubmitting(false);
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
          addToast("success", "Your intel has been submitted to the archives. Identity remains sealed.");
          onOpenChange(false);
          setTitle("");
          setDescription("");
          setMediaUrl("");
          setYear("");
          setToken("");
        } else {
          const err = await submitRes.json().catch(() => ({}));
          addToast("error", err?.error || "Submission failed. Try again.");
        }
      } catch {
        addToast("error", "Network error. Check your connection and try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [title, description, mediaUrl, year, token, onOpenChange, addToast]
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg rounded-none border border-zinc-800 bg-zinc-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-none border border-[#ff2e2e]/30 bg-[#ff2e2e]/10">
                  <Upload className="h-4 w-4 text-[#ff2e2e]" />
                </div>
                <div>
                  <h2 className="font-display text-sm font-bold text-zinc-100 tracking-wider">SUBMIT INTEL</h2>
                  <p className="font-mono-custom text-[9px] text-zinc-500">YOUR IDENTITY REMAINS SEALED</p>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-none p-1.5 text-zinc-500 transition-colors hover:text-zinc-300 hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block font-mono-custom text-[9px] font-semibold tracking-wider text-zinc-500">
                  TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Phantom Goal"
                  className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono-custom text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-[#ff2e2e]/50"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className="mb-1 block font-mono-custom text-[9px] font-semibold tracking-wider text-zinc-500">
                  DESCRIPTION
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the secret intel..."
                  rows={3}
                  className="w-full resize-none rounded-none border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono-custom text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-[#ff2e2e]/50"
                  required
                  maxLength={500}
                />
                <p className="mt-1 text-right font-mono-custom text-[9px] text-zinc-600">
                  {description.length}/500
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-mono-custom text-[9px] font-semibold tracking-wider text-zinc-500">
                    TOURNAMENT YEAR
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g., 2026"
                    min={1930}
                    max={2026}
                    step={4}
                    className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono-custom text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-[#ff2e2e]/50"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono-custom text-[9px] font-semibold tracking-wider text-zinc-500">
                    MEDIA URL
                  </label>
                  <input
                    type="url"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="YouTube / Image link"
                    className="w-full rounded-none border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono-custom text-xs text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-[#ff2e2e]/50"
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

              {submitting && (
                <div className="flex items-center gap-2 rounded-none border border-tactical-amber/30 bg-tactical-amber/10 px-3 py-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-tactical-amber" />
                  <span className="font-mono-custom text-[10px] text-tactical-amber">TRANSMITTING INTEL...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !token || !title.trim() || !description.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-none border border-[#ff2e2e]/30 bg-[#ff2e2e]/10 px-4 py-3 font-display text-xs font-bold text-[#ff2e2e] tracking-wider transition-all hover:bg-[#ff2e2e]/20 disabled:opacity-40"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-none border-2 border-[#ff2e2e] border-t-transparent" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    SUBMIT TO ARCHIVES
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
