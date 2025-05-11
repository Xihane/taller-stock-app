import { Request, Response } from "express";
import { db } from "../db";



//idStockEgresado, idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, estado, destinoTipo, destinoValor

// Obtener todos los egresos activos
export const getAllEgresos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        se.idStockEgresado,
        se.idProducto,
        p.nombre AS producto,
        se.cantidad,
        se.idDeposito,
        d.nombre AS deposito,
        se.idVehiculo,
        v.dominio AS vehiculo,
        se.fechaEgreso,
        se.estado,
        se.destinoTipo,
        se.destinoValor
      FROM stockegresado se
      INNER JOIN productos p ON p.id = se.idProducto
      INNER JOIN depositos d ON d.idDeposito = se.idDeposito
      LEFT JOIN vehiculos v ON v.idVehiculo = se.idVehiculo
      WHERE se.estado = 'AC'
      ORDER BY se.fechaEgreso DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error en getAllEgresos:", error);
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
  const { idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, destinoTipo, destinoValor } = req.body;

  if (!idProducto || !cantidad || !idDeposito || !idVehiculo || !fechaEgreso || !destinoTipo || !destinoValor) {
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
      (idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, destinoTipo, destinoValor, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, 'AC')`,
      [idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, destinoTipo, destinoValor,]
    );

    res.status(201).json({ idStockEgresado: result.insertId, message: "Egreso registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el egreso", detalles: error });
  }
};

// Actualizar egreso
export const updateEgreso = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, destinoTipo, destinoValor  } = req.body;

  if (!idProducto || !cantidad || !idDeposito || !idVehiculo || !fechaEgreso || !destinoTipo || !destinoValor) {
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
       SET idProducto = ?, cantidad = ?, idDeposito = ?, idVehiculo = ?, fechaEgreso = ? , destinoTipo = ?, destinoValor = ?
       WHERE idStockEgresado = ? AND estado = 'AC'`,
      [idProducto, cantidad, idDeposito, idVehiculo, fechaEgreso, destinoTipo, destinoValor, id]
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
