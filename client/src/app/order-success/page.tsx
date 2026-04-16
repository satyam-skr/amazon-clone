"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container, Button } from "@/ui";
import { CheckCircle2, ChevronRight, Package, Truck } from "lucide-react";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `AMZ-${Date.now().toString().slice(-8)}`;

  return (
    <div className="bg-background py-8 text-[#0F1111]">
      <Container variant="narrow">
        {/* Amazon-style success banner */}
        <div className="mb-4 flex items-center gap-4 rounded-sm border-2 border-amazon-success bg-[#F0F8F6] p-4 text-amazon-success">
          <CheckCircle2 className="size-8 shrink-0" />
          <div>
            <h1 className="text-xl font-bold text-amazon-success">
              Order placed, thank you!
            </h1>
            <p className="text-sm font-medium">
              Confirmation will be sent to your registered contact.
            </p>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="rounded-sm border border-[#D5D9D9] bg-white p-5 shadow-amz-card">
          <div className="mb-6 flex flex-col gap-1 border-b border-[#D5D9D9] pb-4">
            <h2 className="text-lg font-bold">Order Details</h2>
            <p className="text-sm text-[#565959]">
              Order <span className="font-medium text-amazon-teal">#{orderId}</span>
            </p>
          </div>

          {/* Delivery Estimate */}
          <div className="mb-6 flex items-start gap-3">
            <Truck className="mt-0.5 size-5 shrink-0 text-[#565959]" />
            <div>
              <p className="font-bold text-[#0F1111]">
                Guaranteed delivery: Tomorrow
              </p>
              <p className="text-sm text-[#565959]">
                Your package will be delivered by Amazon Transportation Services.
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-lg bg-[#F0F2F2] p-4">
            <div className="flex items-center gap-3">
              <Package className="size-5 shrink-0 text-[#565959]" />
              <p className="text-sm">
                <strong>We're preparing your order.</strong> You can track your
                delivery in Your Orders.
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="primary" className="w-full sm:w-auto">
              Review or edit your recent orders
            </Button>
            <Link
              href="/"
              className="group flex items-center justify-center text-sm font-medium text-amazon-teal hover:text-amazon-link-hover hover:underline"
            >
              Continue shopping
              <ChevronRight className="ml-1 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="bg-background py-8">
        <Container variant="narrow">
          <div className="h-[300px] animate-pulse rounded-sm border border-[#D5D9D9] bg-white shadow-amz-card" />
        </Container>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
