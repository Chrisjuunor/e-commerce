import mongoose from "mongoose";
import { STATUS } from "../utils/status.js";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    item: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [STATUS.PENDING, STATUS.SHIPPED, STATUS.DELIVERED],
      default: STATUS.PENDING,
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
