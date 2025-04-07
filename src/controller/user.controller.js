import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(500)
      .json({ message: "Please provide valid credentials" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    if (!user) {
      console.error("Unable to create new user!");
      return res.status(400).json({ message: "Error creating user!" });
    }

    console.log("user created successfully!", user);

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (err) {
    return res.status(500).json({ message: "Could not create user!" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Raw request body:", req.body);
  if (!email || !password) {
    console.log("input body is probably empty!");
    return res
      .status(400)
      .json({ message: "Please provide valid credentials" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.error("user not found!");
      return res.status(500).json({ message: "Could not retrieve user!" });
    }

    console.log("User found: ", user);
    console.log("Password from request:", password);

    const isPassword = await bcrypt.compare(password, user.password);
    console.log("Password from DB (hashed):", user.password);
    console.log(`Password valid? ${isPassword}`);

    if (!isPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, email);
    return res.status(200).json({ message: "Login successful!", user, token });
  } catch (err) {
    console.error("Error logging in user! ", err);
    return res.status(500).json({ message: "Unable to login user!" });
  }
};
