# Football Rise ⚽💸

¡Bienvenido a **Football Rise**!  
Juego clicker web de fútbol donde tu objetivo es minar dinero, mejorar herramientas y desbloquear equipos legendarios.

---

## 🏗️ Estructura del Proyecto

```
football-rise/
├─ backend/       # Node.js + Express + PostgreSQL
├─ frontend/      # React + TailwindCSS
```

---

## 🚀 Deploy Local

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/football-rise.git
cd football-rise
```

### 2. Configura la base de datos PostgreSQL

- Crea una base llamada `football_rise`:
  ```bash
  createdb football_rise
  ```
- (Opcional) Crea un usuario y contraseña personalizados.

### 3. Backend

```bash
cd backend
npm install
```

- Copia el archivo `.env` y edítalo si es necesario:
  ```
  PORT=4000
  JWT_SECRET=supersecret
  PGUSER=postgres
  PGPASSWORD=postgres
  PGHOST=localhost
  PGDATABASE=football_rise
  PGPORT=5432
  ```
- Inicia el servidor:
  ```bash
  npm start
  ```
- El backend debería correr en [http://localhost:4000](http://localhost:4000)

### 4. Frontend

```bash
cd ../frontend
npm install
npm start
```
- El frontend corre en [http://localhost:3000](http://localhost:3000)  
  Si usas Vite, el puerto puede variar.

---

## 🌐 Variables de entorno

- Asegúrate que las variables del backend (`.env`) coincidan con tu configuración local de PostgreSQL.
- Si el backend no está en localhost:4000, edita la URL en los componentes de frontend (`API_URL`).

---

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt.
- JWT para autenticación.
- **No uses la clave secreta por defecto en producción.**

---

## ☁️ Deploy en Producción

- Puedes desplegar el backend en servicios como Heroku, Railway, Render, etc.
- El frontend puede ir en Vercel, Netlify, o como static en tu propio servidor.
- Cambia las URLs y variables de entorno según corresponda.

---

## 🛠️ Comandos útiles

- Backend:
  - `npm install` (instalar dependencias)
  - `npm start` (iniciar servidor)
- Frontend:
  - `npm install`
  - `npm start`

---

## 📝 Créditos

- Desarrollado con ❤️, React, TailwindCSS, Node.js y PostgreSQL.

---

**¡A minar goles y dólares!**