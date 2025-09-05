import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) return new Response("Invalid ID", { status: 400 });

    const { benefit } = await req.json();
    if (!benefit) return new Response("Missing benefit", { status: 400 });

    const client = await clientPromise;
    const db = client.db("placementDB");

    const result = await db.collection("companies").updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { benefits: benefit } }
    );

    return new Response(JSON.stringify({ modifiedCount: result.modifiedCount }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
