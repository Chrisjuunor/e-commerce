import mongoose from "mongoose";
import { CATEGORIES } from "../utils/categories.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: [String],
      default: [],
    },
    image: {
      type: [String],
      default: [],
    },
    // category: {
    //   type: String,
    //   enum: [
    //     CATEGORIES.ELECTRONICS,
    //     CATEGORIES.FASHION,
    //     CATEGORIES.HOBBIES,
    //     CATEGORIES.TOYS,
    //   ],
    // },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("product", productSchema);
