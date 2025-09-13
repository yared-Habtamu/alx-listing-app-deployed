import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
import { localFind } from "../../../lib/localStore";
import bcrypt from "bcryptjs";
import { signToken } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "missing fields" });
    if (!process.env.DATABASE_URL) {
      const users = localFind("users");
      const user = users.find((u: any) => u.email === email);
      if (!user) return res.status(401).json({ error: "invalid" });
      const ok = await bcrypt.compare(password, user.passwordHash || "");
      if (!ok) return res.status(401).json({ error: "invalid" });
      const token = signToken({ sub: user._id, email: user.email });
      return res.status(200).json({ token });
    }
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "invalid" });
    const ok = await bcrypt.compare(password, user.passwordHash || "");
    if (!ok) return res.status(401).json({ error: "invalid" });
    const token = signToken({ sub: user._id, email: user.email });
    res.status(200).json({ token });
  } catch (err: any) {
    console.error("Login error", err);
    res.status(500).json({ error: String(err.message || err) });
  }
}
