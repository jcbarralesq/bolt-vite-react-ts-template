import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPublicProfile } from "../api/client";

type ProfileData = {
  username: string; progress: number; uniqueOwned: number; totalStamps: number;
  teams: { id: string; name: string; flag: string; owned: number; total: number }[];
  duplicatesForTrade: { stampId: string; count: number }[];
  wishlist: string[];
};

export function PublicProfile() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!username) return;
    fetchPublicProfile(username).then((data) => {
      if (data) setProfile(data);
      else setError(true);
    }).catch(() => setError(true));
  }, [username]);

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-400 text-lg">Perfil no encontrado o privado</p>
        <Link to="/" className="text-green-600 text-sm mt-2 inline-block">Volver</Link>
      </div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Cargando...</p></div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://paninicollection.fifa.com/assets/microsite/logo-136aaecd5815ceb1e5d0fee48d82371f65972c1f3fae6962f8c4e6122366b64d.png" alt="FIFA" className="h-8" />
            <div><h1 className="font-black text-lg text-gray-800">@{profile.username}</h1><p className="text-xs text-gray-500">Colección Panini 2026</p></div>
          </div>
          <Link to="/" className="text-sm text-green-600 hover:text-green-700">Mi colección →</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Progreso</h2>
            <span className="text-3xl font-black text-green-600">{profile.progress}%</span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: `${profile.progress}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{profile.uniqueOwned} de {profile.totalStamps} estampas únicas</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b"><h2 className="text-lg font-bold text-gray-800">Equipos</h2></div>
          <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {profile.teams.map((t) => {
              const pct = t.total ? Math.round((t.owned / t.total) * 100) : 0;
              return (
                <div key={t.id} className={`p-2 rounded-lg text-center text-xs border ${pct === 100 ? "border-green-400 bg-green-50" : pct > 0 ? "border-amber-200" : "border-gray-200"}`}>
                  <div className="font-mono text-gray-400">{t.id}</div>
                  <div className="font-bold text-gray-700">{t.owned}/{t.total}</div>
                  <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {profile.duplicatesForTrade.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 border-b"><h2 className="text-lg font-bold text-gray-800">Ofrece para intercambiar ({profile.duplicatesForTrade.length})</h2></div>
            <div className="p-4 flex flex-wrap gap-2">
              {profile.duplicatesForTrade.map((d) => {
                const team = d.stampId.split("-")[0];
                const num = d.stampId.split("-").slice(1).join("-");
                return (
                  <div key={d.stampId} className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-center">
                    <div className="font-mono font-bold text-xs text-gray-700">{team}</div>
                    <div className="font-mono font-black text-lg text-gray-900">{num}</div>
                    <div className="text-xs text-gray-400">x{d.count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {profile.wishlist.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 border-b"><h2 className="text-lg font-bold text-gray-800">Busca ({profile.wishlist.length})</h2></div>
            <div className="p-4 flex flex-wrap gap-2">
              {profile.wishlist.map((id) => {
                const team = id.split("-")[0];
                const num = id.split("-").slice(1).join("-");
                return (
                  <div key={id} className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <div className="font-mono font-bold text-xs text-gray-700">{team}</div>
                    <div className="font-mono font-black text-lg text-gray-900">{num}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
