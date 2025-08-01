import React, { useState, useEffect } from "react";
import CentralButton from "./components/CentralButton";
import UpgradeStore from "./components/UpgradeStore";
import StatsPanel from "./components/StatsPanel";
import TeamsBar from "./components/TeamsBar";
import Achievements from "./components/Achievements";
import ParticleMoney from "./components/ParticleMoney";
import SoundPlayer from "./components/SoundPlayer";
import LoginRegister from "./components/LoginRegister";

const API_URL = "http://localhost:4000/api/user";

function getBonusMultiplier(teams) {
  return 1 + 0.1 * teams.length;
}

const defaultUpgrades = {
  perClick: 1,
  perSecond: 0,
};

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [money, setMoney] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [upgrades, setUpgrades] = useState(defaultUpgrades);
  const [unlockedTeams, setUnlockedTeams] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [particles, setParticles] = useState([]);
  const [showLogin, setShowLogin] = useState(!token);
  const [sound, setSound] = useState({ type: null });

  // Cargar datos usuario
  useEffect(() => {
    if (!token) return;
    fetch(API_URL + "/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setMoney(Number(data.money) || 0);
        setTotalClicks(data.total_clicks || 0);
        setUpgrades({ ...defaultUpgrades, ...data.upgrades });
        setUnlockedTeams(data.unlocked_teams || []);
        setAchievements(data.achievements || []);
        setShowLogin(false);
      })
      .catch(() => {
        setShowLogin(true);
        setToken("");
        localStorage.removeItem("token");
      });
  }, [token]);

  // Auto ingresos por segundo
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      setMoney(m => Number(m) + (upgrades.perSecond || 0) * getBonusMultiplier(unlockedTeams));
    }, 1000);
    return () => clearInterval(interval);
  }, [user, upgrades, unlockedTeams]);

  // Guardar progreso en el backend
  useEffect(() => {
    if (!user) return;
    const progress = {
      money,
      total_clicks: totalClicks,
      upgrades,
      unlocked_teams: unlockedTeams,
      achievements,
    };
    const save = setTimeout(() => {
      fetch(API_URL + "/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(progress),
      });
    }, 1500);
    return () => clearTimeout(save);
  }, [money, totalClicks, upgrades, unlockedTeams, achievements, user, token]);

  // Click principal: solo partículas
  function handleClick({ x, y }) {
    if (!user) return;
    const amount = upgrades.perClick * getBonusMultiplier(unlockedTeams);
    setMoney(m => Number(m) + amount);
    setTotalClicks(c => c + 1);
    setParticles(particles => [
      ...particles,
      { x, y, id: Date.now() + Math.random() },
    ]);
    setSound({ type: "click" });
  }

  // Mejoras
  function handleUpgrade(type, cost, value) {
    if (money < cost) return;
    setMoney(m => Number(m) - cost);
    setUpgrades(u => ({ ...u, [type]: (u[type] || 0) + value }));
    setSound({ type: "upgrade" });
  }

  // Equipos
  const teams = [
    { name: "Real Madrid", unlock: 0, emoji: "⚪️", bonus: "10% más" },
    { name: "Barcelona", unlock: 200, emoji: "🔵🔴", bonus: "10% más" },
    { name: "Liverpool", unlock: 1000, emoji: "🔴", bonus: "10% más" },
    { name: "Bayern", unlock: 4000, emoji: "🔴⚪️", bonus: "10% más" },
    { name: "PSG", unlock: 10000, emoji: "🔵🔴", bonus: "10% más" },
  ];

  // Desbloqueo de equipos (sin confetti)
  useEffect(() => {
    teams.forEach(team => {
      if (
        money >= team.unlock &&
        !unlockedTeams.includes(team.name)
      ) {
        setUnlockedTeams(ut => [...ut, team.name]);
        setAchievements(a => [...a, `¡Desbloqueaste ${team.name}!`]);
        setSound({ type: "team" });
      }
    });
    // eslint-disable-next-line
  }, [money]);

  // Logros (sin confetti)
  useEffect(() => {
    if (totalClicks >= 1 && !achievements.includes("Primer click")) {
      setAchievements(a => [...a, "Primer click"]);
      setSound({ type: "achievement" });
    }
    if (money >= 10000 && !achievements.includes("Millonario")) {
      setAchievements(a => [...a, "Millonario"]);
      setSound({ type: "achievement" });
    }
    // eslint-disable-next-line
  }, [totalClicks, money]);

  // Cerrar sesión
  function handleLogout() {
    setToken("");
    localStorage.removeItem("token");
    setShowLogin(true);
  }

  if (showLogin)
    return (
      <LoginRegister
        setToken={(t) => {
          setToken(t);
          localStorage.setItem("token", t);
        }}
      />
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <SoundPlayer type={sound.type} onPlayed={() => setSound({ type: null })} />
      <div className="w-full max-w-5xl flex flex-row gap-6 mt-8">
        <StatsPanel
          money={money}
          totalClicks={totalClicks}
          upgrades={upgrades}
          onLogout={handleLogout}
          username={user?.username}
        />
        <div className="flex flex-col items-center flex-1">
          <TeamsBar
            teams={teams}
            unlocked={unlockedTeams}
            money={money}
          />
          <div className="relative mt-6">
            <CentralButton
              onClick={handleClick}
              amount={upgrades.perClick * getBonusMultiplier(unlockedTeams)}
            />
            <ParticleMoney
              particles={particles}
              onDone={id => setParticles(particles => particles.filter(p => p.id !== id))}
            />
          </div>
          <UpgradeStore
            money={money}
            upgrades={upgrades}
            onUpgrade={handleUpgrade}
          />
          <Achievements achievements={achievements} />
        </div>
      </div>
    </div>
  );
}

export default App;