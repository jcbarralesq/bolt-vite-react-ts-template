import { useState, useMemo, useEffect } from "react";
import { useCollection } from "./hooks/useCollection";
import { Dashboard, StampGrid } from "./components/Dashboard";
import { teams, stamps, getStampsByTeam } from "./data";
import { register, login, getMe } from "./api/client";

type View = "dashboard" | "team";
type Filter = "all" | "owned" | "missing";

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

  const collection = useCollection(userId);
  const [view, setView] = useState<View>("dashboard");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Verify stored token is valid
    getMe().then((u) => {
      if (u) {
        setUserId(u.userId);
        setUsername(u.username);
      } else {
        localStorage.removeItem("panini-user");
        localStorage.removeItem("panini-token");
        setUserId(null);
        setUsername("");
      }
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
      setAuthUser("");
      setAuthPass("");
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("panini-user");
    localStorage.removeItem("panini-token");
    setUserId(null);
    setUsername("");
  };

  const searchedStamps = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return stamps.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        teams.find((t) => t.id === s.teamId)?.name.toLowerCase().includes(q)
    );
  }, [search]);

  const handleTeamClick = (teamId: string) => {
    setSelectedTeam(teamId);
    setView("team");
    setFilter("all");
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Cargando...</p>
      </div>
    );
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
            <button
              onClick={() => setAuthMode("login")}
              className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                authMode === "login" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setAuthMode("register")}
              className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${
                authMode === "register" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              Registro
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={authUser}
              onChange={(e) => setAuthUser(e.target.value)}
              placeholder="Usuario"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <input
              type="password"
              value={authPass}
              onChange={(e) => setAuthPass(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            />
            {authError && <p className="text-red-500 text-xs">{authError}</p>}
            <button
              onClick={handleAuth}
              className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              {authMode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
            <button
              onClick={handleLogout}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              Salir
            </button>
            <div className="hidden sm:block text-right">
              <div className="text-sm text-gray-500">Progreso</div>
              <div className="font-bold text-green-600">{collection.progress}%</div>
            </div>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${collection.progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-2 flex gap-1">
          <button
            onClick={() => setView("dashboard")}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              view === "dashboard"
                ? "bg-green-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Equipos
          </button>
          <div className="relative ml-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar jugador o equipo..."
              className="pl-8 pr-3 py-1.5 text-sm border rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {search.trim() ? (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold text-gray-800">
                Resultados: {searchedStamps?.length} estampas
              </h2>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {searchedStamps?.map((stamp) => {
                const isOwned = collection.has(stamp.id);
                const team = teams.find((t) => t.id === stamp.teamId);
                return (
                  <button
                    key={stamp.id}
                    onClick={() => collection.toggle(stamp.id)}
                    className={`relative p-3 rounded-lg border-2 text-center transition-all ${
                      isOwned
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200 bg-white opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="text-xs font-mono text-gray-500">{stamp.code}</div>
                    <div className="text-xs text-gray-400">{team?.flag}</div>
                    <div className="font-medium text-sm mt-1 truncate">{stamp.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{team?.name}</div>
                    {isOwned && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
              {searchedStamps?.length === 0 && (
                <p className="col-span-full text-center text-gray-400 py-8">
                  No se encontraron estampas
                </p>
              )}
            </div>
          </div>
        ) : view === "team" && selectedTeam ? (
          <>
            <div className="flex gap-2 mb-4">
              {(["all", "missing", "owned"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 bg-white border"
                  }`}
                >
                  {f === "all" ? "Todas" : f === "missing" ? "Faltantes" : "Obtenidas"}
                </button>
              ))}
              <div className="ml-auto text-sm text-gray-500 flex items-center gap-2">
                <button
                  onClick={() =>
                    collection.toggleTeam(
                      selectedTeam,
                      getStampsByTeam(selectedTeam).filter(
                        (s) => !collection.has(s.id)
                      ).length > 0
                    )
                  }
                  className="px-3 py-1.5 rounded text-xs font-medium bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {getStampsByTeam(selectedTeam).filter((s) => !collection.has(s.id))
                    .length > 0
                    ? "Marcar todas ✓"
                    : "Desmarcar todas ✗"}
                </button>
              </div>
            </div>
            <StampGrid
              teamId={selectedTeam}
              owned={collection.owned}
              onToggle={collection.toggle}
              filter={filter}
              onBack={() => {
                setView("dashboard");
                setSelectedTeam(null);
              }}
            />
          </>
        ) : (
          <Dashboard
            owned={collection.owned}
            ownedCount={collection.ownedCount}
            totalCount={collection.totalCount}
            progress={collection.progress}
            ownedByTeam={collection.ownedByTeam}
            totalByTeam={collection.totalByTeam}
            onTeamClick={handleTeamClick}
          />
        )}
      </main>

      <footer className="text-center py-6 text-xs text-gray-400">
        FIFA World Cup 2026 · Copa Mundial de la FIFA · {collection.ownedCount}/{collection.totalCount} estampas
      </footer>
    </div>
  );
}
