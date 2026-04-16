type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
};

type Product = { id: string };
type ProductsPayload = { items: Product[] };
type Order = { id: string };

const baseUrl = process.env.BASE_URL ?? "http://localhost:3000/api/v1";
const guestId = process.env.GUEST_ID ?? "guest-test-user-1";

function logResult(step: string, ok: boolean, detail?: string) {
  const icon = ok ? "PASS" : "FAIL";
  const suffix = detail ? ` - ${detail}` : "";
  console.log(`[${icon}] ${step}${suffix}`);
}

async function request<T>(
  step: string,
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T> | null> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "content-type": "application/json",
        "x-guest-id": guestId,
        ...(options.headers ?? {}),
      },
    });

    const json = (await res.json()) as ApiResponse<T>;
    logResult(step, res.ok, `${res.status} ${json.message}`);
    return json;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    logResult(step, false, message);
    return null;
  }
}

async function main() {
  const productsRes = await request<ProductsPayload>("1. GET /products", "/products");
  const firstProductId = productsRes?.data?.items?.[0]?.id;

  if (!firstProductId) {
    logResult("2. GET /products/:id", false, "No product ID available");
    logResult("3. POST /cart/add", false, "No product ID available");
    logResult("5. PATCH /cart/update", false, "No product ID available");
    logResult("6. DELETE /cart/remove", false, "No product ID available");
    logResult("7. POST /orders", false, "Skipped due to previous failures");
    logResult("8. GET /orders/:id", false, "Skipped due to previous failures");
    return;
  }

  await request<Product>("2. GET /products/:id", `/products/${firstProductId}`);

  await request("3. POST /cart/add", "/cart/add", {
    method: "POST",
    body: JSON.stringify({
      productId: firstProductId,
      quantity: 1,
    }),
  });

  await request("4. GET /cart", "/cart");

  await request("5. PATCH /cart/update", "/cart/update", {
    method: "PATCH",
    body: JSON.stringify({
      productId: firstProductId,
      quantity: 2,
    }),
  });

  await request("6. DELETE /cart/remove", "/cart/remove", {
    method: "DELETE",
    body: JSON.stringify({
      productId: firstProductId,
    }),
  });

  await request("3b. POST /cart/add (for order)", "/cart/add", {
    method: "POST",
    body: JSON.stringify({
      productId: firstProductId,
      quantity: 1,
    }),
  });

  const orderRes = await request<Order>("7. POST /orders", "/orders", {
    method: "POST",
    body: JSON.stringify({
      paymentMethod: "COD",
    }),
  });

  const orderId = orderRes?.data?.id;
  if (!orderId) {
    logResult("8. GET /orders/:id", false, "No order ID returned");
    return;
  }

  await request("8. GET /orders/:id", `/orders/${orderId}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`[FAIL] test runner crashed - ${message}`);
  process.exit(1);
});
