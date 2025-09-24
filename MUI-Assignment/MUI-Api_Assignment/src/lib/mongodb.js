// lib/mongodb.js
import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://jeevankadam2275_db_user:Pass%40123@assignment0.hsl3b1g.mongodb.net/?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required.');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // preserve across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;