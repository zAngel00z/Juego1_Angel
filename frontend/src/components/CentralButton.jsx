import React, { useRef } from "react";
import { FaFutbol } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CentralButton({ onClick, amount }) {
  const btnRef = useRef();

  const handleClick = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      onClick({ x: centerX, y: centerY });
    }
  };

  return (
    <motion.button
      ref={btnRef}
      whileTap={{ scale: 0.88, rotate: [0, -10, 10, 0] }}
      whileHover={{ scale: 1.08, boxShadow: "0 0 80px #FFD700" }}
      className="relative bg-pitch text-gold rounded-full w-56 h-56 flex flex-col items-center justify-center text-6xl shadow-glory border-4 border-gold transition-transform duration-100 ease-out animate-glow focus:outline-none"
      onClick={handleClick}
      style={{
        boxShadow: "0 0 55px 16px #FFD700AA, 0 0 0 12px #fff6 inset"
      }}
    >
      <FaFutbol className="mb-2 drop-shadow-lg" />
      <span className="text-4xl font-bold flex items-center justify-center tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
        +{Number(amount).toFixed(2)} <span className="ml-1 text-gold text-3xl">💵</span>
      </span>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-gold rounded-full blur opacity-30" />
      <style>{`
        @keyframes glow {
          0%,100% { box-shadow: 0 0 30px 8px #FFD70088, 0 0 0 8px #fff3 inset; }
          50% { box-shadow: 0 0 60px 24px #FFD700cc, 0 0 0 14px #fff8 inset; }
        }
        .animate-glow { animation: glow 2s infinite; }
      `}</style>
    </motion.button>
  );
}