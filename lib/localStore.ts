import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), ".localdb.json");

function read() {
  try {
    const txt = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(txt);
  } catch (e) {
    return { users: [], listings: [], bookings: [], reviews: [] };
  }
}

function write(obj: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(obj, null, 2), "utf8");
}

export function localCreate(collection: string, doc: any) {
  const db = read();
  const col = db[collection] || [];
  const id = Math.random().toString(36).slice(2, 9);
  const item = { _id: id, ...doc };
  col.push(item);
  db[collection] = col;
  write(db);
  return item;
}

export function localFind(collection: string, filter = {}) {
  const db = read();
  return db[collection] || [];
}

export function localFindById(collection: string, id: string) {
  const db = read();
  return (db[collection] || []).find((i: any) => i._id === id);
}

export function localDelete(collection: string, id: string) {
  const db = read();
  db[collection] = (db[collection] || []).filter((i: any) => i._id !== id);
  write(db);
}
