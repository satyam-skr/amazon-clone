import { Input } from "@/ui/components/input";
import { Button } from "@/ui";
import { ShippingFormData } from "../hooks/useCheckout";

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

interface ShippingFormProps {
  form: ShippingFormData;
  update: (field: keyof ShippingFormData, value: string) => void;
  isFormValid: boolean;
  onContinue: () => void;
}

export function ShippingForm({ form, update, isFormValid, onContinue }: ShippingFormProps) {
  return (
    <div className="rounded-sm border border-[#D5D9D9] bg-white p-5 shadow-amz-card">
      <h2 className="mb-4 text-lg font-bold text-[#0F1111]">
        Delivery Address
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-[#0F1111]">
            Full Name
          </label>
          <Input
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0F1111]">
            Mobile Number
          </label>
          <Input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="10-digit mobile number"
            type="tel"
            maxLength={10}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0F1111]">
            Pincode
          </label>
          <Input
            value={form.pincode}
            onChange={(e) => update("pincode", e.target.value)}
            placeholder="6-digit pincode"
            maxLength={6}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-[#0F1111]">
            Flat, House no., Building, Apartment
          </label>
          <Input
            value={form.flat}
            onChange={(e) => update("flat", e.target.value)}
            placeholder="Flat / House no."
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-[#0F1111]">
            Area, Street, Village
          </label>
          <Input
            value={form.area}
            onChange={(e) => update("area", e.target.value)}
            placeholder="Area / Street"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0F1111]">
            City / Town
          </label>
          <Input
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="City"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0F1111]">
            State
          </label>
          <select
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            className="flex h-[31px] w-full rounded-md border border-[#A6A6A6] bg-white px-2 text-[13px] text-[#0F1111] shadow-[0_1px_2px_rgba(15,17,17,.15)_inset] focus:border-amazon-orange focus:outline-none focus:ring-[3px] focus:ring-amazon-orange/30"
          >
            <option value="">Select State</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        className="mt-6"
        onClick={onContinue}
        disabled={!isFormValid}
      >
        Deliver to this address
      </Button>
    </div>
  );
}
