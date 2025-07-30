import pool from '../db.js';

export async function createUser(username, password_hash) {
  const result = await pool.query(
    `INSERT INTO users (username, password_hash, money, total_clicks, upgrades, unlocked_teams, achievements)
    VALUES ($1, $2, 0, 0, '{}', '{}', '{}') RETURNING *`,
    [username, password_hash]
  );
  return result.rows[0];
}

export async function findUserByUsername(username) {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
}

export async function findUserById(id) {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function updateUserProgress(id, data) {
  const { money, total_clicks, upgrades, unlocked_teams, achievements } = data;
  const result = await pool.query(
    `UPDATE users SET money=$1, total_clicks=$2, upgrades=$3, unlocked_teams=$4, achievements=$5 WHERE id=$6 RETURNING *`,
    [money, total_clicks, upgrades, unlocked_teams, achievements, id]
  );
  return result.rows[0];
}