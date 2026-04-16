import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProductCategory } from "@/api/types";

interface UIState {
  searchQuery: string;
  selectedCategory: ProductCategory | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory | null) => void;
  clearFilters: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      searchQuery: "",
      selectedCategory: null,

      setSearchQuery: (query) =>
        set({ searchQuery: query }, false, "setSearchQuery"),

      setSelectedCategory: (category) =>
        set({ selectedCategory: category }, false, "setSelectedCategory"),

      clearFilters: () =>
        set(
          { searchQuery: "", selectedCategory: null },
          false,
          "clearFilters"
        ),
    }),
    { name: "UIStore" }
  )
);
