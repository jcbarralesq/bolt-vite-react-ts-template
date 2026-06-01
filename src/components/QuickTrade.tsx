import { useState } from "react";
import { stamps } from "../data";
import type { StampData } from "../api/client";

interface Props {
  owned: Record<string, StampData>;
  getCount: (id: string) => number;
  addOne: (id: string) => void;
  removeOne: (id: string) => void;
}

export function QuickTrade({ owned, getCount, addOne, removeOne }: Props) {
  const [give, setGive] = useState<Set<string>>(new Set());
  const [receive, setReceive] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const duplicates = Object.entries(owned)
    .filter(([, v]) => v.count > 1)
    .map(([id]) => stamps.find((s) => s.id === id))
    .filter(Boolean) as typeof stamps;

  const missing = stamps.filter((s) => !owned[s.id] || owned[s.id]?.count === 0);

  const toggleGive = (id: string) => setGive((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleReceive = (id: string) => setReceive((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const execute = () => {
    for (const id of give) removeOne(id);
    for (const id of receive) addOne(id);
    setGive(new Set()); setReceive(new Set()); setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="space-y-4">
      {done && <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center font-medium text-sm">Intercambio completado!</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b bg-red-50"><h2 className="font-bold text-gray-800">Das ({give.size})</h2><p className="text-xs text-gray-500">Selecciona de tus repetidas</p></div>
          <div className="p-3 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
            {duplicates.map((s) => {
              if (!s) return null;
              const sel = give.has(s.id);
              return (
                <button key={s.id} onClick={() => toggleGive(s.id)}
                  className={`p-2 rounded-lg border-2 text-center text-xs transition-all ${sel ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}>
                  <div className="font-mono font-bold">{s.teamId}</div>
                  <div className="font-mono font-black text-xl">{s.code.split("-")[1]}</div>
                  <div className="text-gray-400">x{getCount(s.id)}</div>
                </button>
              );
            })}
            {duplicates.length === 0 && <p className="col-span-full text-gray-400 text-xs py-4 text-center">Sin repetidas</p>}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b bg-green-50"><h2 className="font-bold text-gray-800">Recibes ({receive.size})</h2><p className="text-xs text-gray-500">Selecciona las que te faltan</p></div>
          <div className="p-3 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
            {missing.slice(0, 100).map((s) => {
              const sel = receive.has(s.id);
              return (
                <button key={s.id} onClick={() => toggleReceive(s.id)}
                  className={`p-2 rounded-lg border-2 text-center text-xs transition-all ${sel ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}>
                  <div className="font-mono font-bold">{s.teamId}</div>
                  <div className="font-mono font-black text-xl">{s.code.split("-")[1]}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {(give.size > 0 || receive.size > 0) && (
        <div className="sticky bottom-0 bg-white border rounded-xl shadow-lg p-4 flex items-center justify-between">
          <div className="text-sm">
            <span className="text-red-600 font-bold">Das {give.size}</span>
            <span className="mx-2">↔</span>
            <span className="text-green-600 font-bold">Recibes {receive.size}</span>
          </div>
          <button onClick={execute} disabled={give.size === 0 || receive.size === 0}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold disabled:opacity-30 hover:bg-green-700 transition-colors">
            Intercambiar
          </button>
        </div>
      )}
    </div>
  );
}
