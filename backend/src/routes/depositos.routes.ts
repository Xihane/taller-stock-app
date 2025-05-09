import { Router } from 'express';
import {
    getAllDepositos,
    getDepositoById,
    createDeposito,
    updateDeposito,
    deleteDeposito
} from '../controllers/depositos.controller';

const router = Router();

router.get('/', getAllDepositos);         // Browse
router.get('/:id', getDepositoById);      // Read
router.post('/', createDeposito);         // Add
router.put('/:id', updateDeposito);      // Edit
router.delete('/:id', deleteDeposito);    // Delete

export default router;