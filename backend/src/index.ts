import express from 'express';
import { db } from './db';
import cors from 'cors';
import productosRoutes from "./routes/productos.routes";
import productosTiposRoutes from "./routes/productos-tipos.routes";
import productosMarcasRoutes from "./routes/productos-marcas.routes";
import depositosRoutes from "./routes/depositos.routes";
import vehiculosRoutes from "./routes/vehiculos.routes";
import ingresadosRoutes from "./routes/stockIngresado.routes";
import egresadosRoutes from "./routes/stockEgresado.routes";
import stockfuncRoutes from "./routes/stockFunciones.routes";

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
app.use("/api/productos-tipos", productosTiposRoutes);
app.use("/api/productos-marcas", productosMarcasRoutes);
app.use("/api/depositos", depositosRoutes);
app.use("/api/vehiculos", vehiculosRoutes);

app.use("/api/stock-ingresado", ingresadosRoutes);
app.use("/api/stock-egresado", egresadosRoutes);
app.use("/api/stock-funciones", stockfuncRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
