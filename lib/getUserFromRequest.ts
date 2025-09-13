import { verifyToken } from "./auth";
import { connectToDatabase } from "./mongodb";
import User from "../models/User";
import { localFindById } from "./localStore";

export async function getUserFromRequest(req: any) {
  const auth = req.headers?.authorization || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  try {
    const decoded: any = verifyToken(token);
    if (!process.env.DATABASE_URL) {
      // fallback to local store
      const user = localFindById("users", String(decoded.sub));
      return user;
    }
    await connectToDatabase();
    const user = await User.findById(decoded.sub);
    return user;
  } catch (e) {
    return null;
  }
}
