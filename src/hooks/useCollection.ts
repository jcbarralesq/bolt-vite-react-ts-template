import { useState, useEffect, useCallback } from "react";
import { stamps } from "../data";
import { fetchCollection, toggleStamp, syncCollection } from "../api/client";

function loadLocalCollection(): Set<string> {
  try {
    const saved = localStorage.getItem("panini-collection");
    if (saved) return new Set(JSON.parse(saved));
  } catch {}
  return new Set();
}

export function useCollection(userId: number | null) {
  const [owned, setOwned] = useState<Set<string>>(loadLocalCollection);
  const [loaded, setLoaded] = useState(false);

  // Load from server on login
  useEffect(() => {
    if (!userId) { setLoaded(true); return; }
    fetchCollection().then((remote) => {
      if (remote.size > 0) {
        setOwned(remote);
        localStorage.setItem("panini-collection", JSON.stringify([...remote]));
      } else {
        // Seed from local to server
        const local = loadLocalCollection();
        if (local.size > 0) syncCollection(local);
        setOwned(local);
      }
      setLoaded(true);
    }).catch(() => setLoaded(true));
  }, [userId]);

  const toggle = useCallback(async (stampId: string) => {
    setOwned((prev) => {
      const next = new Set(prev);
      if (next.has(stampId)) next.delete(stampId);
      else next.add(stampId);
      localStorage.setItem("panini-collection", JSON.stringify([...next]));
      return next;
    });
    if (userId) {
      try { await toggleStamp(stampId); } catch {}
    }
  }, [userId]);

  const has = useCallback(
    (stampId: string) => owned.has(stampId),
    [owned]
  );

  const ownedCount = owned.size;
  const totalCount = stamps.length;
  const progress = totalCount ? Math.round((ownedCount / totalCount) * 100) : 0;

  const ownedByTeam = useCallback(
    (teamId: string) => stamps.filter((s) => s.teamId === teamId && owned.has(s.id)).length,
    [owned]
  );

  const totalByTeam = useCallback(
    (teamId: string) => stamps.filter((s) => s.teamId === teamId).length,
    []
  );

  const toggleTeam = useCallback(
    async (teamId: string, markOwned: boolean) => {
      const teamStamps = stamps.filter((s) => s.teamId === teamId);
      setOwned((prev) => {
        const next = new Set(prev);
        teamStamps.forEach((s) => {
          if (markOwned) next.add(s.id);
          else next.delete(s.id);
        });
        localStorage.setItem("panini-collection", JSON.stringify([...next]));
        return next;
      });
      if (userId) {
        try { await syncCollection(owned); } catch {}
      }
    },
    [userId, owned]
  );

  const reset = useCallback(async () => {
    setOwned(new Set());
    localStorage.removeItem("panini-collection");
    if (userId) {
      try { await syncCollection(new Set()); } catch {}
    }
  }, [userId]);

  return {
    owned, toggle, has, ownedCount, totalCount, progress,
    ownedByTeam, totalByTeam, toggleTeam, reset, loaded,
  };
}
