import { Request, Response } from "express";
import { db } from "../db";

export const getAllIngresos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM StockIngresado WHERE estado = 'AC'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ingresos", detalles: error });
  }
};

export const getStockIngresoById = async (req: Request, res: Response) => {
  const { id } = req.params;
    try {
        const [rows]: any = await db.query("SELECT * FROM StockIngresado WHERE idStockIngresado = ?", [id]);
    
        if (rows.length === 0) {
         res.status(404).json({ error: "Ingreso no encontrado" });
         return;
        }
    
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el ingreso", detalles: error });
    }
};

export const createIngreso = async (req: Request, res: Response) => {
  const { idProducto, cantidad, idDeposito, fechaIngreso} = req.body;

  if (!idProducto || !cantidad || !idDeposito || !fechaIngreso ) {
    res.status(400).json({ error: "Todos los campos son obligatorios" });
    return;
  }

  if (cantidad <= 0) {
    res.status(400).json({ error: "La cantidad debe ser mayor a cero" });
    return;
  }

  const hoy = new Date();
  const fecha = new Date(fechaIngreso);
  if (fecha > hoy) {
    res.status(400).json({ error: "No se puede registrar un ingreso con fecha futura" });
    return;
  }

  try {
    const [result]: any = await db.query(
      `INSERT INTO StockIngresado 
      (idProducto, cantidad, idDeposito, fechaIngreso, estado) 
      VALUES (?, ?, ?, ?, 'AC')`,
      [idProducto, cantidad, idDeposito, fechaIngreso]
    );

    res.status(201).json({ idStockIngresado: result.insertId, message: "Ingreso registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el ingreso", detalles: error });
  }
};

export const updateIngreso = async (req: Request, res: Response) => {
  const { id } = req.params;
    const { idProducto, cantidad, idDeposito, fechaIngreso } = req.body;
    if (!idProducto || !cantidad || !idDeposito || !fechaIngreso ) {
        res.status(400).json({ error: "Todos los campos son obligatorios" });
        return;
    }
    if (cantidad <= 0) {
        res.status(400).json({ error: "La cantidad debe ser mayor a cero" });
        return;
    }
    const hoy = new Date();
    const fecha = new Date(fechaIngreso);
    if (fecha > hoy) {
        res.status(400).json({ error: "No se puede registrar un ingreso con fecha futura" });
        return;
    }
    try {
        const [result]: any = await db.query(
            `UPDATE StockIngresado 
            SET idProducto = ?, cantidad = ?, idDeposito = ?, fechaIngreso = ? 
            WHERE idStockIngresado = ?`,
            [idProducto, cantidad, idDeposito, fechaIngreso, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Ingreso no encontrado" });
            return;
        }

        res.json({ message: "Ingreso actualizado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el ingreso", detalles: error });
    }
};

export const deleteIngreso = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result]: any = await db.query(
      "UPDATE StockIngresado SET estado = 'BA' WHERE idStockIngresado = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Ingreso no encontrado" });
      return;
    }

    res.json({ message: "Ingreso eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el ingreso", detalles: error });
  }
};
