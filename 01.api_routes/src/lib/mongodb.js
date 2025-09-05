// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable in .env.local");
}

// Use a global to preserve the client across HMR in development
let cached = global._mongoClientPromise;

if (!cached) {
  const client = new MongoClient(uri);
  cached = client.connect();
  global._mongoClientPromise = cached;
}

export default cached; // Promise that resolves to connected MongoClient
