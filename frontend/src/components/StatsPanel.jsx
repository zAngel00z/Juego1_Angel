import React from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function StatsPanel({ money, totalClicks, upgrades, onLogout, username }) {
  return (
    <div className="bg-white/90 p-6 rounded-lg shadow-lg w-64 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg flex items-center gap-2">
          <FaUser /> {username}
        </span>
        <button onClick={onLogout} title="Cerrar sesión">
          <FaSignOutAlt className="text-red-500 text-xl" />
        </button>
      </div>
      <div>
        <span className="block text-gray-700 mb-1">💸 Dinero total</span>
        <span className="text-2xl font-bold text-green-600">
          ${Number(money).toFixed(2)}
        </span>
      </div>
      <div>
        <span className="block text-gray-700 mb-1">🖱️ Clics</span>
        <span className="text-xl font-bold">{totalClicks}</span>
      </div>
      <div>
        <span className="block text-gray-700 mb-1">Mejoras por clic</span>
        <span className="font-bold">{upgrades.perClick || 1}</span>
      </div>
      <div>
        <span className="block text-gray-700 mb-1">Mejoras por segundo</span>
        <span className="font-bold">{upgrades.perSecond || 0}</span>
      </div>
    </div>
  );
}