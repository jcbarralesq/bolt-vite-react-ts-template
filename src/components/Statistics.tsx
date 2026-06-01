import { teams, totalStamps } from "../data";

interface Props {
  uniqueOwned: number;
  totalCopies: number;
  totalExchanged: number;
  progress: number;
  ownedByTeam: (teamId: string) => number;
  totalByTeam: (teamId: string) => number;
}

const confederations = [
  { key: "UEFA", name: "Europa", color: "bg-blue-500" },
  { key: "CONMEBOL", name: "Sudamérica", color: "bg-green-500" },
  { key: "CONCACAF", name: "Norteamérica", color: "bg-red-500" },
  { key: "CAF", name: "África", color: "bg-yellow-500" },
  { key: "AFC", name: "Asia", color: "bg-purple-500" },
  { key: "OFC", name: "Oceanía", color: "bg-teal-500" },
];

const costPerPack = 20; // MXN

export function Statistics({ uniqueOwned, totalCopies, totalExchanged, progress, ownedByTeam, totalByTeam }: Props) {
  const packsRemaining = Math.ceil((totalStamps - uniqueOwned) / 5);
  const costEstimate = packsRemaining * costPerPack;
  const completedTeams = teams.filter((t) => ownedByTeam(t.id) === totalByTeam(t.id)).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-3xl font-black text-green-600">{progress}%</div>
            <div className="text-xs text-gray-500">Completado</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-3xl font-black text-gray-800">{uniqueOwned}</div>
            <div className="text-xs text-gray-500">Únicas / {totalStamps}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-3xl font-black text-amber-500">{totalCopies}</div>
            <div className="text-xs text-gray-500">Total copias</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-3xl font-black text-orange-500">{totalExchanged}</div>
            <div className="text-xs text-gray-500">Intercambiadas</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Por Confederación</h2>
        <div className="space-y-3">
          {confederations.map((conf) => {
            const confTeams = teams.filter((t) => t.confederation === conf.key);
            const totalT = confTeams.reduce((s, t) => s + totalByTeam(t.id), 0);
            const ownedT = confTeams.reduce((s, t) => s + ownedByTeam(t.id), 0);
            const pct = totalT ? Math.round((ownedT / totalT) * 100) : 0;
            return (
              <div key={conf.key}>
                <div className="flex justify-between text-sm mb-1"><span>{conf.name}</span><span className="font-bold">{ownedT}/{totalT} ({pct}%)</span></div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${conf.color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Equipos Completos: {completedTeams}/{teams.length}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {teams.map((t) => {
            const ownedT = ownedByTeam(t.id);
            const totalT = totalByTeam(t.id);
            const done = ownedT === totalT;
            return (
              <div key={t.id} className={`p-2 rounded-lg text-center text-xs border ${done ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"}`}>
                <div className="text-lg">{t.flag}</div>
                <div className="font-mono text-gray-400">{t.id}</div>
                <div className="font-bold text-gray-700">{ownedT}/{totalT}</div>
                {done && <span className="text-green-500">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Proyección</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-3xl font-black text-gray-800">{packsRemaining}</div>
            <div className="text-xs text-gray-500">Sobres estimados</div>
            <div className="text-xs text-gray-400">(5 estampas/sobre)</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-3xl font-black text-gray-800">${costEstimate} MXN</div>
            <div className="text-xs text-gray-500">Costo estimado</div>
            <div className="text-xs text-gray-400">(${costPerPack} MXN/sobre)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
