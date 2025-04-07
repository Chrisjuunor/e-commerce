import express from "express";
import { createUser, userLogin } from "../controller/user.controller.js";

export const userRouter = express.Router();

userRouter.post("/api/user/register", createUser);
userRouter.post("/api/user/login", userLogin);
