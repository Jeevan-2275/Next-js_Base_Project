import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) return new Response("Invalid ID", { status: 400 });

    const { round, type } = await req.json();
    if (!round || !type) return new Response("Missing fields", { status: 400 });

    const client = await clientPromise;
    const db = client.db("placementDB");

    const result = await db.collection("companies").updateOne(
      { _id: new ObjectId(id) },
      { $push: { interviewRounds: { round, type } } }
    );

    return new Response(JSON.stringify({ modifiedCount: result.modifiedCount }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
