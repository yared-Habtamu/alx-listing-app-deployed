import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
import { localCreate } from "../../../lib/localStore";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { name, email, password } = req.body || {};
    if (!email || !password || !name)
      return res.status(400).json({ error: "missing fields" });
    if (!process.env.DATABASE_URL) {
      // fallback: use local JSON store
      const hash = await bcrypt.hash(password, 10);
      const user = localCreate("users", { name, email, passwordHash: hash });
      const token = signToken({ sub: user._id, email: user.email });
      return res.status(201).json({ token });
    }
    await connectToDatabase();
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "email exists" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash });
    const token = signToken({ sub: user._id, email: user.email });
    res.status(201).json({ token });
  } catch (err: any) {
    console.error("Register error", err);
    res.status(500).json({ error: String(err.message || err) });
  }
}
