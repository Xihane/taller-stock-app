import { Request, Response } from "express";
import { db } from "../db";

// 1. Consultar stock disponible por producto y depósito
export const getStockDisponible = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.nombre AS producto,
        si.idProducto,
        si.idDeposito,
        SUM(CASE WHEN si.estado = 'AC' THEN si.cantidad ELSE 0 END) -
        IFNULL((
          SELECT SUM(se.cantidad) 
          FROM StockEgresado se 
          WHERE se.estado = 'AC' 
          AND se.idProducto = si.idProducto 
          AND se.idDeposito = si.idDeposito
        ), 0) AS stockDisponible
      FROM StockIngresado si
      INNER JOIN Productos p ON p.id = si.idProducto
      WHERE si.estado = 'AC'
      GROUP BY si.idProducto, si.idDeposito;
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener stock disponible", detalles: error });
  }
};

// 2. Consultar historial de movimientos por producto
export const getHistorialMovimientos = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT 
        'Ingreso' AS tipo,
        cantidad,
        fechaIngreso AS fecha,
        idDeposito,
        NULL AS idVehiculo
      FROM StockIngresado
      WHERE estado = 'AC' AND idProducto = ?
      UNION ALL
      SELECT 
        'Egreso' AS tipo,
        cantidad,
        fechaEgreso AS fecha,
        idDeposito,
        idVehiculo
      FROM StockEgresado
      WHERE estado = 'AC' AND idProducto = ?
      ORDER BY fecha DESC;
    `, [id, id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener historial", detalles: error });
  }
};
