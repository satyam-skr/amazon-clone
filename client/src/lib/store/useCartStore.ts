import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CartItem, Product } from "@/api/types";
import { fetchCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartItem as apiUpdateCartItem } from "@/api/cart";

interface CartState {
  items: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  devtools(
    (set, get) => ({
      items: [],

      fetchCart: async () => {
        try {
          const cart = await fetchCart();
          set({ items: cart.items }, false, "fetchCart");
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      },

      addToCart: async (product, quantity = 1) => {
        try {
          const cart = await apiAddToCart(product.id, quantity);
          set({ items: cart.items }, false, "addToCart");
        } catch (error) {
          console.error("Failed to add to cart:", error);
        }
      },

      removeFromCart: async (productId: string) => {
        try {
          const cart = await apiRemoveFromCart(productId);
          set({ items: cart.items }, false, "removeFromCart");
        } catch (error) {
          console.error("Failed to remove from cart:", error);
        }
      },

      updateQuantity: async (productId: string, quantity: number) => {
        try {
          if (quantity <= 0) {
            const cart = await apiRemoveFromCart(productId);
            set({ items: cart.items }, false, "updateQuantity");
            return;
          }
          const cart = await apiUpdateCartItem(productId, quantity);
          set({ items: cart.items }, false, "updateQuantity");
        } catch (error) {
          console.error("Failed to update quantity:", error);
        }
      },

      clearCart: () => set({ items: [] }, false, "clearCart"),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "CartStore" }
  )
);
