import React from "react";
import { FaFutbol, FaDollarSign } from "react-icons/fa";

export default function CentralButton({ onClick, amount }) {
  return (
    <button
      className="bg-green-500 text-white rounded-full w-48 h-48 flex flex-col items-center justify-center text-6xl shadow-lg border-4 border-yellow-400 hover:scale-105 active:scale-95 transition-all"
      onClick={onClick}
      style={{
        boxShadow: "0 0 30px 10px #ffd70088, 0 0 0 8px #fff inset"
      }}
    >
      <FaFutbol className="mb-2" />
      <span className="text-3xl font-bold flex items-center justify-center">
        +{Number(amount).toFixed(2)}
        <FaDollarSign className="ml-2 text-yellow-300" />
      </span>
    </button>
  );
}