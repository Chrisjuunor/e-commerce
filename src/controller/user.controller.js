import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/user.model.js";

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
