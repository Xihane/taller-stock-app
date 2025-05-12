import {  Request, Response } from 'express';
import { db } from '../db';

//vehiculos: idVehiculo,dominio, idMarca, modelo, anio, estado

// Mostrar solo vehículos activos
export const getAllVehiculos = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query('SELECT * FROM vehiculos WHERE estado = "AC"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los vehiculos', detalles: error });
    }
};


export const getVehiculoById = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const [rows]: any = await db.query('SELECT * FROM vehiculos WHERE idVehiculo = ?', [id]);

        if (rows.length === 0) {
            res.status(404).json({ error: 'Vehiculo no encontrado' });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el vehiculo', detalles: error });
    }
};

export const createVehiculo = async (req: Request, res: Response) => {
    const { dominio, idMarca, modelo, anio} = req.body;
    try {
        if (!dominio || !idMarca || !modelo || !anio) {
            res.status(400).json({ error: 'Dominio, Marca, Modelo y Año son obligatorios' });
            return;
        }
        const [result]: any = await db.query(
            `INSERT INTO vehiculos (dominio, idMarca, modelo, anio, estado)
             VALUES (?, ?, ?, ?, 'AC')`,
            [dominio, idMarca, modelo, anio]
        );

        // result.insertId tiene el id del nuevo registro
        res.status(201).json({ id: result.insertId, message: 'Vehiculo creado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el vehiculo', detalles: error });
    }
};

export const updateVehiculo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { dominio, idMarca, modelo, anio } = req.body;
    try {
        if (!dominio || !idMarca || !modelo || !anio) {
            res.status(400).json({ error: 'Dominio, Marca, Modelo, Año son obligatorios' });
            return;
        }
        const [result]: any = await db.query(
            `UPDATE vehiculos
              SET dominio = ?, idMarca = ?, modelo = ?, anio = ?
              WHERE idVehiculo = ?`,
            [dominio, idMarca, modelo, anio, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vehiculo no encontrado' });
            return;
        }

        res.json({ message: 'Vehiculo actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el vehiculo', detalles: error });
    }
};

export const deleteVehiculo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result]: any = await db.query('UPDATE vehiculos SET estado = "BA" WHERE idVehiculo = ?', [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Vehiculo no encontrado' });
            return;
        }
        res.json({ message: 'Vehiculo eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el vehiculo', detalles: error });
    }
};