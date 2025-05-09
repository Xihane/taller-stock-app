import { Router } from 'express';
import {
  getAllMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca
} from '../controllers/productos-marcas.controller';

const router = Router();

router.get('/', getAllMarcas);         // Browse
router.get('/:id', getMarcaById);      // Read
router.post('/', createMarca);         // Add
router.put('/:id', updateMarca);      // Edit
router.delete('/:id', deleteMarca);    // Delete

export default router;