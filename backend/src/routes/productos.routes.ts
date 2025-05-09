import { Router } from "express";
import {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} from "../controllers/productos.controller";

const router = Router();

// BREAD
router.get("/", getAllProductos);         // Browse
router.get('/:id', getProductoById);      // Read
router.post("/", createProducto);         // Add
router.put("/:id", updateProducto);       // Edit
router.delete("/:id", deleteProducto);    // Delete

export default router;
