import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send('Football Rise API'));

const PORT = process.env.PORT || 4000;

(async () => {
  // Init DB if not exists (simple schema)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(200) NOT NULL,
      money INTEGER DEFAULT 0,
      total_clicks INTEGER DEFAULT 0,
      upgrades JSONB DEFAULT '{}',
      unlocked_teams TEXT[] DEFAULT '{}',
      achievements TEXT[] DEFAULT '{}'
    );
  `);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();