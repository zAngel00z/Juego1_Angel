import React from "react";

export default function Achievements({ achievements }) {
  if (!achievements.length) return null;
  return (
    <div className="mt-10 flex flex-wrap gap-4 justify-center">
      {achievements.map((a, i) => (
        <div
          key={i}
          className="bg-gold/90 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 border-2 border-gold text-dark font-bold text-lg animate-fadeIn"
        >
          <span className="text-3xl">🏆</span>
          <span className="drop-shadow">{a}</span>
        </div>
      ))}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn { animation: fadeIn 0.7s; }
      `}</style>
    </div>
  );
}