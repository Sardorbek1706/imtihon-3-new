const db = require('../db');

async function createProduct({ name, description, price, quantity, created_by }){
  const res = await db.query(
    `INSERT INTO products (name, description, price, quantity, created_by) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, description, price, quantity, created_by]
  );
  return res.rows[0];
}

async function getProducts(){
  const res = await db.query(`SELECT p.*, u.email as creator_email FROM products p LEFT JOIN users u ON p.created_by=u.id ORDER BY p.created_at DESC`);
  return res.rows;
}

async function getProductById(id){
  const res = await db.query(`SELECT * FROM products WHERE id=$1`, [id]);
  return res.rows[0];
}

async function updateProduct(id, fields){
  const set = [];
  const vals = [];
  let idx = 1;
  for (const key in fields){
    set.push(`${key}=$${idx}`);
    vals.push(fields[key]);
    idx++;
  }
  if (set.length===0) return getProductById(id);
  vals.push(id);
  const res = await db.query(`UPDATE products SET ${set.join(',')} WHERE id=$${idx} RETURNING *`, vals);
  return res.rows[0];
}

async function deleteProduct(id){
  await db.query(`DELETE FROM products WHERE id=$1`, [id]);
  return true;
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
