import express from 'express';
import { db } from './db';
import cors from 'cors';
import productosRoutes from "./routes/productos.routes";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// ping para verificar la conexión a la base de datos

app.get('/ping', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Conexión exitosa', resultado: rows });
  } catch (error) {
    res.status(500).json({ error: 'Error en la base de datos', detalles: error });
  }
});



app.use("/api/productos", productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
