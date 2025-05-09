import {Request , Response} from 'express';
import { db } from '../db';

//depositos: idDeposito, nombre, ubicacion, estado

export const getAllDepositos = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM depositos WHERE estado = "AC"');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener depósitos' });
  }
}

export const getDepositoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [rows]: any = await db.query('SELECT * FROM depositos WHERE idDeposito = ?', [id]);
    
        if (rows.length === 0) {
        res.status(404).json({ error: 'Depósito no encontrado' });
        return;
        }
    
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el depósito' });
    }
    }

export const createDeposito = async (req: Request, res: Response) => {
    const { nombre, ubicacion } = req.body;
    try {
        if (!nombre || !ubicacion) {
            res.status(400).json({ error: 'Nombre y ubicación son obligatorios' });
            return;
        }
        const [result]: any = await db.query(
            `INSERT INTO depositos (nombre, ubicacion, estado)
            VALUES (?, ?, 'AC')`,
            [nombre, ubicacion]
        );
        // result.insertId tiene el id del nuevo registro
    
        res.status(201).json({ id: result.insertId, message: 'Depósito creado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el depósito' });
    }
}

export const updateDeposito = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, ubicacion, estado } = req.body;
    try {
        if (!nombre || !ubicacion || !estado) {
            res.status(400).json({ error: 'Nombre, ubicación y estado son obligatorios' });
            return;
        }
        const [result]: any = await db.query(
            `UPDATE depositos
            SET nombre = ?, ubicacion = ?, estado = ?
            WHERE idDeposito = ?`,
            [nombre, ubicacion, estado, id]
        );
    
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Depósito no encontrado' });
            return;
        }
    
        res.json({ message: 'Depósito actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el depósito' });
    }
}

export const deleteDeposito = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result]: any = await db.query(
            `UPDATE depositos
            SET estado = 'BA'
            WHERE idDeposito = ?`,
            [id]
        );
    
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Depósito no encontrado' });
            return;
        }
    
        res.json({ message: 'Depósito eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el depósito' });
    }
}
