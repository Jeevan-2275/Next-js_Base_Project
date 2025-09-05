import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db("placementDB");

    const companies = await db
      .collection("companies")
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("companies").countDocuments();

    const serialized = companies.map(c => ({ ...c, _id: c._id.toString() }));

    return new Response(
      JSON.stringify({
        page,
        limit,
        total,
        data: serialized,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GET /companies/paginate error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
