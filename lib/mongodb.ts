import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL || "";

if (!MONGODB_URI) {
  // Do not attempt to connect when URI is missing. Connect function will throw.
  console.warn(
    "No DATABASE_URL configured. Create a .env.local with DATABASE_URL to enable MongoDB."
  );
}

let cached = globalThis as any;

if (!cached._mongo) cached._mongo = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached._mongo.conn) return cached._mongo.conn;

  if (!MONGODB_URI) {
    throw new Error(
      "DATABASE_URL is not set. Create .env.local with DATABASE_URL pointing to your MongoDB Atlas cluster."
    );
  }

  if (!cached._mongo.promise) {
    cached._mongo.promise = mongoose
      .connect(MONGODB_URI, { autoIndex: true })
      .then((m) => m.connection)
      .catch((err) => {
        cached._mongo.promise = null;
        throw err;
      });
  }

  cached._mongo.conn = await cached._mongo.promise;
  return cached._mongo.conn;
}
