import express from 'express';
import pool from '../db/db.js';

const router = express.Router();

// GET /api/authors
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.Id, a.Author_Name
      FROM AUTHORS_TBL a
      JOIN AUTOR_VINYLS_TBL av ON a.Id = av.Autor_Id
      ORDER BY a.Author_Name
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los autores', details: err });
  }
});

export default router;
