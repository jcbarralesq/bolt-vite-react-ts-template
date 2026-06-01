import { useState, useMemo, useEffect } from "react";
import { useCollection } from "./hooks/useCollection";
import { Dashboard, StampGrid } from "./components/Dashboard";
import { teams, stamps, getStampsByTeam } from "./data";
import { register, login, getMe } from "./api/client";
import { OfflineBanner } from "./components/OfflineBanner";
import { QuickTrade } from "./components/QuickTrade";
import { Statistics } from "./components/Statistics";
import { getProfileVisibility, setProfileVisibility } from "./api/client";

type View = "dashboard" | "team" | "duplicates" | "wishlist" | "trade" | "stats" | "missing";
type Filter = "all" | "owned" | "missing" | "wishlisted";

export default function App() {
  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem("panini-user");
    return saved ? JSON.parse(saved).userId : null;
  });
  const [username, setUsername] = useState<string>(() => {
    const saved = localStorage.getItem("panini-user");
    return saved ? JSON.parse(saved).username : "";
  });
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authUser, setAuthUser] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authError, setAuthError] = useState("");
  const [checking, setChecking] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const collection = useCollection(userId);
  const [view, setView] = useState<View>("dashboard");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getMe().then((u) => {
      if (u) {
        setUserId(u.userId); setUsername(u.username);
        getProfileVisibility().then(setPublicProfile);
      } else { localStorage.removeItem("panini-user"); localStorage.removeItem("panini-token"); setUserId(null); setUsername(""); }
      setChecking(false);
    });
  }, []);

  const handleAuth = async () => {
    setAuthError("");
    try {
      const fn = authMode === "login" ? login : register;
      const data = await fn(authUser, authPass);
      localStorage.setItem("panini-token", data.token);
      localStorage.setItem("panini-user", JSON.stringify({ userId: data.userId, username: data.username }));
      setUserId(data.userId);
      setUsername(data.username);
      setAuthUser(""); setAuthPass("");
    } catch (e: any) { setAuthError(e.message); }
  };

  const handleLogout = () => {
    localStorage.removeItem("panini-user"); localStorage.removeItem("panini-token");
    setUserId(null); setUsername("");
  };

  const searchedStamps = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return stamps.filter((s) =>
      s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) ||
      teams.find((t) => t.id === s.teamId)?.name.toLowerCase().includes(q)
    );
  }, [search]);

  const duplicateStamps = useMemo(() =>
    collection.duplicates.map((d) => stamps.find((s) => s.id === d.stampId)).filter(Boolean) as typeof stamps,
    [collection.duplicates]
  );

  if (checking) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Cargando...</p></div>;
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <img src="https://paninicollection.fifa.com/assets/microsite/logo-136aaecd5815ceb1e5d0fee48d82371f65972c1f3fae6962f8c4e6122366b64d.png" alt="FIFA World Cup 2026" className="h-16 mx-auto" />
            <h1 className="font-black text-2xl text-gray-800 mt-2">FIFA World Cup 2026</h1>
            <p className="text-sm text-gray-500">Colección de Estampas</p>
          </div>
          <div className="flex gap-1 mb-4">
            <button onClick={() => setAuthMode("login")} className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${authMode === "login" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>Iniciar Sesión</button>
            <button onClick={() => setAuthMode("register")} className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${authMode === "register" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>Registro</button>
          </div>
          <div className="space-y-3">
            <input type="text" value={authUser} onChange={(e) => setAuthUser(e.target.value)} placeholder="Usuario" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300" />
            <input type="password" value={authPass} onChange={(e) => setAuthPass(e.target.value)} placeholder="Contraseña" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300" onKeyDown={(e) => e.key === "Enter" && handleAuth()} />
            {authError && <p className="text-red-500 text-xs">{authError}</p>}
            <button onClick={handleAuth} className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">{authMode === "login" ? "Entrar" : "Crear cuenta"}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <OfflineBanner onSync={collection.syncOffline} />
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://paninicollection.fifa.com/assets/microsite/logo-136aaecd5815ceb1e5d0fee48d82371f65972c1f3fae6962f8c4e6122366b64d.png" alt="FIFA World Cup 2026" className="h-10" />
            <div>
              <h1 className="font-black text-xl text-gray-800">FIFA World Cup 2026</h1>
              <p className="text-xs text-gray-500">Copa Mundial de la FIFA</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">{username}</span>
            <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-500 transition-colors">Salir</button>
            <div className="hidden sm:block text-right">
              <div className="text-sm text-gray-500">Progreso</div>
              <div className="font-bold text-green-600">{collection.progress}%</div>
            </div>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${collection.progress}%` }} />
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-2 flex gap-1">
          <button onClick={() => setView("dashboard")} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === "dashboard" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Álbum</button>
          <button onClick={() => setView("missing")} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === "missing" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Faltantes</button>
          <button onClick={() => setView("wishlist")} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === "wishlist" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            Busco {collection.wishlist.size > 0 && `(${collection.wishlist.size})`}
          </button>
          {collection.duplicates.length > 0 && (
            <button onClick={() => setView("duplicates")} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === "duplicates" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              Repetidas ({collection.duplicates.length})
            </button>
          )}
          <button onClick={() => setView("trade")} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === "trade" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Intercambio</button>
          <button onClick={() => setView("stats")} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${view === "stats" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>Estadísticas</button>
          <button
            onClick={async () => {
              const newVal = !publicProfile;
              setPublicProfile(newVal);
              try { await setProfileVisibility(newVal); } catch {}
            }}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${publicProfile ? "bg-blue-500 text-white" : "text-gray-400 hover:bg-gray-100"}`}
            title={publicProfile ? "Perfil público activo" : "Perfil privado"}
          >
            {publicProfile ? "🌐" : "🔒"}
          </button>
          <div className="relative ml-auto">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." className="pl-8 pr-3 py-1.5 text-sm border rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-green-300" />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {search.trim() ? (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 border-b"><h2 className="text-lg font-bold text-gray-800">Resultados: {searchedStamps?.length}</h2></div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {searchedStamps?.map((stamp) => (
                <button
                  key={stamp.id}
                  onClick={() => collection.has(stamp.id) ? collection.removeOne(stamp.id) : collection.addOne(stamp.id)}
                  className={`relative p-3 rounded-lg border-2 text-center transition-all ${collection.has(stamp.id) ? "border-green-400 bg-green-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}
                >
                  <div className="font-mono font-black text-lg text-gray-700 leading-tight">{stamp.teamId}</div>
                  <div className="font-mono font-black text-3xl text-gray-900 leading-tight">{stamp.code.split("-")[1]}</div>
                  {collection.getCount(stamp.id) > 1 && (
                    <div className="absolute top-1 left-1 bg-amber-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{collection.getCount(stamp.id)}</div>
                  )}
                  {collection.has(stamp.id) && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"><span className="text-white text-xs">✓</span></div>
                  )}
                </button>
              ))}
              {searchedStamps?.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">No se encontraron estampas</p>}
            </div>
          </div>
        ) : view === "wishlist" ? (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 border-b"><h2 className="text-lg font-bold text-gray-800">Busco ({collection.wishlist.size})</h2></div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {collection.wishlistStamps.map((stamp) => {
                if (!stamp) return null;
                const c = collection.getCount(stamp.id);
                return (
                  <div key={stamp.id} className={`relative p-3 rounded-lg border-2 text-center ${c > 0 ? "border-green-400 bg-green-50" : "border-blue-300 bg-blue-50"}`}>
                    <div className="font-mono font-black text-lg text-gray-700 leading-tight">{stamp.teamId}</div>
                    <div className="font-mono font-black text-3xl text-gray-900 leading-tight">{stamp.code.split("-")[1]}</div>
                    {c > 0 ? <span className="text-xs text-green-600">Ya la tienes</span> : <span className="text-xs text-blue-600">Te falta</span>}
                    <button onClick={() => collection.toggleWishlist(stamp.id)} className="mt-1 text-xs text-red-400 hover:text-red-600">Quitar</button>
                  </div>
                );
              })}
              {collection.wishlistStamps.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">No tienes estampas en tu lista de búsqueda</p>}
            </div>
          </div>
        ) : view === "missing" ? (
          <div className="space-y-6">
            {teams.map((team) => {
              const missingStamps = getStampsByTeam(team.id).filter((s) => !collection.has(s.id));
              if (missingStamps.length === 0) return null;
              return (
                <div key={team.id} className="bg-white rounded-xl shadow-sm border">
                  <button
                    onClick={() => { setSelectedTeam(team.id); setView("team"); setFilter("missing"); }}
                    className="p-4 border-b w-full text-left hover:bg-gray-50 flex items-center gap-3"
                  >
                    <span className="text-xl">{team.flag}</span>
                    <div>
                      <span className="font-bold text-gray-800">{team.name}</span>
                      <span className="text-sm text-gray-400 ml-2">Grupo {team.group}</span>
                    </div>
                    <span className="ml-auto text-sm font-bold text-red-500">{missingStamps.length} faltantes</span>
                  </button>
                  <div className="p-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {missingStamps.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => collection.addOne(s.id)}
                        className="p-2 rounded-lg border-2 border-gray-200 bg-white text-center hover:bg-green-50 hover:border-green-300 transition-all"
                      >
                        <div className="font-mono font-bold text-xs text-gray-500">{s.teamId}</div>
                        <div className="font-mono font-black text-xl text-gray-900">{s.code.split("-")[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : view === "trade" ? (
          <QuickTrade owned={collection.owned} getCount={collection.getCount} addOne={collection.addOne} removeOne={collection.removeOne} />
        ) : view === "stats" ? (
          <Statistics uniqueOwned={collection.uniqueOwned} totalCopies={collection.totalCopies} totalExchanged={collection.totalExchanged} progress={collection.progress} ownedByTeam={collection.ownedByTeam} totalByTeam={collection.totalByTeam} />
        ) : view === "duplicates" ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Repetidas</h2>
              <span className="text-sm text-gray-400">{collection.duplicates.reduce((s, d) => s + d.count - 1, 0)} extras · {collection.duplicates.length} códigos</span>
            </div>
            {teams.map((team) => {
              const td = duplicateStamps.filter((s) => s && s.teamId === team.id);
              if (td.length === 0) return null;
              return (
                <div key={team.id} className="bg-white rounded-xl shadow-sm border">
                  <div className="p-3 border-b flex items-center gap-2 bg-amber-50"><span className="text-lg">{team.flag}</span><span className="font-bold text-sm">{team.name}</span><span className="text-xs text-amber-600 ml-auto">{td.length} repetidos</span></div>
                  <div className="p-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {td.map((stamp) => {
                      if (!stamp) return null;
                      const c = collection.getCount(stamp.id);
                      const ex = collection.getExchanged(stamp.id);
                      return (
                        <div key={stamp.id} className="relative p-2 rounded-lg border border-amber-200 bg-amber-50 text-center">
                          <div className="font-mono font-bold text-xs text-gray-500">{stamp.teamId}</div>
                          <div className="font-mono font-black text-xl text-gray-900">{stamp.code.split("-")[1]}</div>
                          <div className="absolute top-0.5 right-0.5 bg-amber-400 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{c}</div>
                          {ex > 0 && <div className="absolute top-0.5 left-0.5 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{ex}</div>}
                          <div className="flex gap-1 mt-1">
                            <button onClick={() => collection.addOne(stamp.id)} className="flex-1 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600">+1</button>
                            <button onClick={() => collection.removeOne(stamp.id)} className="flex-1 py-0.5 bg-red-400 text-white text-xs rounded hover:bg-red-500">−1</button>
                          </div>
                          <button onClick={() => collection.exchange(stamp.id)} className="w-full mt-0.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded hover:bg-orange-200">Interc</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : view === "team" && selectedTeam ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => {
                  const idx = teams.findIndex((t) => t.id === selectedTeam);
                  if (idx > 0) { setSelectedTeam(teams[idx - 1].id); setFilter("all"); }
                }}
                className="px-3 py-1.5 rounded text-sm bg-white border hover:bg-gray-50 disabled:opacity-30"
              >← Anterior</button>
              <button
                onClick={() => {
                  const idx = teams.findIndex((t) => t.id === selectedTeam);
                  if (idx < teams.length - 1) { setSelectedTeam(teams[idx + 1].id); setFilter("all"); }
                }}
                className="px-3 py-1.5 rounded text-sm bg-white border hover:bg-gray-50 disabled:opacity-30"
              >Siguiente →</button>
              <span className="text-xs text-gray-400 ml-2">
                {teams.findIndex((t) => t.id === selectedTeam) + 1} / {teams.length}
              </span>
            </div>
            <div className="flex gap-2 mb-4">
              {(["all", "missing", "owned", "wishlisted"] as Filter[]).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${filter === f ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100 bg-white border"}`}>
                  {f === "all" ? "Todas" : f === "missing" ? "Faltantes" : f === "wishlisted" ? "Busco" : "Obtenidas"}
                </button>
              ))}
              <div className="ml-auto text-sm text-gray-500 flex items-center gap-2">
                <button onClick={() => collection.toggleTeam(selectedTeam, getStampsByTeam(selectedTeam).filter((s) => !collection.has(s.id)).length > 0)} className="px-3 py-1.5 rounded text-xs font-medium bg-gray-100 hover:bg-gray-200 transition-colors">
                  {getStampsByTeam(selectedTeam).filter((s) => !collection.has(s.id)).length > 0 ? "Marcar todas ✓" : "Desmarcar todas ✗"}
                </button>
              </div>
            </div>
            <StampGrid
              teamId={selectedTeam}
              owned={collection.owned}
              onAdd={collection.addOne}
              onRemove={collection.removeOne}
              onExchange={collection.exchange}
              getCount={collection.getCount}
              getExchanged={collection.getExchanged}
              isWishlisted={collection.isWishlisted}
              isForTrade={collection.isForTrade}
              toggleWishlist={collection.toggleWishlist}
              toggleForTrade={collection.toggleForTrade}
              filter={filter}
              onBack={() => { setView("dashboard"); setSelectedTeam(null); }}
            />
          </>
        ) : (
          <Dashboard
            owned={collection.owned}
            uniqueOwned={collection.uniqueOwned}
            totalCopies={collection.totalCopies}
            totalExchanged={collection.totalExchanged}
            progress={collection.progress}
            duplicates={collection.duplicates}
            onAdd={collection.addOne}
            onRemove={collection.removeOne}
            onExchange={collection.exchange}
            getCount={collection.getCount}
            getExchanged={collection.getExchanged}
            ownedByTeam={collection.ownedByTeam}
            totalByTeam={collection.totalByTeam}
            onTeamClick={(teamId) => { setSelectedTeam(teamId); setView("team"); setFilter("all"); }}
          />
        )}
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">
        FIFA World Cup 2026 · {collection.uniqueOwned}/{stamps.length} únicas · {collection.totalCopies} copias
      </footer>
    </div>
  );
}
