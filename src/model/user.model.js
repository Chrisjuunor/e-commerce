import mongoose from "mongoose";
import { ROLES } from "../utils/roles.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.USER],
      default: ROLES.USER,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
