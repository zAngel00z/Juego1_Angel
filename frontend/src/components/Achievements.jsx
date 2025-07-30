import React from "react";

export default function Achievements({ achievements }) {
  if (!achievements.length) return null;
  return (
    <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow w-96">
      <div className="font-bold text-yellow-700 mb-2">🏆 Logros</div>
      <ul className="list-disc pl-6">
        {achievements.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}