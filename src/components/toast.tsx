"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastContextValue {
  addToast: (type: Toast["type"], message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const TONE = {
  success: { border: "border-emerald/40", icon: "text-emerald", Icon: CheckCircle },
  error: { border: "border-redline/40", icon: "text-redline", Icon: AlertCircle },
  info: { border: "border-cyan/40", icon: "text-cyan", Icon: Info },
} as const;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4200);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-24 right-4 z-[130] flex flex-col gap-2"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const tone = TONE[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 60, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-strong elev-2 flex w-[19rem] items-start gap-3 border p-3.5 ${tone.border}`}
              >
                <tone.Icon className={`mt-px h-4 w-4 flex-shrink-0 ${tone.icon}`} />
                <p className="flex-1 text-[11px] leading-relaxed text-ink-high">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="flex-shrink-0 text-ink-faint transition-colors hover:text-ink-high"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
