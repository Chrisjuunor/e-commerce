import express from "express";
import { cartModel } from "../model/cart.model.js";
import { orderModel } from "../model/order.model.js";

export const checkout = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, paymentMethod } = req.body;
  if (!shippingAddress || !paymentMethod) {
    console.log("Checkout details are missing!");
    return res
      .status(400)
      .json({ message: "Missing required checkout details" });
  }

  try {
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    if (!cart || cart.items.length === 0) {
      console.log("Cart is empty");
      return res.status(400).json({ message: "Cart is empty!" });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
      const price = item.productId.price;
      totalAmount += price * item.quantity;

      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price,
      };
    });

    const paymentStatus = simulatePayment(paymentMethod, totalAmount);

    const order = new orderModel({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      status: paymentStatus === "paid" ? "processing" : "pending",
    });

    await order.save();

    //clear cart
    cart.items = [];
    await cart.save();

    return res
      .status(200)
      .json({ message: "Order placed successfully", data: order });
  } catch (err) {
    console.error("Checkout error: ", err);
    return res.status(500).json({ message: "Error completing order!" });
  }
};

function simulatePayment(method, amount) {
  console.log(`Simulating ₦${amount} payment via ${method}...`);
  return "paid"; // temporary placeholder
}
