import { useEffect, useState } from "react";
import { getQueueLength } from "../utils/offlineQueue";

export function OfflineBanner({ onSync }: { onSync: () => void }) {
  const [offline, setOffline] = useState(!navigator.onLine);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => {
      setOffline(false);
      onSync();
    };
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, [onSync]);

  useEffect(() => {
    if (offline) {
      const interval = setInterval(async () => {
        setPending(await getQueueLength());
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setPending(0);
    }
  }, [offline]);

  if (!offline && pending === 0) return null;

  return (
    <div className={`text-center text-xs py-1.5 font-medium ${offline ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
      {offline
        ? `Sin conexión — ${pending > 0 ? `${pending} cambios pendientes` : "los cambios se guardarán al reconectar"}`
        : "Sincronizando..."}
    </div>
  );
}
