import React, { useState } from "react";

const API_URL = "http://localhost:4000/api/user";

export default function LoginRegister({ setToken }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    fetch(API_URL + (mode === "login" ? "/login" : "/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.token) {
          setToken(data.token);
        } else {
          setError(data.error || "Error");
        }
      });
  }

  return (
    <div className="min-h-screen bg-yellow-200 flex flex-col items-center justify-center">
      <form className="bg-white p-10 rounded-lg shadow-lg flex flex-col gap-4 w-80" onSubmit={submit}>
        <h2 className="text-2xl font-bold text-center mb-2">
          Football Rise ⚽
        </h2>
        <input
          type="text"
          placeholder="Usuario"
          className="p-3 rounded border"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-3 rounded border"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-green-500 text-white rounded p-3 font-bold hover:bg-green-600 transition"
          type="submit"
        >
          {mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </button>
        <button
          type="button"
          className="text-blue-500 underline"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError("");
          }}
        >
          {mode === "login"
            ? "¿No tienes cuenta? Regístrate"
            : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
}