import { Router } from "express";
import {
    getAllEgresos,
    getStockEgresoById,
    createEgreso,
    updateEgreso,
    deleteEgreso
} from "../controllers/stockEgresado.controller";

const router = Router();

router.get("/", getAllEgresos);         // Browse
router.get('/:id', getStockEgresoById);      // Read
router.post("/", createEgreso);         // Add
router.put("/:id", updateEgreso);       // Edit
router.delete("/:id", deleteEgreso);    // Delete
export default router;