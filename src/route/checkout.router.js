import express from "express";
import { checkout } from "../controller/checkout.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

export const checkoutRouter = express.Router();

checkoutRouter.post("/api/orders/checkout", authenticateToken, checkout);
