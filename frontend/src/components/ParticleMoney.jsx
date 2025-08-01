import React, { useEffect } from "react";

const PARTICLES = ["💵", "⚽", "💰", "⭐"];

export default function ParticleMoney({ particles, onDone }) {
  useEffect(() => {
    if (!particles.length) return;
    const timers = [];
    particles.forEach(p => {
      timers.push(
        setTimeout(() => onDone(p.id), 900)
      );
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, [particles, onDone]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {particles.map((p, idx) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: p.x - 20 + Math.random() * 30,
            top: p.y - 80 + Math.random() * 10,
            fontSize: "2.5rem",
            animation: `particle-move 0.9s cubic-bezier(.44,2,.22,.99) forwards`,
            filter: "drop-shadow(0 2px 6px #FFD700)"
          }}
          className="select-none"
        >
          {PARTICLES[idx % PARTICLES.length]}
        </span>
      ))}
      <style>{`
        @keyframes particle-move {
          0% { opacity: 1; transform: scale(1);}
          100% { opacity: 0; transform: translateY(-100px) scale(1.5);}
        }
      `}</style>
    </div>
  );
}