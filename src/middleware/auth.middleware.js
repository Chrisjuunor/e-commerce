import express from "express";
import { verifyToken } from "../utils/jwt.utils.js";
import { userModel } from "../model/user.model.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  try {
    const payload = verifyToken(token);
    if (!payload) {
      return res.status(403).json({ message: "Invalid or expired token!" });
    }

    const user = await userModel.findOne({ email: payload.email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Error authenticating token: ", err.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "access denied. You do not have permission!" });
    }
    next();
  };
};
