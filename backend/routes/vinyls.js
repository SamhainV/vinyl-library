import express from 'express';
import pool from '../db/db.js';

const router = express.Router();

// GET /api/vinyls
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT * FROM VINYLS_TBL');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los vinilos', details: err });
  }
});

// GET /api/vinyls/author-name/:name
router.get('/author-name/:name', async (req, res) => {
  const authorName = req.params.name;

  try {
    const [rows] = await pool.query(`
      SELECT DISTINCT v.* 
      FROM VINYLS_TBL v
      JOIN AUTOR_VINYLS_TBL av ON v.Id = av.Vinilo_Id
      JOIN AUTHORS_TBL a ON a.Id = av.Autor_Id
      WHERE a.Author_Name = ?
    `, [authorName]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener vinilos del autor', details: err });
  }
});

export default router;
