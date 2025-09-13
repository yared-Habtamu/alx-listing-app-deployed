import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import Listing from "../../../models/Listing";
import { getUserFromRequest } from "../../../lib/getUserFromRequest";
import { localCreate, localFind } from "../../../lib/localStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.DATABASE_URL) {
    if (req.method === "GET") {
      const listings = localFind("listings");
      return res.status(200).json(listings);
    }
    if (req.method === "POST") {
      const user = await getUserFromRequest(req as any);
      if (!user) return res.status(401).json({ error: "unauth" });
      const body = req.body || {};
      const created = localCreate("listings", { ...body, owner: user._id });
      return res.status(201).json(created);
    }
  } else {
    await connectToDatabase();
    if (req.method === "GET") {
      const q = req.query.q as string | undefined;
      const listings = await Listing.find(
        q ? { $text: { $search: q } } : {}
      ).limit(50);
      return res.status(200).json(listings);
    }
    if (req.method === "POST") {
      const user = await getUserFromRequest(req as any);
      if (!user) return res.status(401).json({ error: "unauth" });
      const body = req.body || {};
      const created = await Listing.create({ ...body, owner: user._id });
      return res.status(201).json(created);
    }
  }

  res.status(405).end();
}
