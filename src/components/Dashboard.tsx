import { teams, stamps, getStampsByTeam } from "../data";

interface Props {
  owned: Set<string>;
  ownedCount: number;
  totalCount: number;
  progress: number;
  ownedByTeam: (teamId: string) => number;
  totalByTeam: (teamId: string) => number;
  onTeamClick: (teamId: string) => void;
}

export function Dashboard({ owned, ownedCount, totalCount, progress, ownedByTeam, totalByTeam, onTeamClick }: Props) {
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
        <p className="text-sm text-gray-500 mt-2">
          {ownedCount} de {totalCount} estampas coleccionadas
        </p>
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
                <div className="font-semibold text-sm text-gray-800 truncate">
                  {team.name}
                </div>
                <div className="text-xs text-gray-500">Grupo {team.group}</div>
                <div className="mt-1">
                  <span className="text-xs font-bold text-gray-700">
                    {ownedT}/{totalT}
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface StampGridProps {
  teamId: string;
  owned: Set<string>;
  onToggle: (stampId: string) => void;
  filter: "all" | "owned" | "missing";
  onBack: () => void;
}

export function StampGrid({ teamId, owned, onToggle, filter, onBack }: StampGridProps) {
  const teamStamps = getStampsByTeam(teamId);
  const filteredStamps = teamStamps.filter((s) => {
    if (filter === "owned") return owned.has(s.id);
    if (filter === "missing") return !owned.has(s.id);
    return true;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-4 border-b flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-xl leading-none">
          ←
        </button>
        <h2 className="text-lg font-bold text-gray-800">
          <span className="font-mono text-gray-400 mr-1">{teamStamps[0]?.teamId}</span>
          {teamStamps[0] ? `${teams.find((t) => t.id === teamId)?.flag} ${teams.find((t) => t.id === teamId)?.name}` : ""}
        </h2>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredStamps.map((stamp) => {
          const isOwned = owned.has(stamp.id);
          return (
            <button
              key={stamp.id}
              onClick={() => onToggle(stamp.id)}
              className={`relative p-3 rounded-lg border-2 text-center transition-all hover:shadow-md ${
                isOwned
                  ? "border-green-400 bg-green-50 scale-95"
                  : "border-gray-200 bg-white opacity-60 hover:opacity-100"
              } ${stamp.rarity === "legendary" && !isOwned ? "ring-2 ring-yellow-300" : ""}`}
            >
              <div className="text-xs font-mono text-gray-500">{stamp.code}</div>
              <div className="w-12 h-12 mx-auto my-2 rounded-full bg-gray-100 flex items-center justify-center">
                {isOwned ? (
                  <span className="text-green-500 text-xl">✓</span>
                ) : (
                  <span className="text-gray-300 text-xl">?</span>
                )}
              </div>
              <div className="font-medium text-sm text-gray-800 truncate">{stamp.name}</div>
              <div className="text-xs mt-1">
                {stamp.rarity === "legendary" && <span className="text-yellow-600 font-bold">⭐ Leyenda</span>}
                {stamp.rarity === "rare" && <span className="text-purple-600 font-semibold">◆ Rara</span>}
                {stamp.rarity === "common" && <span className="text-gray-400">Común</span>}
              </div>
              {isOwned && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          );
        })}
        {filteredStamps.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-8">Sin estampas que mostrar</p>
        )}
      </div>
    </div>
  );
}
