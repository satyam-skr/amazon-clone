"use client";

import { useEffect } from "react";
import { useUIStore } from "@/lib/store";

export function GlobalToast() {
  const message = useUIStore((s) => s.toastMessage);
  const clearToast = useUIStore((s) => s.clearToast);

  useEffect(() => {
    if (!message) return;

    const timeoutId = window.setTimeout(() => {
      clearToast();
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [message, clearToast]);

  if (!message) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[100] -translate-x-1/2">
      <div className="rounded-md bg-[#131921] px-4 py-2 text-sm font-medium text-white shadow-lg">
        {message}
      </div>
    </div>
  );
}
