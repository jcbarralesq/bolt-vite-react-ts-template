import { useState, useEffect, useCallback } from "react";
import { stamps } from "../data";
import { fetchCollection, incrementStamp, decrementStamp, exchangeStamp, fetchWishlist, toggleWishlist, toggleForTrade, type StampData } from "../api/client";
import { enqueue, processQueue } from "../utils/offlineQueue";

export function useCollection(userId: number | null) {
  const [owned, setOwned] = useState<Record<string, StampData>>({});
  const [loaded, setLoaded] = useState(false);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userId) { setOwned({}); setWishlist(new Set()); setLoaded(true); return; }
    Promise.all([fetchCollection(), fetchWishlist()]).then(([data, wl]) => {
      setOwned(data);
      setWishlist(wl);
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, [userId]);

  const refreshFromServer = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await fetchCollection();
      setOwned(data);
    } catch {}
  }, [userId]);

  const getCount = useCallback((stampId: string) => owned[stampId]?.count || 0, [owned]);
  const getExchanged = useCallback((stampId: string) => owned[stampId]?.exchanged || 0, [owned]);
  const has = useCallback((stampId: string) => (owned[stampId]?.count || 0) > 0, [owned]);

  const addOne = useCallback(async (stampId: string) => {
    setOwned((prev) => {
      const next = { ...prev };
      const curr = next[stampId];
      next[stampId] = { count: (curr?.count || 0) + 1, exchanged: curr?.exchanged || 0 };
      return next;
    });
    if (!userId) return;
    if (!navigator.onLine) { await enqueue(stampId, "add"); return; }
    try {
      const r = await incrementStamp(stampId);
      setOwned((prev) => ({ ...prev, [stampId]: { count: r.count, exchanged: r.exchanged } }));
    } catch { await enqueue(stampId, "add"); }
  }, [userId]);

  const removeOne = useCallback(async (stampId: string) => {
    setOwned((prev) => {
      const curr = prev[stampId];
      if (!curr || curr.count <= 1) {
        const next = { ...prev };
        delete next[stampId];
        return next;
      }
      return { ...prev, [stampId]: { count: curr.count - 1, exchanged: curr.exchanged } };
    });
    if (!userId) return;
    if (!navigator.onLine) { await enqueue(stampId, "remove"); return; }
    try {
      const r = await decrementStamp(stampId);
      setOwned((prev) => {
        if (r.count <= 0) { const next = { ...prev }; delete next[stampId]; return next; }
        return { ...prev, [stampId]: { count: r.count, exchanged: r.exchanged } };
      });
    } catch { await enqueue(stampId, "remove"); }
  }, [userId]);

  const exchange = useCallback(async (stampId: string) => {
    const curr = owned[stampId];
    if (!curr || curr.count < 1) return;
    setOwned((prev) => {
      const after = { ...prev };
      if (curr.count <= 1) delete after[stampId];
      else after[stampId] = { count: curr.count - 1, exchanged: curr.exchanged + 1 };
      return after;
    });
    if (!userId) return;
    if (!navigator.onLine) { await enqueue(stampId, "exchange"); return; }
    try {
      const r = await exchangeStamp(stampId);
      setOwned((prev) => {
        if (r.count <= 0) { const next = { ...prev }; delete next[stampId]; return next; }
        return { ...prev, [stampId]: { count: r.count, exchanged: r.exchanged } };
      });
    } catch { await enqueue(stampId, "exchange"); }
  }, [userId, owned]);

  const syncOffline = useCallback(async () => {
    if (!userId || !navigator.onLine) return;
    await processQueue({
      add: (id) => incrementStamp(id),
      remove: (id) => decrementStamp(id),
      exchange: (id) => exchangeStamp(id),
    });
    await refreshFromServer();
  }, [userId, refreshFromServer]);

  useEffect(() => {
    const goOnline = () => { syncOffline(); };
    window.addEventListener("online", goOnline);
    return () => window.removeEventListener("online", goOnline);
  }, [syncOffline]);

  const uniqueOwned = Object.keys(owned).filter(k => owned[k].count > 0).length;
  const totalCopies = Object.values(owned).reduce((sum, s) => sum + s.count, 0);
  const totalExchanged = Object.values(owned).reduce((sum, s) => sum + s.exchanged, 0);
  const progress = stamps.length ? Math.round((uniqueOwned / stamps.length) * 100) : 0;

  const ownedByTeam = useCallback(
    (teamId: string) => stamps.filter((s) => s.teamId === teamId && (owned[s.id]?.count || 0) > 0).length,
    [owned]
  );
  const totalByTeam = useCallback((teamId: string) => stamps.filter((s) => s.teamId === teamId).length, []);
  const duplicates = Object.entries(owned).filter(([, v]) => v.count > 1).map(([stampId, v]) => ({ stampId, ...v }));

  const toggleTeam = useCallback(
    async (teamId: string, markOwned: boolean) => {
      const teamStamps = stamps.filter((s) => s.teamId === teamId);
      for (const s of teamStamps) {
        if (markOwned) { if (!has(s.id)) await addOne(s.id); }
        else { while (getCount(s.id) > 0) await removeOne(s.id); }
      }
    },
    [addOne, removeOne, has, getCount]
  );

  const isWishlisted = useCallback((stampId: string) => wishlist.has(stampId), [wishlist]);
  const isForTrade = useCallback((stampId: string) => owned[stampId]?.for_trade === true, [owned]);

  const toggleWl = useCallback(async (stampId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(stampId)) next.delete(stampId);
      else next.add(stampId);
      return next;
    });
    if (userId && navigator.onLine) {
      try { await toggleWishlist(stampId); } catch {}
    }
  }, [userId]);

  const toggleFT = useCallback(async (stampId: string) => {
    setOwned((prev) => {
      const curr = prev[stampId];
      if (!curr || curr.count < 2) return prev;
      return { ...prev, [stampId]: { ...curr, for_trade: !curr.for_trade } };
    });
    if (userId && navigator.onLine) {
      try { await toggleForTrade(stampId); } catch {}
    }
  }, [userId]);

  const wishlistStamps = [...wishlist].map(id => stamps.find(s => s.id === id)).filter(Boolean) as typeof stamps;

  return {
    owned, addOne, removeOne, exchange, has, getCount, getExchanged,
    uniqueOwned, totalCopies, totalExchanged, progress, duplicates,
    ownedByTeam, totalByTeam, toggleTeam, loaded, syncOffline,
    wishlist, isWishlisted, toggleWishlist: toggleWl,
    isForTrade, toggleForTrade: toggleFT, wishlistStamps,
  };
}
