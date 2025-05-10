import { Router } from "express";
import { getStockDisponible, getHistorialMovimientos } from "../controllers/stockFunciones.controller";

const router = Router();

router.get("/disponible", getStockDisponible);
router.get("/movimientos/:id", getHistorialMovimientos);

export default router;
