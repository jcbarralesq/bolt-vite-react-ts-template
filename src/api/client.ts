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

export type StampData = { count: number; exchanged: number };

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

export async function syncCollection(stampIds: string[]) {
  // Not needed with new API - keeping for reference
  const r = await fetch(`${API_URL}/api/collection/sync`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stamps: stampIds }),
  });
  return r.json();
}
