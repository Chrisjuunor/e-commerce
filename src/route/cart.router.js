import express from "express";
import { addToCart, getCart } from "../controller/cart.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

export const cartRouter = express.Router();

cartRouter.post("/api/cart/add", authenticateToken, addToCart);
cartRouter.get("/api/cart/get", authenticateToken, getCart);
