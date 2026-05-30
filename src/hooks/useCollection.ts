import { useState, useEffect, useCallback } from "react";
import { stamps } from "../data";

function loadCollection(): Set<string> {
  try {
    const saved = localStorage.getItem("panini-collection");
    if (saved) return new Set(JSON.parse(saved));
  } catch {}
  return new Set();
}

function saveCollection(collection: Set<string>) {
  localStorage.setItem("panini-collection", JSON.stringify([...collection]));
}

export function useCollection() {
  const [owned, setOwned] = useState<Set<string>>(loadCollection);

  useEffect(() => {
    saveCollection(owned);
  }, [owned]);

  const toggle = useCallback((stampId: string) => {
    setOwned((prev) => {
      const next = new Set(prev);
      if (next.has(stampId)) next.delete(stampId);
      else next.add(stampId);
      return next;
    });
  }, []);

  const has = useCallback(
    (stampId: string) => owned.has(stampId),
    [owned]
  );

  const ownedCount = owned.size;
  const totalCount = stamps.length;
  const progress = totalCount ? Math.round((ownedCount / totalCount) * 100) : 0;

  const ownedByTeam = useCallback(
    (teamId: string) => {
      return stamps.filter((s) => s.teamId === teamId && owned.has(s.id)).length;
    },
    [owned]
  );

  const totalByTeam = useCallback(
    (teamId: string) => stamps.filter((s) => s.teamId === teamId).length,
    []
  );

  const toggleTeam = useCallback(
    (teamId: string, owned: boolean) => {
      const teamStamps = stamps.filter((s) => s.teamId === teamId);
      setOwned((prev) => {
        const next = new Set(prev);
        teamStamps.forEach((s) => {
          if (owned) next.add(s.id);
          else next.delete(s.id);
        });
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setOwned(new Set());
  }, []);

  return {
    owned,
    toggle,
    has,
    ownedCount,
    totalCount,
    progress,
    ownedByTeam,
    totalByTeam,
    toggleTeam,
    reset,
  };
}
