import { Request, Response } from "express";
import { db } from "../db";

export const getAllTiposProductos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM ProductosTipos WHERE estado = 'AC'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tipos de productos", detalles: error });
  }
};

export const getTipoProductoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query("SELECT * FROM ProductosTipos WHERE idProductoTipo = ?", [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: "Tipo de producto no encontrado" });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el tipo de producto", detalles: error });
  }
}

export const createTipoProducto = async (req: Request, res: Response) => {
  const {descripcion} = req.body;
  try {
      if (!descripcion) {
      res.status(400).json({ error: "descripción obligatoria" });
        return;
    }
    const [result]: any = await db.query(
      `INSERT INTO ProductosTipos (descripcion, estado)
       VALUES (?, 'AC')`,
      [descripcion]
    );
    // result.insertId tiene el id del nuevo registro

    res.status(201).json({ id: result.insertId, message: "Tipo de producto creado" });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el tipo de producto", detalles: error });
  }
};

export const updateTipoProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { descripcion, estado } = req.body;
  try {
    if ( !descripcion || !estado) {
      res.status(400).json({ error: "descripción y estado son obligatorios" });
      return;
    }
    const [result]: any = await db.query(
      `UPDATE ProductosTipos
        SET descripcion = ?, estado = ?
       WHERE idProductoTipo = ?`,
      [descripcion, estado, id]
    );


    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Tipo de producto no encontrado para actualizar" });
      return;
    }
    res.json({ message: "Tipo de producto actualizado" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tipo de producto", detalles: error });
  }
}

export const deleteTipoProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result]: any = await db.query(
      `UPDATE ProductosTipos
        SET estado = 'BA'
       WHERE idProductoTipo = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Tipo de producto no encontrado para eliminar" });
      return;
    }
    res.json({ message: "Tipo de producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tipo de producto", detalles: error });
  }
}


