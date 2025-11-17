const db = require('../db');

async function createUser(email, passwordHash, verificationToken, role='user'){
  const res = await db.query(
    `INSERT INTO users (email, password_hash, verification_token, role) VALUES ($1,$2,$3,$4) RETURNING *`,
    [email, passwordHash, verificationToken, role]
  );
  return res.rows[0];
}

async function findByEmail(email){
  const res = await db.query(`SELECT * FROM users WHERE email=$1`, [email]);
  return res.rows[0];
}

async function findById(id){
  const res = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return res.rows[0];
}

async function findByVerificationToken(token){
  const res = await db.query(`SELECT * FROM users WHERE verification_token=$1`, [token]);
  return res.rows[0];
}

async function verifyUser(id){
  const res = await db.query(`UPDATE users SET is_verified=true, verification_token=null WHERE id=$1 RETURNING *`, [id]);
  return res.rows[0];
}

async function saveRefreshToken(id, token){
  await db.query(`UPDATE users SET refresh_token=$1 WHERE id=$2`, [token, id]);
}

module.exports = { createUser, findByEmail, findById, findByVerificationToken, verifyUser, saveRefreshToken };
