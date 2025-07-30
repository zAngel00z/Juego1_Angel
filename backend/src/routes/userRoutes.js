import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername, updateUserProgress, findUserById } from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Usuario y contraseña requeridos' });

  const existing = await findUserByUsername(username);
  if (existing) return res.status(409).json({ error: 'Usuario ya existe' });

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser(username, hash);
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, username: user.username } });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, username: user.username } });
});

// Obtener progreso
router.get('/me', authenticateToken, async (req, res) => {
  const user = await findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'No encontrado' });
  res.json({
    id: user.id,
    username: user.username,
    money: user.money,
    total_clicks: user.total_clicks,
    upgrades: user.upgrades,
    unlocked_teams: user.unlocked_teams,
    achievements: user.achievements
  });
});

// Guardar progreso
router.post('/progress', authenticateToken, async (req, res) => {
  const progress = req.body;
  const updated = await updateUserProgress(req.user.id, progress);
  res.json({ success: true, user: updated });
});

export default router;