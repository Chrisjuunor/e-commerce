import express from "express";
import { createUser } from "../controller/user.controller.js";

export const userRouter = express.Router();

userRouter.post("/api/user/register", createUser);
