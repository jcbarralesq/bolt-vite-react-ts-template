import { useState } from "react";
import { teams, stamps, getStampsByTeam } from "../data";
import type { StampData } from "../api/client";

interface Props {
  owned: Record<string, StampData>;
  uniqueOwned: number;
  totalCopies: number;
  totalExchanged: number;
  progress: number;
  duplicates: { stampId: string; count: number; exchanged: number }[];
  onAdd: (stampId: string) => void;
  onRemove: (stampId: string) => void;
  onExchange: (stampId: string) => void;
  getCount: (stampId: string) => number;
  getExchanged: (stampId: string) => number;
  ownedByTeam: (teamId: string) => number;
  totalByTeam: (teamId: string) => number;
  onTeamClick: (teamId: string) => void;
}

export function Dashboard({
  uniqueOwned, totalCopies, totalExchanged, progress, duplicates,
  ownedByTeam, totalByTeam, onTeamClick, getCount,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Progreso General</h2>
          <span className="text-3xl font-black text-green-600">{progress}%</span>
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex gap-4 mt-2 text-sm text-gray-500">
          <span>{uniqueOwned}/960 únicas</span>
          <span>{totalCopies} en total</span>
          {totalExchanged > 0 && <span className="text-orange-500">{totalExchanged} intercambiadas</span>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Equipos</h2>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {teams.map((team) => {
            const ownedT = ownedByTeam(team.id);
            const totalT = totalByTeam(team.id);
            const pct = totalT ? Math.round((ownedT / totalT) * 100) : 0;
            return (
              <button
                key={team.id}
                onClick={() => onTeamClick(team.id)}
                className={`p-3 rounded-lg border-2 text-center transition-all hover:shadow-md ${
                  pct === 100
                    ? "border-green-400 bg-green-50"
                    : pct > 0
                    ? "border-amber-300 bg-amber-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="text-2xl">{team.flag}</div>
                <div className="text-xs font-mono text-gray-400 mt-1">{team.id}</div>
                <div className="font-semibold text-sm text-gray-800 truncate">{team.name}</div>
                <div className="text-xs text-gray-500">Grupo {team.group}</div>
                <div className="mt-1">
                  <span className="text-xs font-bold text-gray-700">{ownedT}/{totalT}</span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                  <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {duplicates.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Repetidas <span className="text-sm font-normal text-gray-400">({duplicates.length})</span>
            </h2>
            <span className="text-xs text-gray-400">
              {duplicates.reduce((s, d) => s + d.count - 1, 0)} estampas extras
            </span>
          </div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {duplicates.map((d) => {
              const stamp = stamps.find((s) => s.id === d.stampId);
              if (!stamp) return null;
              return (
                <DuplicateCard
                  key={d.stampId}
                  stamp={stamp}
                  count={d.count}
                  exchanged={d.exchanged}
                  getCount={getCount}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface StampGridProps {
  teamId: string;
  owned: Record<string, StampData>;
  onAdd: (stampId: string) => void;
  onRemove: (stampId: string) => void;
  onExchange: (stampId: string) => void;
  getCount: (stampId: string) => number;
  getExchanged: (stampId: string) => number;
  isWishlisted: (stampId: string) => boolean;
  isForTrade: (stampId: string) => boolean;
  toggleWishlist: (stampId: string) => void;
  toggleForTrade: (stampId: string) => void;
  filter: "all" | "owned" | "missing" | "wishlisted";
  onBack: () => void;
}

export function StampGrid({ teamId, owned, onAdd, onRemove, onExchange, getCount, getExchanged, isWishlisted, isForTrade, toggleWishlist, toggleForTrade, filter, onBack }: StampGridProps) {
  const [selectedStamp, setSelectedStamp] = useState<string | null>(null);
  const teamStamps = getStampsByTeam(teamId);
  const filteredStamps = teamStamps.filter((s) => {
    const c = getCount(s.id);
    if (filter === "owned") return c > 0;
    if (filter === "missing") return c === 0;
    if (filter === "wishlisted") return isWishlisted(s.id);
    return true;
  });

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b flex items-center gap-3">
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-xl leading-none">←</button>
          <span className="font-mono text-gray-400 text-sm">{teamStamps[0]?.teamId}</span>
          <h2 className="text-lg font-bold text-gray-800">
            {teamStamps[0] ? `${teams.find((t) => t.id === teamId)?.flag} ${teams.find((t) => t.id === teamId)?.name}` : ""}
          </h2>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredStamps.map((stamp) => (
            <StampCard
              key={stamp.id}
              stamp={stamp}
              count={getCount(stamp.id)}
              exchanged={getExchanged(stamp.id)}
              isWishlisted={isWishlisted(stamp.id)}
              isForTrade={isForTrade(stamp.id)}
              onAdd={onAdd}
              onRemove={onRemove}
              onExchange={onExchange}
              isSelected={selectedStamp === stamp.id}
              onSelect={setSelectedStamp}
            />
          ))}
          {filteredStamps.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-8">Sin estampas que mostrar</p>
          )}
        </div>
      </div>

      {selectedStamp && (
        <div className="fixed inset-0 bg-black/30 z-20 flex items-center justify-center" onClick={() => setSelectedStamp(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-6 w-64 text-center" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const s = stamps.find((x) => x.id === selectedStamp);
              if (!s) return null;
              const c = getCount(s.id);
              const ex = getExchanged(s.id);
              return (
                <>
                  <div className="font-mono font-black text-lg text-gray-500">{s.teamId}</div>
                  <div className="font-mono font-black text-4xl text-gray-900 mb-3">{s.code.split("-")[1]}</div>
                  <div className="text-sm text-gray-600 mb-4">
                    {c > 0 ? `Tienes: ${c}` : "No la tienes"}
                    {ex > 0 && <span className="text-orange-500 ml-2">({ex} intercambiada{ex > 1 ? "s" : ""})</span>}
                  </div>
                  <div className="flex gap-2 justify-center mb-2">
                    <button
                      onClick={() => { onAdd(s.id); setSelectedStamp(null); }}
                      className="w-12 h-12 rounded-full bg-green-500 text-white text-2xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center"
                    >+</button>
                    {c > 0 && (
                      <button
                        onClick={() => { onRemove(s.id); if (c <= 1) setSelectedStamp(null); }}
                        className="w-12 h-12 rounded-full bg-red-400 text-white text-2xl font-bold hover:bg-red-500 transition-colors flex items-center justify-center"
                      >−</button>
                    )}
                  </div>
                  {c > 0 && (
                    <button
                      onClick={() => { onExchange(s.id); if (c <= 1) setSelectedStamp(null); }}
                      className="w-full py-2 rounded-lg bg-orange-100 text-orange-700 text-sm font-medium hover:bg-orange-200 transition-colors"
                    >
                      Intercambié una
                    </button>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => toggleWishlist(s.id)}
                      className={`flex-1 py-1.5 rounded text-xs font-medium ${isWishlisted(s.id) ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"}`}
                    >
                      {isWishlisted(s.id) ? "🔖 Busco" : "Agregar a Busco"}
                    </button>
                    {c > 1 && (
                      <button
                        onClick={() => toggleForTrade(s.id)}
                        className={`flex-1 py-1.5 rounded text-xs font-medium ${isForTrade(s.id) ? "bg-green-500 text-white" : "bg-green-50 text-green-600"}`}
                      >
                        {isForTrade(s.id) ? "🔄 Ofrezco" : "Ofrecer"}
                      </button>
                    )}
                  </div>
                  <button onClick={() => setSelectedStamp(null)} className="mt-3 text-xs text-gray-400">Cerrar</button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}

function StampCard({
  stamp, count, exchanged, isWishlisted, isForTrade, onAdd, onRemove, onExchange, isSelected, onSelect,
}: {
  stamp: { id: string; teamId: string; code: string };
  count: number; exchanged: number; isWishlisted: boolean; isForTrade: boolean;
  onAdd: (id: string) => void; onRemove: (id: string) => void;
  onExchange: (id: string) => void;
  isSelected: boolean; onSelect: (id: string | null) => void;
}) {
  const handleClick = () => {
    if (count > 0) onSelect(stamp.id);
    else onAdd(stamp.id);
  };

  return (
    <button onClick={handleClick} className={`relative p-3 rounded-lg border-2 text-center transition-all hover:shadow-md ${count > 0 ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
      <div className="font-mono font-black text-lg text-gray-700 leading-tight">{stamp.teamId}</div>
      <div className="font-mono font-black text-3xl text-gray-900 leading-tight">{stamp.code.split("-")[1]}</div>
      {count > 1 && <div className="absolute top-1 left-1 bg-amber-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{count}</div>}
      {isWishlisted && <div className="absolute bottom-1 left-1 text-blue-500 text-xs">🔖</div>}
      {isForTrade && <div className="absolute bottom-1 right-1 text-green-500 text-xs">🔄</div>}
      {exchanged > 0 && <div className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{exchanged}</div>}
      {count > 0 && exchanged === 0 && !isForTrade && <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><span className="text-white text-xs">✓</span></div>}
    </button>
  );
}

function DuplicateCard({
  stamp, count, exchanged, getCount,
}: {
  stamp: { id: string; teamId: string; code: string };
  count: number; exchanged: number;
  getCount: (id: string) => number;
}) {
  const c = getCount(stamp.id);
  if (c <= 1) return null;
  return (
    <div className="relative p-3 rounded-lg border-2 border-amber-300 bg-amber-50 text-center">
      <div className="font-mono font-black text-lg text-gray-700 leading-tight">{stamp.teamId}</div>
      <div className="font-mono font-black text-3xl text-gray-900 leading-tight">
        {stamp.code.split("-")[1]}
      </div>
      <div className="absolute top-1 left-1 bg-amber-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {c}
      </div>
      {exchanged > 0 && (
        <div className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {exchanged}
        </div>
      )}
    </div>
  );
}
