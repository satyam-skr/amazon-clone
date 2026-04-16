import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";
import { createOrder } from "@/api/orders";

export interface ShippingFormData {
  fullName: string;
  phone: string;
  pincode: string;
  flat: string;
  area: string;
  city: string;
  state: string;
}

const initialForm: ShippingFormData = {
  fullName: "",
  phone: "",
  pincode: "",
  flat: "",
  area: "",
  city: "",
  state: "",
};

export function useCheckout() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState<ShippingFormData>(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placed, setPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const updateForm = (field: keyof ShippingFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isFormValid =
    form.fullName.trim() !== "" &&
    form.phone.trim().length >= 10 &&
    form.pincode.trim().length === 6 &&
    form.flat.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state !== "";

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
      const order = await createOrder(form, paymentMethod);
      setPlaced(true);
      clearCart();
      router.push(`/order-success?orderId=${order.id}`);
    } catch (error) {
      console.error("Failed to place order:", error);
      setPlacingOrder(false);
    }
  };

  return {
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
  };
}
