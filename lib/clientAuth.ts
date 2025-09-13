export function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("alx_token", token);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("alx_token");
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("alx_token");
}

export async function apiFetch(path: string, opts: RequestInit = {}) {
  const base = process.env.NEXT_PUBLIC_API_BASE || "/api";
  const token = getToken();
  const headers = new Headers(opts.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const res = await fetch(base + path, { ...opts, headers });
  if (res.status === 401) {
    // handle unauth on client if needed
  }
  return res;
}

export async function fetchCurrentUser() {
  try {
    const res = await apiFetch("/auth/me");
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}
