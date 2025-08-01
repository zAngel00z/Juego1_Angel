import React from "react";
import { FaBolt, FaStopwatch } from "react-icons/fa";

const upgradesList = [
  { type: "perClick", label: <><FaBolt className="inline mb-1" /> +1 por clic</>, cost: 50, value: 1 },
  { type: "perSecond", label: <><FaStopwatch className="inline mb-1" /> +1 por seg</>, cost: 200, value: 1 },
];

export default function UpgradeStore({ money, onUpgrade }) {
  return (
    <div className="mt-8 bg-white/70 rounded-lg shadow-lg p-4 flex gap-6 justify-center">
      {upgradesList.map(upg => (
        <button
          key={upg.type}
          className={`py-3 px-8 rounded-xl font-extrabold text-lg shadow-md border-2 transition-all duration-150
            ${money >= upg.cost
              ? "bg-gold/90 hover:bg-gold text-dark border-gold hover:scale-105"
              : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            }`}
          onClick={() => onUpgrade(upg.type, upg.cost, upg.value)}
          disabled={money < upg.cost}
        >
          {upg.label} (${upg.cost})
        </button>
      ))}
    </div>
  );
}