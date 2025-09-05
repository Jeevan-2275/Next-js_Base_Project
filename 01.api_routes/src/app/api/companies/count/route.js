import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");

    const client = await clientPromise;
    const db = client.db("placementDB");

    const query = location ? { location } : {};
    const total = await db.collection("companies").countDocuments(query);

    return new Response(
      JSON.stringify({ total, location: location ?? "all" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GET /companies/count error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

