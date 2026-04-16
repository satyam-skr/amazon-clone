"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container, Button } from "@/ui";
import { useCartStore } from "@/lib/store";
import { CartItemRow } from "@/features/cart/components/CartItemRow";
import { OrderSummary } from "@/features/cart/components/OrderSummary";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const fetchCart = useCartStore((s) => s.fetchCart);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);
  const clearCart = useCartStore((s) => s.clearCart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    fetchCart()
      .catch(() => {
        if (!cancelled) {
          setError("Unable to load cart right now.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetchCart, reloadKey]);

  const handleClearCart = async () => {
    if (clearing) return;
    setClearing(true);
    try {
      await clearCart();
    } finally {
      setClearing(false);
    }
  };

  const itemCount = totalItems();
  const subtotal = totalPrice();

  if (loading) {
    return (
      <div className="bg-background py-8">
        <Container>
          <div className="rounded-sm border border-[#D5D9D9] bg-white p-8 shadow-amz-card">
            <div className="h-8 w-48 animate-pulse rounded bg-[#F0F2F2]" />
            <div className="mt-4 h-28 animate-pulse rounded bg-[#F7F7F7]" />
            <div className="mt-3 h-28 animate-pulse rounded bg-[#F7F7F7]" />
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background py-8">
        <Container>
          <div className="rounded-sm border border-[#D5D9D9] bg-white p-8 shadow-amz-card">
            <h1 className="text-2xl font-medium text-[#0F1111]">
              Couldn&apos;t load your cart.
            </h1>
            <p className="mt-2 text-sm text-[#565959]">{error}</p>
            <Button
              variant="primary"
              size="lg"
              className="mt-6"
              onClick={() => setReloadKey((k) => k + 1)}
            >
              Try Again
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-background py-8">
        <Container>
          <div className="rounded-sm border border-[#D5D9D9] bg-white p-8 shadow-amz-card">
            <h1 className="text-2xl font-medium text-[#0F1111]">
              Your Amazon Cart is empty.
            </h1>
            <p className="mt-2 text-sm text-[#565959]">
              Check your Saved for later items below or{" "}
              <Link
                href="/"
                className="text-amazon-teal hover:text-amazon-link-hover hover:underline"
              >
                continue shopping
              </Link>
              .
            </p>
            <Link href="/">
              <Button variant="primary" size="lg" className="mt-6">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-background py-4">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* ── Left: Cart Items ────────────────── */}
          <div className="min-w-0 flex-1 rounded-sm border border-[#D5D9D9] bg-white px-5 py-4 shadow-amz-card">
            <div className="flex items-center justify-between border-b border-[#D5D9D9] pb-3">
              <h1 className="text-2xl font-medium text-[#0F1111]">
                Shopping Cart
              </h1>
              <button
                onClick={handleClearCart}
                disabled={clearing}
                className="text-sm text-amazon-teal hover:text-amazon-link-hover hover:underline"
              >
                {clearing ? "Updating..." : "Deselect all items"}
              </button>
            </div>

            <p className="border-b border-[#D5D9D9] py-2 text-right text-xs text-[#565959]">
              Price
            </p>

            {/* Items */}
            {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}

            {/* Subtotal (bottom of list) */}
            <div className="flex justify-end pt-4">
              <p className="text-lg text-[#0F1111]">
                Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}):{" "}
                <span className="font-bold">₹{formatPrice(subtotal)}</span>
              </p>
            </div>
          </div>

          {/* ── Right: Order Summary ───────────── */}
          <OrderSummary itemCount={itemCount} subtotal={subtotal} />
        </div>
      </Container>
    </div>
  );
}
