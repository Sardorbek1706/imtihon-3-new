const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

async function run(){
  const sql = fs.readFileSync(path.join(__dirname,'../migrations/init.sql'),'utf8');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try{
    await pool.query(sql);
    console.log('Migrations ran successfully');
  }catch(e){
    console.error('Migration error', e.message);
  }finally{
    await pool.end();
  }
}

run();
