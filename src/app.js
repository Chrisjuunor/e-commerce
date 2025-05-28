import express from "express";
import { productRouter } from "./route/product.router.js";
import { userRouter } from "./route/user.router.js";
import { cartRouter } from "./route/cart.router.js";

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

export default app;
