import pool from './db/db.js';

try {
  const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
  console.log('Conexión OK, resultado:', rows);
  process.exit();
} catch (err) {
  console.error('❌ Error de conexión:', err);
  process.exit(1);
}
