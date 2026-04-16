/**
 * src/api/client.ts
 *
 * Central HTTP client. Configures base URL, default headers, and
 * error normalisation so every fetch in the app goes through one path.
 */

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/+$/, '');

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

function getGuestId(): string {
  if (typeof window === "undefined") return "guest_server";
  let guestId = localStorage.getItem("x-guest-id");
  if (!guestId) {
    guestId = `guest_${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
    localStorage.setItem("x-guest-id", guestId);
  }
  return guestId;
}

async function request<T>(
  endpoint: string,
  { params, ...options }: RequestOptions = {}
): Promise<T> {
  const path = `/api/v1${endpoint}`.replace(/\/+/g, '/');
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v))
    );
  }

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (!headers.has("x-guest-id")) {
    headers.set("x-guest-id", getGuestId());
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw { status: res.status, message: error.message ?? res.statusText };
  }

  return res.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: "GET", ...options }),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
  delete: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
};
