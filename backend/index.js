import express from 'express';
import cors from 'cors';
import vinylRoutes from './routes/vinyls.js';
import authorRoutes from './routes/authors.js'; // 👈 nuevo import

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vinyls', vinylRoutes);
app.use('/api/authors', authorRoutes); // 👈 nueva ruta

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
