"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Button } from "@/ui";
import { useCartStore } from "@/lib/store";
import { Lock, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import { ShippingForm } from "@/features/checkout/components/ShippingForm";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);

  const {
    form,
    updateForm,
    paymentMethod,
    setPaymentMethod,
    placed,
    placingOrder,
    step,
    setStep,
    isFormValid,
    handlePlaceOrder
  } = useCheckout();

  const itemCount = totalItems();
  const subtotal = totalPrice();
  const total = subtotal;

  // ── Empty cart redirect ──────────────────────
  if (items.length === 0 && !placed) {
    return (
      <div className="bg-background py-8">
        <Container variant="narrow" className="text-center">
          <div className="rounded-sm border border-[#D5D9D9] bg-white p-8 shadow-amz-card">
            <h1 className="text-xl font-medium text-[#0F1111]">
              Your cart is empty
            </h1>
            <p className="mt-2 text-sm text-[#565959]">
              Add items to your cart before checking out.
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
      {/* Checkout header */}
      <div className="border-b border-[#D5D9D9] bg-white">
        <Container className="flex h-[50px] items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#0F1111] hover:no-underline">
            amazon<span className="text-amazon-orange">.in</span>
            <span className="ml-2 text-2xl font-normal text-[#0F1111]">
              Checkout
            </span>
          </Link>
          <Lock className="size-5 text-[#565959]" />
        </Container>
      </div>

      <Container className="py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* ── Left: Checkout Steps ──────────── */}
          <div className="min-w-0 flex-1 space-y-4">
            {/* Step indicator */}
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setStep(1)}
                className={`rounded-full px-3 py-1 font-medium ${
                  step === 1
                    ? "bg-amazon-orange text-[#0F1111]"
                    : "bg-[#F0F2F2] text-[#565959]"
                }`}
              >
                1. Shipping
              </button>
              <ChevronRight className="size-4 text-[#D5D9D9]" />
              <button
                onClick={() => isFormValid && setStep(2)}
                className={`rounded-full px-3 py-1 font-medium ${
                  step === 2
                    ? "bg-amazon-orange text-[#0F1111]"
                    : "bg-[#F0F2F2] text-[#565959]"
                }`}
              >
                2. Payment
              </button>
              <ChevronRight className="size-4 text-[#D5D9D9]" />
              <button
                onClick={() => isFormValid && setStep(3)}
                className={`rounded-full px-3 py-1 font-medium ${
                  step === 3
                    ? "bg-amazon-orange text-[#0F1111]"
                    : "bg-[#F0F2F2] text-[#565959]"
                }`}
              >
                3. Review
              </button>
            </div>

            {/* Step 1: Shipping Address */}
            {step === 1 && (
              <ShippingForm
                form={form}
                update={updateForm}
                isFormValid={isFormValid as boolean}
                onContinue={() => setStep(2)}
              />
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="rounded-sm border border-[#D5D9D9] bg-white p-5 shadow-amz-card">
                <h2 className="mb-4 text-lg font-bold text-[#0F1111]">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { value: "COD", label: "Cash on Delivery / Pay on Delivery" },
                    { value: "UPI", label: "UPI (Google Pay, PhonePe, Paytm)" },
                    { value: "CARD", label: "Credit / Debit Card" },
                    { value: "NET_BANKING", label: "Net Banking" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className="flex cursor-pointer items-center gap-3 rounded-md border border-[#D5D9D9] p-3 transition-colors hover:bg-[#F7FAFA]"
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="size-4 accent-amazon-orange"
                      />
                      <span className="text-sm text-[#0F1111]">{method.label}</span>
                    </label>
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="mt-6"
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 3: Review & Place Order */}
            {step === 3 && (
              <div className="space-y-4">
                {/* Shipping summary */}
                <div className="rounded-sm border border-[#D5D9D9] bg-white p-5 shadow-amz-card">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#0F1111]">
                      Shipping Address
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-amazon-teal hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-[#565959]">
                    {form.fullName}<br />
                    {form.flat}, {form.area}<br />
                    {form.city}, {form.state} – {form.pincode}<br />
                    Phone: {form.phone}
                  </p>
                </div>

                {/* Items review */}
                <div className="rounded-sm border border-[#D5D9D9] bg-white p-5 shadow-amz-card">
                  <h3 className="mb-3 text-sm font-bold text-[#0F1111]">
                    Review Items
                  </h3>
                  <div className="divide-y divide-[#D5D9D9]">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-[#F7F7F7]">
                          <Image
                            src={`https://placehold.co/120x120/F0F2F2/565959?text=${encodeURIComponent(item.product.title.split(" ").slice(0, 2).join("+"))}`}
                            alt={item.product.title}
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 text-sm text-[#0F1111]">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-[#565959]">Qty: {item.quantity}</p>
                        </div>
                        <p className="shrink-0 text-sm font-bold text-[#0F1111]">
                          ₹{formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place order */}
                <div className="rounded-sm border border-[#CC0C39]/30 bg-white p-5 shadow-amz-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-[#0F1111]">
                        Order Total: ₹{formatPrice(total)}
                      </p>
                      <p className="text-xs text-[#565959]">
                        Inclusive of all taxes
                      </p>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      className="rounded-lg px-8"
                      onClick={handlePlaceOrder}
                      disabled={placingOrder}
                    >
                      {placingOrder ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Order Summary ─────────── */}
          <div className="w-full shrink-0 rounded-sm border border-[#D5D9D9] bg-white p-5 shadow-amz-card lg:sticky lg:top-[110px] lg:w-[300px]">
            <Button
              variant="primary"
              className="w-full rounded-lg"
              size="lg"
              onClick={() => {
                if (step === 1 && isFormValid) setStep(2);
                else if (step === 2) setStep(3);
                else if (step === 3) handlePlaceOrder();
              }}
              disabled={step === 1 && !isFormValid}
            >
              {step === 3 ? "Place Order" : "Continue"}
            </Button>

            <hr className="my-4 border-[#D5D9D9]" />

            <h3 className="mb-3 text-base font-bold text-[#0F1111]">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#0F1111]">
                <span>Items ({itemCount}):</span>
                <span>₹{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#0F1111]">
                <span>Delivery:</span>
                <span className="text-amazon-success">FREE</span>
              </div>
            </div>

            <hr className="my-3 border-[#D5D9D9]" />

            <div className="flex justify-between text-lg font-bold text-amazon-error">
              <span>Order Total:</span>
              <span>₹{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
