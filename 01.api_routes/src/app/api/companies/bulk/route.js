import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return new Response(JSON.stringify({ error: "Body must be an array" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("placementDB");

    const result = await db.collection("companies").insertMany(body);

    return new Response(JSON.stringify({ insertedCount: result.insertedCount }), { status: 201 });
  } catch (err) {
    console.error("POST /companies/bulk error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
