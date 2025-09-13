import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import Listing from "../../../models/Listing";
import { getUserFromRequest } from "../../../lib/getUserFromRequest";
import { localFindById, localDelete } from "../../../lib/localStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (!process.env.DATABASE_URL) {
    if (req.method === "GET") {
      const listing = localFindById("listings", String(id));
      if (!listing) return res.status(404).end();
      return res.status(200).json(listing);
    }
    const user = await getUserFromRequest(req as any);
    if (!user) return res.status(401).json({ error: "unauth" });
    if (req.method === "PUT") {
      // simple local update
      return res
        .status(200)
        .json({ ...localFindById("listings", String(id)), ...req.body });
    }
    if (req.method === "DELETE") {
      const listing = localFindById("listings", String(id));
      if (!listing) return res.status(404).end();
      if (String(listing.owner) !== String(user._id))
        return res.status(403).end();
      localDelete("listings", String(id));
      return res.status(204).end();
    }
  } else {
    await connectToDatabase();
    if (req.method === "GET") {
      const listing = await Listing.findById(id);
      if (!listing) return res.status(404).end();
      return res.status(200).json(listing);
    }
    const user = await getUserFromRequest(req as any);
    if (!user) return res.status(401).json({ error: "unauth" });
    if (req.method === "PUT") {
      const updated = await Listing.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updated);
    }
    if (req.method === "DELETE") {
      const listing = await Listing.findById(id);
      if (!listing) return res.status(404).end();
      if (listing.owner?.toString() !== user._id.toString())
        return res.status(403).end();
      await listing.remove();
      return res.status(204).end();
    }
  }

  res.status(405).end();
}
