import React from "react";
import { FaUser, FaSignOutAlt, FaMoneyBillWave } from "react-icons/fa";

export default function StatsPanel({ money, totalClicks, upgrades, onLogout, username }) {
  return (
    <div className="backdrop-blur-md bg-glass border border-white/30 shadow-glass rounded-xl px-8 py-7 w-72 flex flex-col gap-7">
      <div className="flex justify-between items-center mb-1">
        <span className="font-extrabold text-xl flex items-center gap-3 text-dark">
          <FaUser className="text-gold" /> {username}
        </span>
        <button onClick={onLogout} title="Cerrar sesión">
          <FaSignOutAlt className="text-red-500 text-2xl hover:scale-125 transition" />
        </button>
      </div>
      <div>
        <span className="block text-dark font-medium mb-1">💸 Dinero total</span>
        <span className="text-3xl font-extrabold text-pitch flex items-center gap-2">
          <FaMoneyBillWave className="text-gold" /> ${Number(money).toFixed(2)}
        </span>
      </div>
      <div>
        <span className="block text-dark font-medium mb-1">🖱️ Clics</span>
        <span className="text-xl font-extrabold">{totalClicks}</span>
      </div>
      <div>
        <span className="block text-dark font-medium mb-1">⚡ Mejoras por clic</span>
        <span className="font-bold">{upgrades.perClick || 1}</span>
      </div>
      <div>
        <span className="block text-dark font-medium mb-1">⏰ Mejoras por segundo</span>
        <span className="font-bold">{upgrades.perSecond || 0}</span>
      </div>
    </div>
  );
}