"use client";

import { useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { Shield, Upload, X } from "lucide-react";
import { useToast } from "./toast";
import { useSubmissions } from "@/lib/store";
import { CLASSIFICATIONS, type Classification } from "@/lib/dossier-utils";
import { worldCupYears } from "../../data/secrets";

interface SubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Turnstile only renders when a site key is configured. Without one the widget
 * can never issue a token, so gating submit on it would make the form
 * permanently unusable in local and preview environments.
 */
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const CAPTCHA_ENABLED = TURNSTILE_KEY.length > 0;

export function SubmissionModal({ open, onOpenChange }: SubmissionModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [year, setYear] = useState<string>("2026");
  const [classification, setClassification] = useState<Classification>("UNRESOLVED");
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { addToast } = useToast();
  const { add } = useSubmissions();

  const reset = () => {
    setTitle("");
    setDescription("");
    setMediaUrl("");
    setYear("2026");
    setClassification("UNRESOLVED");
    setToken("");
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!title.trim() || !description.trim()) return;
      if (CAPTCHA_ENABLED && !token) {
        addToast("error", "Please complete the verification challenge.");
        return;
      }

      setSubmitting(true);
      try {
        if (CAPTCHA_ENABLED) {
          const verify = await fetch("/api/verify-turnstile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          })
            .then((r) => r.json())
            .catch(() => ({ success: false }));

          if (!verify.success) {
            addToast("error", "Verification failed. Please try again.");
            setSubmitting(false);
            return;
          }
        }

        add({
          id: `USR-${year}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
          year: parseInt(year, 10),
          title: title.trim(),
          description: description.trim(),
          classification,
          mediaUrl: mediaUrl.trim(),
          createdAt: new Date().toISOString(),
        });

        // Best-effort echo to the API; the record is already stored locally.
        fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, mediaUrl, year }),
        }).catch(() => {});

        addToast("success", "Record filed. Your identity remains sealed.");
        reset();
        onOpenChange(false);
      } finally {
        setSubmitting(false);
      }
    },
    [title, description, mediaUrl, year, classification, token, add, addToast, onOpenChange]
  );

  const canSubmit =
    !submitting && title.trim().length > 0 && description.trim().length > 0 && (!CAPTCHA_ENABLED || !!token);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[120] bg-void/85 backdrop-blur-md"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 16 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong elev-3 fixed left-1/2 top-1/2 z-[121] flex max-h-[90vh] w-[min(100vw-1.5rem,34rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-line-strong"
              >
                <header className="flex items-center justify-between border-b border-line px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center border border-redline/40 bg-redline/10">
                      <Upload className="h-4 w-4 text-redline" />
                    </span>
                    <div>
                      <Dialog.Title className="font-display text-xs text-ink-max">
                        SUBMIT A RECORD
                      </Dialog.Title>
                      <Dialog.Description className="font-mono-custom text-[9px] tracking-wider text-ink-faint">
                        YOUR IDENTITY REMAINS SEALED
                      </Dialog.Description>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close"
                      className="chip border border-line p-2 text-ink-low hover:border-redline/50 hover:text-redline"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Dialog.Close>
                </header>

                <form onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
                  <Field label="TITLE">
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. The Phantom Goal"
                      maxLength={100}
                      required
                      className="input-base"
                    />
                  </Field>

                  <Field label="DESCRIPTION" hint={`${description.length}/600`}>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Set out what you know, and what remains unverified…"
                      rows={4}
                      maxLength={600}
                      required
                      className="input-base resize-none leading-relaxed"
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="TOURNAMENT">
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="input-base cursor-pointer"
                      >
                        {[...worldCupYears].reverse().map((y) => (
                          <option key={y} value={y} className="bg-surface-1">
                            {y}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="STATUS">
                      <select
                        value={classification}
                        onChange={(e) => setClassification(e.target.value as Classification)}
                        className="input-base cursor-pointer"
                      >
                        {CLASSIFICATIONS.map((c) => (
                          <option key={c} value={c} className="bg-surface-1">
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="MEDIA URL — OPTIONAL">
                    <input
                      type="url"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      placeholder="https://…"
                      className="input-base"
                    />
                  </Field>

                  {CAPTCHA_ENABLED && (
                    <div className="flex justify-center py-1">
                      <Turnstile
                        siteKey={TURNSTILE_KEY}
                        onSuccess={setToken}
                        options={{ theme: "dark", size: "flexible" }}
                      />
                    </div>
                  )}

                  <p className="font-mono-custom border border-line bg-surface-1 px-3 py-2.5 text-[10px] leading-relaxed text-ink-faint">
                    Submissions are stored locally in your browser and are visible only to
                    you. Submissions are not verified and are not published to other visitors.
                  </p>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="btn-primary font-display flex w-full items-center justify-center gap-2 py-3.5 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {submitting ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        FILING…
                      </>
                    ) : (
                      <>
                        <Shield className="h-3.5 w-3.5" />
                        FILE TO ARCHIVE
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="font-mono-custom text-[9px] font-semibold tracking-[0.2em] text-ink-faint">
          {label}
        </span>
        {hint && <span className="font-mono-custom text-[9px] text-ink-faint">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
