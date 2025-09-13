import type { NextApiRequest, NextApiResponse } from "next";

type Data = { success: boolean; id?: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end();
  const { propertyId } = req.body || {};
  // Simulate booking
  return res
    .status(200)
    .json({ success: true, id: `booking_${propertyId}_${Date.now()}` });
}
