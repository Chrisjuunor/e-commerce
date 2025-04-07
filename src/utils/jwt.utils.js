import jwt from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.secret;

export const generateToken = (id, email) => {
  return jwt.sign({ id, email }, secret, { expiresIn: "1h" });
};
