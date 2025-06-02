import mongoose from "mongoose";
import { ORDERSTATUS } from "../utils/orderStatus.js";
import { PAYMENTSTATUS } from "../utils/paymentStatus.js";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
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
        price: {
          type: Number,
          required: true
        }
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    transactionRef: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: [PAYMENTSTATUS.PENDING, PAYMENTSTATUS.PAID, PAYMENTSTATUS.FAILED],
      default: PAYMENTSTATUS.PENDING
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        ORDERSTATUS.PROCESSING,
        ORDERSTATUS.SHIPPED,
        ORDERSTATUS.DELIVERED,
        ORDERSTATUS.CANCELLED,
      ],
      default: ORDERSTATUS.PROCESSING,
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
