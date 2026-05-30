import { useState, useEffect, useCallback } from "react";
import { stamps } from "../data";
import { fetchCollection, incrementStamp, decrementStamp, exchangeStamp, type StampData } from "../api/client";

export function useCollection(userId: number | null) {
  const [owned, setOwned] = useState<Record<string, StampData>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!userId) { setOwned({}); setLoaded(true); return; }
    fetchCollection().then((data) => {
      setOwned(data);
      setLoaded(true);
    }).catch(() => setLoaded(true));
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
    if (userId) {
      try {
        const r = await incrementStamp(stampId);
        setOwned((prev) => ({ ...prev, [stampId]: { count: r.count, exchanged: r.exchanged } }));
      } catch {}
    }
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
    if (userId) {
      try {
        const r = await decrementStamp(stampId);
        setOwned((prev) => {
          if (r.count <= 0) {
            const next = { ...prev };
            delete next[stampId];
            return next;
          }
          return { ...prev, [stampId]: { count: r.count, exchanged: r.exchanged } };
        });
      } catch {}
    }
  }, [userId]);

  const exchange = useCallback(async (stampId: string) => {
    const curr = owned[stampId];
    if (!curr || curr.count < 1) return;
    setOwned((prev) => {
      const after = { ...prev };
      if (curr.count <= 1) {
        delete after[stampId];
      } else {
        after[stampId] = { count: curr.count - 1, exchanged: curr.exchanged + 1 };
      }
      return after;
    });
    if (userId) {
      try {
        const r = await exchangeStamp(stampId);
        setOwned((prev) => {
          if (r.count <= 0) {
            const next = { ...prev };
            delete next[stampId];
            return next;
          }
          return { ...prev, [stampId]: { count: r.count, exchanged: r.exchanged } };
        });
      } catch {}
    }
  }, [userId, owned]);

  const uniqueOwned = Object.keys(owned).filter(k => owned[k].count > 0).length;
  const totalCopies = Object.values(owned).reduce((sum, s) => sum + s.count, 0);
  const totalExchanged = Object.values(owned).reduce((sum, s) => sum + s.exchanged, 0);
  const progress = stamps.length ? Math.round((uniqueOwned / stamps.length) * 100) : 0;

  const ownedByTeam = useCallback(
    (teamId: string) => stamps.filter((s) => s.teamId === teamId && (owned[s.id]?.count || 0) > 0).length,
    [owned]
  );

  const totalByTeam = useCallback(
    (teamId: string) => stamps.filter((s) => s.teamId === teamId).length,
    []
  );

  const duplicates = Object.entries(owned)
    .filter(([, v]) => v.count > 1)
    .map(([stampId, v]) => ({ stampId, ...v }));

  const toggleTeam = useCallback(
    async (teamId: string, markOwned: boolean) => {
      const teamStamps = stamps.filter((s) => s.teamId === teamId);
      for (const s of teamStamps) {
        if (markOwned) {
          if (!has(s.id)) await addOne(s.id);
        } else {
          while (getCount(s.id) > 0) await removeOne(s.id);
        }
      }
    },
    [addOne, removeOne, has, getCount]
  );

  return {
    owned, addOne, removeOne, exchange, has, getCount, getExchanged,
    uniqueOwned, totalCopies, totalExchanged, progress, duplicates,
    ownedByTeam, totalByTeam, toggleTeam, loaded,
  };
}
