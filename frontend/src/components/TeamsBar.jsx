import React from "react";

export default function TeamsBar({ teams, unlocked, money }) {
  const nextTeam = teams.find(t => !unlocked.includes(t.name));
  const progress = nextTeam
    ? Math.min(100, (money / nextTeam.unlock) * 100)
    : 100;

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <div className="flex gap-2 mb-1">
        {teams.map(t => (
          <span
            key={t.name}
            className={`text-3xl mx-1 ${unlocked.includes(t.name) ? "" : "opacity-30 grayscale"}`}
            title={t.name}
          >
            {t.emoji}
          </span>
        ))}
      </div>
      {nextTeam && (
        <div className="w-96 bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-green-400 h-4 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {nextTeam && (
        <div className="text-sm mt-1 text-gray-700">
          {`Faltan $${(nextTeam.unlock - money).toFixed(2)} para desbloquear ${nextTeam.name}!`}
        </div>
      )}
      {!nextTeam && (
        <div className="text-sm mt-1 text-green-700 font-bold">
          ¡Todos los equipos desbloqueados!
        </div>
      )}
    </div>
  );
}