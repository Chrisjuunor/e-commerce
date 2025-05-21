import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductbyId,
  updateProduct,
} from "../controller/product.controller.js";
import {
  authenticateToken,
  requireRole,
} from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

export const productRouter = express.Router();

productRouter.post(
  "/api/product/add",
  authenticateToken,
  requireRole("admin"),
  upload.array("image", 5),
  createProduct
);
productRouter.get("/api/product/get/:id", authenticateToken, getProductbyId);
productRouter.put(
  "/api/product/update/:id",
  authenticateToken,
  requireRole("admin"),
  updateProduct
);
productRouter.delete(
  "/api/product/remove/:id",
  authenticateToken,
  requireRole("admin"),
  deleteProduct
);
