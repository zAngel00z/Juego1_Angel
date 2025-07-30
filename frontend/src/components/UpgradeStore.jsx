import React from "react";

const upgradesList = [
  { type: "perClick", label: "⚡ +1 por clic", cost: 50, value: 1 },
  { type: "perSecond", label: "⏰ +1 por seg", cost: 200, value: 1 },
];

export default function UpgradeStore({ money, upgrades, onUpgrade }) {
  return (
    <div className="mt-8 bg-white/80 rounded-lg shadow-lg p-4 flex gap-4">
      {upgradesList.map(upg => (
        <button
          key={upg.type}
          className={`py-3 px-6 rounded-lg font-bold text-lg shadow border-2 transition-all ${
            money >= upg.cost
              ? "bg-blue-400 hover:bg-blue-500 text-white border-blue-600"
              : "bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed"
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