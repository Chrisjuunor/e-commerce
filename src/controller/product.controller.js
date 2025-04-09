import express from "express";
import { productModel } from "../model/product.model.js";

export const createProduct = async (req, res) => {
  const { name, description, price, category } = req.body;
  if (!name || !price) {
    console.error("No name or price returned from the request body!");
    return res
      .status(500)
      .json({ message: "please provide valid credentials" });
  }

  try {
    const product = await productModel.create({name, description, price, category,});
    if(!product){
        console.error("product not created!");
        return res.status(400).json({message: "Product not added!"});
    }
    
    console.log("The product: ", product);
    return res.status(201).json({message: "Product added!", product});
  } catch (err) {
    console.error("Error creating new product: ", err);
    return res.status(500).json({ message: "Could not add new product!" });
  }
};
