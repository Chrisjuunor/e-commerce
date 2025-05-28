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
    return res.status(200).json({ message: "Added to cart ", cart });
  } catch (err) {
    console.error("Cart error: ", err);
    return res.status(500).json({ message: "Unable to add item to cart!" });
  }
};
