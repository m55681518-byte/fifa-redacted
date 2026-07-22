"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

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

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-20 right-4 z-[100] flex flex-col gap-2 sm:bottom-24">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`flex w-72 items-start gap-3 rounded-lg border p-3 shadow-xl backdrop-blur-xl ${
                toast.type === "success"
                  ? "border-accent-green/30 bg-dossier-800/95"
                  : toast.type === "error"
                    ? "border-accent-red/30 bg-dossier-800/95"
                    : "border-accent-cyan/30 bg-dossier-800/95"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="h-4 w-4 flex-shrink-0 text-accent-green" />
              ) : toast.type === "error" ? (
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-accent-red" />
              ) : (
                <Info className="h-4 w-4 flex-shrink-0 text-accent-cyan" />
              )}
              <p className="flex-1 text-xs text-dossier-200">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-dossier-500 hover:text-dossier-300"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
