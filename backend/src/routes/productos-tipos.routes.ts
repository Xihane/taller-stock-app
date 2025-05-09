import { Router } from "express";
import { getAllTiposProductos, getTipoProductoById, createTipoProducto, updateTipoProducto, deleteTipoProducto } from "../controllers/productos-tipos.controller";

const router = Router();

router.get("/", getAllTiposProductos);
router.get("/:id", getTipoProductoById);
router.post("/", createTipoProducto);
router.put("/:id", updateTipoProducto);
router.delete("/:id", deleteTipoProducto);
export default router;