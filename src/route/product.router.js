import express from "express";
import {
  createProduct,
  getProductbyId,
  updateProduct,
} from "../controller/product.controller.js";
import { authenticateToken, requireRole } from "../middleware/auth.middleware.js";

export const productRouter = express.Router();

productRouter.post("/api/product/add", authenticateToken, requireRole("admin"), createProduct);
productRouter.get("/api/product/get/:id", authenticateToken, getProductbyId);
productRouter.put("/api/product/update/:id", updateProduct);
