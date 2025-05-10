import { Router } from "express";
import {
    getAllIngresos,
    getStockIngresoById,
    createIngreso,
    updateIngreso,
    deleteIngreso
} from "../controllers/stockIngresado.controller";

const router = Router();
router.get("/", getAllIngresos); // Browse
router.get("/:id", getStockIngresoById); // Read
router.post("/", createIngreso); // Add
router.put("/:id", updateIngreso); // Edit
router.delete("/:id", deleteIngreso); // Delete
export default router;