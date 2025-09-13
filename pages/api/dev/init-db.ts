import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";
import User from "../../../models/User";
import Listing from "../../../models/Listing";
import Booking from "../../../models/Booking";
import Review from "../../../models/Review";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === "production")
    return res.status(403).json({ error: "disabled" });
  try {
    await connectToDatabase();
    // Ensure indexes - Mongoose will create indexes defined in schemas
    await User.createCollection().catch(() => {});
    await Listing.createCollection().catch(() => {});
    await Booking.createCollection().catch(() => {});
    await Review.createCollection().catch(() => {});
    // Example: create a text index for Listing search
    await Listing.collection
      .createIndex({ title: "text", description: "text" })
      .catch(() => {});
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
