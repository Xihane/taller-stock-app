import { Router } from 'express';
import {
    getAllVehiculos,
    getVehiculoById,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo
} from '../controllers/vehiculos.controller';

const router = Router();

router.get('/', getAllVehiculos);         // Browse
router.get('/:id', getVehiculoById);      // Read
router.post('/', createVehiculo);         // Add
router.put('/:id', updateVehiculo);      // Edit
router.delete('/:id', deleteVehiculo);    // Delete

export default router;

