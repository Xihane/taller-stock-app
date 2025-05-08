import { Request, Response } from 'express';
import { db } from '../db';

export const getProductos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM Productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};
