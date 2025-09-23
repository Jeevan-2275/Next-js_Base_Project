import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    client = new MongoClient(uri, options);
    global._mongoClient = client;
    global._mongoClientPromise = client.connect();
    console.log("🔗 Connecting to MongoDB (dev, fresh)...");
  } else {
    console.log("♻️ Reusing existing MongoDB connection (dev)...");
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  console.log("🔗 Connecting to MongoDB (production)...");
}

export default clientPromise;
