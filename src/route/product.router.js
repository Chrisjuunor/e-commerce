import express from "express"
import { createProduct } from "../controller/product.controller.js";

export const productRouter = express.Router();

productRouter.post("/api/product/add", createProduct)