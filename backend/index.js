// backend/index.js
import express from 'express';
import cors from 'cors';
import pool from './db/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/vinyls', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM VINYLS_TBL');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los vinilos', details: err });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
