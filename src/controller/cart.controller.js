import { cartModel } from "../model/cart.model.js";
import { productModel } from "../model/product.model.js";

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const qty = parseInt(quantity);
  if (!productId || isNaN(qty) || qty <= 0) {
    console.log("Invalid product or quantity");
    return res.status(400).json({ message: "Invalid product or quantity!" });
  }

  try {
    const product = await productModel.findById(productId);
    if (!product) {
      console.log("Could not find product");
      return res.json({ message: "Product not found!" });
    }

    // Cart...
    let cart = await cartModel.findOne({ userId }); //find cart by userId
    if (!cart) {
      //if no cart found, create a new cart for the use
      cart = new cartModel({
        userId,
        items: [{ productId, quantity: qty }],
      });
    } else {
      //else if there was indeed a cart, check for a product item in it
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );
      if (itemIndex > -1) {
        //item already exists in the cart, so just increment
        cart.items[itemIndex].quantity += qty;
      } else {
        //item does not exist in the cart, so just add it to cart
        cart.items.push({ productId, quantity: qty });
      }
    }

    await cart.save();
    return res.status(200).json({ message: "Added to cart ", data: cart });
  } catch (err) {
    console.error("Cart error: ", err);
    return res.status(500).json({ message: "Unable to add item to cart!" });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    if (!cart) {
      console.log("Cart not found!");
      return res.status(404).json({ message: "Cart not found!" });
    }

    return res.status(200).json({ message: "Cart found: ", data: cart });
  } catch (err) {
    console.error("Error getting cart: ", err);
    return res.status(500).json({ message: "Unable to get cart!" });
  }
};

export const removeItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) {
    console.log("Invalid product!");
    return res.status(400).json({ message: "Invalid product!" });
  }

  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      console.log("Cart not found!");
      return res.status(404).json({ message: "Cart not found!" });
    }
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return res
      .status(200)
      .json({ message: "Item removed from cart", data: cart });
  } catch (err) {
    console.error("Error removing item: ", err);
    return res.status(500).json({ message: "Error removing item!" });
  }
};

export const updateCartitem = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const qty = parseInt(quantity);
  if (!productId || isNaN(qty) || qty < 1) {
    console.log("Invalid product or quantity!");
    return res.status(400).json({ message: "Invalid product or quantity!" });
  }

  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      console.log("cart not found!");
      return res.status(404).json({ message: "Cart not found!" });
    }

    const cartIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    cart.items[cartIndex].quantity = qty;

    await cart.save();
    return res.status(200).json({ message: "Cart updated", data: cart });
  } catch (err) {
    console.error("Error updating cart item: ", err);
    return res.status(500).json({ message: "Unable to update cart item!" });
  }
};
