import React from "react";

export default function TeamsBar({ teams, unlocked, money }) {
  const nextTeam = teams.find(t => !unlocked.includes(t.name));
  const progress = nextTeam ? Math.min(100, (money / nextTeam.unlock) * 100) : 100;

  return (
    <div className="w-full flex flex-col items-center mb-6">
      <div className="flex gap-3 mb-2">
        {teams.map((t, i) => (
          <span
            key={t.name}
            className={`text-4xl mx-1 transition-all duration-700 ${unlocked.includes(t.name) ? "drop-shadow-[0_4px_8px_rgba(255,215,0,0.5)] scale-125" : "opacity-30 grayscale"}`}
            title={t.name}
          >
            {t.emoji}
          </span>
        ))}
      </div>
      {nextTeam && (
        <>
          <div className="w-96 bg-white/40 h-5 rounded-full overflow-hidden shadow">
            <div
              className="bg-pitch h-5 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-md mt-1 text-dark font-bold tracking-wide">
            Faltan ${Math.max(0, (nextTeam.unlock - money)).toFixed(2)} para desbloquear {nextTeam.name}!
          </div>
        </>
      )}
      {!nextTeam && (
        <div className="text-md mt-1 text-pitch font-bold animate-pulse">
          ¡Todos los equipos desbloqueados! 🏅
        </div>
      )}
    </div>
  );
}