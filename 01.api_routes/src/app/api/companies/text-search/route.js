import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const skill = searchParams.get("skill");

    const client = await clientPromise;
    const db = client.db("placementDB");

    const query = {};
    if (q) {
      query.name = { $regex: q, $options: "i" };
    }
    if (skill) {
      query.skills = { $regex: skill, $options: "i" };
    }

    const companies = await db.collection("companies").find(query).toArray();

    const serialized = companies.map(c => ({ ...c, _id: c._id.toString() }));

    return new Response(JSON.stringify(serialized), { status: 200 });
  } catch (err) {
    console.error("GET /companies/text-search error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
