import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Example store — replace with your own state shape.
 *
 * Naming convention:  use<Domain>Store.ts
 * Pattern:            slice per domain, one file per store
 */

interface AppState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }, false, "setTheme"),
    }),
    { name: "AppStore" }
  )
);
