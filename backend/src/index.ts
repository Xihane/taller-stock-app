import express from 'express';
import { db } from './db';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/ping', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Conexión exitosa', resultado: rows });
  } catch (error) {
    res.status(500).json({ error: 'Error en la base de datos', detalles: error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
