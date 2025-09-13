import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export function signToken(payload: object, options = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d", ...options });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
