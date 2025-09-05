// src/app/api/companies/route.js
import clientPromise from "@/lib/mongodb";

// ✅ GET all companies
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("placementDB");
    const companies = await db.collection("companies").find({}).toArray();

    const serialized = companies.map(c => ({ ...c, _id: c._id.toString() }));

    return new Response(JSON.stringify(serialized), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/companies error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// ✅ POST: Add new company
export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON from request body

    // Basic validation
    if (!body.name || !body.location) {
      return new Response(JSON.stringify({ error: "Missing name or location" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("placementDB");

    const result = await db.collection("companies").insertOne({
      name: body.name,
      location: body.location,
      salaryBand: body.salaryBand ?? { base: 0, bonus: 0, stock: 0 },
      cgpa: body.cgpa ?? null,
      skills: body.skills ?? [],
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: "Company added", insertedId: result.insertedId.toString() }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /api/companies error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
