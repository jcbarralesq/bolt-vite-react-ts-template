const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function token() {
  return localStorage.getItem("panini-token");
}

function headers() {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  const t = token();
  if (t) h["Authorization"] = `Bearer ${t}`;
  return h;
}

export async function register(username: string, password: string) {
  const r = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST", headers: headers(), body: JSON.stringify({ username, password }),
  });
  if (!r.ok) {
    const e = await r.json();
    throw new Error(e.error || "Error al registrar");
  }
  return r.json();
}

export async function login(username: string, password: string) {
  const r = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST", headers: headers(), body: JSON.stringify({ username, password }),
  });
  if (!r.ok) {
    const e = await r.json();
    throw new Error(e.error || "Error al iniciar sesión");
  }
  return r.json();
}

export async function getMe() {
  const r = await fetch(`${API_URL}/api/auth/me`, { headers: headers() });
  if (!r.ok) return null;
  return r.json();
}

export type StampData = { count: number; exchanged: number; for_trade?: boolean };

export async function fetchCollection(): Promise<Record<string, StampData>> {
  const r = await fetch(`${API_URL}/api/collection`, { headers: headers() });
  if (!r.ok) return {};
  const data = await r.json();
  return data.stamps as Record<string, StampData>;
}

export async function incrementStamp(stampId: string): Promise<StampData & { stampId: string }> {
  const r = await fetch(`${API_URL}/api/collection/increment`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stampId }),
  });
  if (!r.ok) throw new Error("Error al incrementar");
  return r.json();
}

export async function decrementStamp(stampId: string): Promise<StampData & { stampId: string }> {
  const r = await fetch(`${API_URL}/api/collection/decrement`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stampId }),
  });
  if (!r.ok) throw new Error("Error al decrementar");
  return r.json();
}

export async function exchangeStamp(stampId: string): Promise<StampData & { stampId: string }> {
  const r = await fetch(`${API_URL}/api/collection/exchange`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stampId }),
  });
  if (!r.ok) throw new Error("Error al intercambiar");
  return r.json();
}

export async function fetchDuplicates(): Promise<any[]> {
  const r = await fetch(`${API_URL}/api/collection/duplicates`, { headers: headers() });
  if (!r.ok) return [];
  const data = await r.json();
  return data.duplicates;
}

export async function toggleWishlist(stampId: string): Promise<{ stampId: string; wishlisted: boolean }> {
  const r = await fetch(`${API_URL}/api/wishlist/toggle`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stampId }),
  });
  if (!r.ok) throw new Error("Error");
  return r.json();
}

export async function fetchWishlist(): Promise<Set<string>> {
  const r = await fetch(`${API_URL}/api/wishlist`, { headers: headers() });
  if (!r.ok) return new Set();
  const data = await r.json();
  return new Set(data.stamps);
}

export async function toggleForTrade(stampId: string): Promise<{ stampId: string; for_trade: boolean }> {
  const r = await fetch(`${API_URL}/api/collection/toggle-trade`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stampId }),
  });
  if (!r.ok) throw new Error("Error");
  return r.json();
}

export async function fetchPublicProfile(username: string) {
  const r = await fetch(`${API_URL}/api/public/profile/${username}`);
  if (!r.ok) return null;
  return r.json();
}

export async function getProfileVisibility(): Promise<boolean> {
  const r = await fetch(`${API_URL}/api/profile/visibility`, { headers: headers() });
  if (!r.ok) return false;
  const d = await r.json();
  return d.public_profile;
}

export async function setProfileVisibility(isPublic: boolean) {
  const r = await fetch(`${API_URL}/api/profile/visibility`, {
    method: "POST", headers: headers(), body: JSON.stringify({ public: isPublic }),
  });
  return r.json();
}

export async function syncCollection(stampIds: string[]) {
  const r = await fetch(`${API_URL}/api/collection/sync`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stamps: stampIds }),
  });
  return r.json();
}
