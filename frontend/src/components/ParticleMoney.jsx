import React, { useEffect } from "react";

export default function ParticleMoney({ particles, onDone }) {
  useEffect(() => {
    if (!particles.length) return;
    const timers = [];
    particles.forEach(p => {
      timers.push(
        setTimeout(() => onDone(p.id), 700)
      );
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, [particles, onDone]);
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map(p => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: p.x - 20,
            top: p.y - 70,
            fontSize: "2rem",
            animation: "particle 0.7s cubic-bezier(.44,2,.22,.99)"
          }}
          className="select-none"
        >
          💵
        </span>
      ))}
      <style>{`
        @keyframes particle {
          0% { opacity: 1; transform: translateY(0) scale(1);}
          100% { opacity: 0; transform: translateY(-80px) scale(1.7);}
        }
      `}</style>
    </div>
  );
}