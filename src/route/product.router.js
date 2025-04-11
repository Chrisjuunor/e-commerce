import express from "express";
import {
  createProduct,
  getProductbyId,
} from "../controller/product.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

export const productRouter = express.Router();

productRouter.post("/api/product/add", authenticateToken, createProduct);
productRouter.get("/api/product/get/:id", authenticateToken, getProductbyId);
