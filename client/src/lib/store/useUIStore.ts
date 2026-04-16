import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProductCategory } from "@/api/types";

interface UIState {
  searchQuery: string;
  selectedCategory: ProductCategory | null;
  toastMessage: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory | null) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  clearFilters: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      searchQuery: "",
      selectedCategory: null,
      toastMessage: null,

      setSearchQuery: (query) =>
        set({ searchQuery: query }, false, "setSearchQuery"),

      setSelectedCategory: (category) =>
        set({ selectedCategory: category }, false, "setSelectedCategory"),

      showToast: (message) =>
        set({ toastMessage: message }, false, "showToast"),

      clearToast: () =>
        set({ toastMessage: null }, false, "clearToast"),

      clearFilters: () =>
        set(
          { searchQuery: "", selectedCategory: null, toastMessage: null },
          false,
          "clearFilters"
        ),
    }),
    { name: "UIStore" }
  )
);
