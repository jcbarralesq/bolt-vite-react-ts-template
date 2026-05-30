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

export async function fetchCollection(): Promise<Set<string>> {
  const r = await fetch(`${API_URL}/api/collection`, { headers: headers() });
  if (!r.ok) return new Set();
  const data = await r.json();
  const stamps = data.stamps as Record<string, boolean>;
  return new Set(Object.keys(stamps).filter((k) => stamps[k]));
}

export async function toggleStamp(stampId: string): Promise<{ stampId: string; owned: boolean }> {
  const r = await fetch(`${API_URL}/api/collection/toggle`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stampId }),
  });
  if (!r.ok) throw new Error("Error al actualizar");
  return r.json();
}

export async function syncCollection(owned: Set<string>) {
  const r = await fetch(`${API_URL}/api/collection/sync`, {
    method: "POST", headers: headers(), body: JSON.stringify({ stamps: [...owned] }),
  });
  return r.json();
}
