import express from "express";
import { productModel } from "../model/product.model.js";

export const createProduct = async (req, res) => {
  const { name, description, price, color, image } = req.body;
  if (!name || !price) {
    console.error("No name or price returned from the request body!");
    return res
      .status(500)
      .json({ message: "please provide valid credentials" });
  }

  try {
    const imageUrls = req.files.map((file) => file.path);
    const product = await productModel.create({
      name,
      description,
      price,
      color,
      image: imageUrls,
    });
    if (!product) {
      console.error("product not created!");
      return res.status(400).json({ message: "Product not added!" });
    }

    console.log("The product: ", product);
    return res
      .status(201)
      .json({ success: true, message: "Product added!", data: product });
  } catch (err) {
    console.error("Error creating new product: ", err);
    return res.status(500).json({ message: "Could not add new product!" });
  }
};

export const getProductbyId = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    console.error(`Product with id ${id} not found!`);
    return res.status(400).json({ message: "Invalid product id!" });
  }

  try {
    const product = await productModel.findOne({ _id: id });
    if (!product) {
      console.error(`Unable to get product with id ${id}`);
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (err) {
    console.error("Error retrieving product: ", err);
    return res.status(500).json({ message: "Unable to get product!" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    //default page = 1; default limit = 10; q=>the object to query
    const { page = 1, limit = 10, q } = req.query;

    const query = {};
    //if q is provided, search for the name or description fields
    //$regex: q -> finds partial matches
    //$option: "i" -> search is case insensitive
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    //count for the query(total matches found!)
    const total = await productModel.countDocuments(query);

    const products = await productModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (!products || products.length === 0) {
      console.error("No products found");
      return res.status(404).json({ message: "No products found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Products found",
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error retrieving products: ", err);
    return res.status(500).json({ message: "Unable to get products!" });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    console.error(`Product with id ${id} not found!`);
    return res.status(400).json({ message: "Invalid product id!" });
  }

  try {
    const { name, description, price, color, image } = req.body;
    if (!name && !description && !price && !color && !image) {
      return res
        .status(400)
        .json({ message: "provide at least one field to update" });
    }

    const product = await productModel.findById(id);
    if (!product) {
      console.error(`Product with id ${id} not found!`);
      return res.status(404).json({ message: "product not found!" });
    }

    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    if (color) {
      product.color = color;
    }
    if (image) {
      product.image = image;
    }

    const updateProduct = await product.save();

    res.status(200).json({
      message: "product updated!",
      data: updateProduct,
    });
  } catch (err) {
    console.error("Error updating product!");
    return res.status(500).json({ message: "Unable to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const removeProduct = await productModel.findByIdAndDelete(id);
    if (!removeProduct) {
      console.error(`No product found with id ${id}`);
      return res.status(404).json({ message: "product not found!" });
    }

    return res.status(200).json({ message: "Product removed!" });
  } catch (err) {
    console.log("Error deleting product: ", err);
    return res.status(500).json({ message: "Error deleting product!" });
  }
};
