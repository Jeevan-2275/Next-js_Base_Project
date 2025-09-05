// src/app/api/companies/name/[name]/route.js
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { name } = params;

    const client = await clientPromise;
    const db = client.db("placementDB");

    // Case-insensitive search
    const company = await db
      .collection("companies")
      .findOne({ name: { $regex: `^${name}$`, $options: "i" } });

    if (!company) {
      return new Response(JSON.stringify({ error: "Company not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    company._id = company._id.toString();

    return new Response(JSON.stringify(company), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/companies/name/[name] error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
