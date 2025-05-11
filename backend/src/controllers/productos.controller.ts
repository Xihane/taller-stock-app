import { Request, Response } from 'express';
import { db } from '../db';


export const getAllProductos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        p.idTipoProducto AS idProductoTipo,
        pt.descripcion AS tipoProductoDescripcion,
        p.idMarca AS idProductoMarca,
        pm.nombre AS marcaNombre,
        p.estado
      FROM Productos p
      LEFT JOIN ProductosTipos pt ON p.idTipoProducto = pt.idproductoTipo
      LEFT JOIN ProductoMarcas pm ON p.idMarca = pm.idproductoMarca
      WHERE p.estado = 'AC'
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};


export const getProductoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await db.query(`
      SELECT 
        p.*, 
        pt.descripcion AS tipoProductoDescripcion, 
        pm.nombre AS marcaNombre
      FROM Productos p
      LEFT JOIN ProductosTipos pt ON p.idTipoProducto = pt.idProductoTipo
      LEFT JOIN ProductoMarcas pm ON p.idMarca = pm.idProductoMarca
      WHERE p.id = ?

`, [id]);

    if (rows.length === 0) {
       res.status(404).json({ error: 'Producto no encontrado' });
       return;
    }

     res.json(rows[0]); 
  } catch (error) {
     res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  console.log("Datos recibidos en el backend:", req.body);
  
  const { nombre, descripcion, idTipoProducto, idMarca } = req.body;

  if (!nombre || !descripcion || !idTipoProducto || !idMarca) {
    res.status(400).json({ error: 'Nombre, descripción, Tipo de producto y Marca son obligatorios' });
    return;
  }

  try {
    const [result]: any = await db.query(
      `INSERT INTO Productos (nombre, descripcion, idTipoProducto, idMarca, estado)
       VALUES (?, ?, ?, ?, 'AC')`,
      [nombre, descripcion, idTipoProducto, idMarca]
    );

    res.status(201).json({ id: result.insertId, message: 'Producto creado' });
  } catch (error) {
    console.error("Error en la base de datos:", error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, idTipoProducto, idMarca, estado } = req.body;
  try {
    if (!nombre || !descripcion || !idTipoProducto || !idMarca || !estado) {
      res.status(400).json({ error: 'Nombre, descripción, Tipo de producto, Marca y estado son obligatorios' });
      return;
    }
    if (!['AC', 'BA'].includes(estado)) {
      res.status(400).json({ error: 'Estado inválido' });
      return;
    }

    const [result]: any = await db.query(
      `UPDATE Productos
        SET nombre = ?, descripcion = ?, idTipoProducto = ?, idMarca = ?, estado = ?
       WHERE id = ?`,
      [nombre, descripcion, idTipoProducto, idMarca, estado, id]
    );


    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Producto no encontrado para actualizar' });
      return;
    }
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Soft delete: cambiamos estado a 'BA'
    const [result]: any = await db.query(
      `UPDATE Productos
       SET estado = 'BA'
       WHERE id = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Producto no encontrado para eliminar' });
      return;
    }
    res.json({ message: 'Producto dado de baja' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

