/**
 * src/lib/store/
 *
 * All Zustand stores — one file per domain slice.
 *
 * Usage:
 *   import { useCartStore, useUIStore, useAppStore } from "@/lib/store";
 */

export { useAppStore } from "./useAppStore";
export { useCartStore, type CartItem } from "./useCartStore";
export { useUIStore } from "./useUIStore";
