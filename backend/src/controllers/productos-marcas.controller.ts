import { Request, Response } from 'express';
import { db } from '../db';

export const getAllMarcas = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM productomarcas WHERE estado = "AC"');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
}

export const getMarcaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query('SELECT * FROM productomarcas WHERE idProductoMarca = ?', [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Marca no encontrada' });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la marca' });
  }
};

export const createMarca = async (req: Request, res: Response) => {
    const { nombre } = req.body;
    try {
        if (!nombre) {
            res.status(400).json({ error: 'Nombre es obligatorio' });
            return;
        }
        const [result]: any = await db.query(
            `INSERT INTO productomarcas (nombre, estado)
            VALUES (?, 'AC')`,
            [nombre]
        );
        // result.insertId tiene el id del nuevo registro

        res.status(201).json({ id: result.insertId, message: 'Marca creada' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear la marca' });
    }
};

export const updateMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, estado } = req.body;
    try {
        if (!nombre || !estado) {
            res.status(400).json({ error: 'Nombre y estado son obligatorios' });
            return;
        }
        const [result]: any = await db.query(
            `UPDATE productomarcas
            SET nombre = ?, estado = ?
            WHERE idProductoMarca = ?`,
            [nombre, estado, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Marca no encontrada' });
            return;
        }

        res.json({ message: 'Marca actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la marca' });
    }
}
export const deleteMarca = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result]: any = await db.query(
            `UPDATE productomarcas
            SET estado = 'BA'
            WHERE idProductoMarca = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Marca no encontrada' });
            return;
        }

        res.json({ message: 'Marca eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la marca' });
    }
}   