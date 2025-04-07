import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { userRouter } from "./route/user.router.js";

const app = express();

app.use(express.json());

app.use(userRouter);

const mongoUrl = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
      console.log("App listening on port: ", PORT);
    });
  })
  .catch((err) => {
    console.error("Error with the connection: ", err);
  });
