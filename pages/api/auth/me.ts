import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromRequest } from "../../../lib/getUserFromRequest";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserFromRequest(req as any);
  if (!user) return res.status(401).json({ error: "unauth" });
  // return selected fields
  const { _id, name, email, avatar, role } = user;
  res.status(200).json({ id: _id, name, email, avatar, role });
}
