import express from "express";
import { productRouter } from "./route/product.router.js";
import { userRouter } from "./route/user.router.js";

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(productRouter);

export default app;
