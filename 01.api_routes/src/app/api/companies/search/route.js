import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const minBase = searchParams.get("minBase");
    const skill = searchParams.get("skill");

    const client = await clientPromise;
    const db = client.db("placementDB");

    const query = {};
    if (city) query.location = city;
    if (minBase) query["salaryBand.base"] = { $gte: parseInt(minBase) };
    if (skill) query.skills = skill;

    const companies = await db.collection("companies").find(query).toArray();

    const serialized = companies.map(c => ({ ...c, _id: c._id.toString() }));

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /companies/search error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
