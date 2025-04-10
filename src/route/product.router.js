import express from "express";
import { createProduct } from "../controller/product.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

export const productRouter = express.Router();

productRouter.post("/api/product/add", authenticateToken, createProduct);
