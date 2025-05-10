import { Request, Response } from "express";
import { db } from "../db";

// Obtener todos los egresos activos
export const getAllEgresos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM StockEgresado WHERE estado = 'AC'");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener egresos", detalles: error });
  }
};

// Obtener egreso por ID
export const getStockEgresoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query("SELECT * FROM StockEgresado WHERE idStockEgresado = ?", [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: "Egreso no encontrado" });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el egreso", detalles: error });
  }
};

// Crear nuevo egreso
export const createEgreso = async (req: Request, res: Response) => {
  const { idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso } = req.body;

  if (!idProducto || !cantidad || !idDeposito || !idVehiculo || !fechaEgreso) {
    res.status(400).json({ error: "Todos los campos son obligatorios" });
    return;
  }

  if (cantidad <= 0) {
    res.status(400).json({ error: "La cantidad debe ser mayor a cero" });
    return;
  }

  const hoy = new Date();
  const fecha = new Date(fechaEgreso);
  if (fecha > hoy) {
    res.status(400).json({ error: "No se puede registrar un egreso con fecha futura" });
    return;
  }

  try {
    // Verificar stock disponible en el depósito
    const [[{ totalIngresado = 0 } = {}]]: any = await db.query(
      `SELECT SUM(cantidad) AS totalIngresado 
       FROM StockIngresado 
       WHERE idProducto = ? AND idDeposito = ? AND estado = 'AC'`,
      [idProducto, idDeposito]
    );

    const [[{ totalEgresado = 0 } = {}]]: any = await db.query(
      `SELECT SUM(cantidad) AS totalEgresado 
       FROM StockEgresado 
       WHERE idProducto = ? AND idDeposito = ? AND estado = 'AC'`,
      [idProducto, idDeposito]
    );

    const stockDisponible = (totalIngresado || 0) - (totalEgresado || 0);

    if (cantidad > stockDisponible) {
       res.status(400).json({ error: `Stock insuficiente. Disponible: ${stockDisponible}` });
       return;
    }

    // Validación opcional: evitar duplicado del mismo producto al mismo vehículo y fecha
    const [duplicado]: any = await db.query(
      `SELECT * FROM StockEgresado 
       WHERE idProducto = ? AND idVehiculo = ? AND fechaEgreso = ? AND estado = 'AC'`,
      [idProducto, idVehiculo, fechaEgreso]
    );

    if (duplicado.length > 0) {
      res.status(400).json({ error: "Ya existe un egreso para ese producto, vehículo y fecha" });
      return;
    }

    const [result]: any = await db.query(
      `INSERT INTO StockEgresado 
      (idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, estado) 
      VALUES (?, ?, ?, ?, ?, 'AC')`,
      [idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso]
    );

    res.status(201).json({ idStockEgresado: result.insertId, message: "Egreso registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el egreso", detalles: error });
  }
};

// Actualizar egreso
export const updateEgreso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso } = req.body;

  if (!idProducto || !cantidad || !idDeposito || !idVehiculo || !fechaEgreso) {
    res.status(400).json({ error: "Todos los campos son obligatorios" });
    return;
  }

  if (cantidad <= 0) {
    res.status(400).json({ error: "La cantidad debe ser mayor a cero" });
    return;
  }

  const hoy = new Date();
  const fecha = new Date(fechaEgreso);
  if (fecha > hoy) {
    res.status(400).json({ error: "No se puede registrar un egreso con fecha futura" });
    return;
  }

  try {
    // Podés implementar validación de stock aquí si querés que no se edite a una cantidad mayor

    const [result]: any = await db.query(
      `UPDATE StockEgresado 
       SET idProducto = ?, cantidad = ?, idDeposito = ?, idVehiculo = ?, fechaEgreso = ? 
       WHERE idStockEgresado = ?`,
      [idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Egreso no encontrado" });
      return;
    }

    res.json({ message: "Egreso actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el egreso", detalles: error });
  }
};

// Eliminar egreso (lógico)
export const deleteEgreso = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result]: any = await db.query(
      "UPDATE StockEgresado SET estado = 'BA' WHERE idStockEgresado = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Egreso no encontrado" });
      return;
    }

    res.json({ message: "Egreso eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el egreso", detalles: error });
  }
};
