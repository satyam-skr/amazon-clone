/**
 * Product domain types.
 */

export interface Product {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  rating: {
    average: number;
    count: number;
  };
  stock: number;
  badge?: string;
}

export type ProductCategory =
  | "electronics"
  | "fashion"
  | "home"
  | "books"
  | "beauty"
  | "sports"
  | "toys";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  electronics: "Electronics",
  fashion: "Fashion",
  home: "Home & Kitchen",
  books: "Books",
  beauty: "Beauty",
  sports: "Sports & Outdoors",
  toys: "Toys & Games",
};

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  pincode: string;
  flat: string;
  area: string;
  city: string;
  state: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  priceAtPurchase: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  subtotal: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
