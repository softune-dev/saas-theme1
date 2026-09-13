"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: ToastType = "success") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 shadow-xl border transition-all animate-fade-in",
              toast.type === "success" &&
                "border-[var(--brand)] bg-[var(--brand)] text-[var(--background)]",
              toast.type === "error" &&
                "border-rose-900 bg-rose-950 text-white",
              toast.type === "info" &&
                "border-[var(--brand)] bg-[var(--brand)] text-[var(--background)]"
            )}
          >
            {toast.type === "success" && (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--background)]" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
            )}
            {toast.type === "info" && (
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--background)]" />
            )}
            <div className="flex-1 text-xs">
              <p className="font-semibold text-[var(--background)]">{toast.title}</p>
              {toast.message ? (
                <p className="mt-0.5 leading-normal text-[var(--background)]/80">
                  {toast.message}
                </p>
              ) : null}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 text-[var(--background)]/70 transition-colors hover:text-[var(--background)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
