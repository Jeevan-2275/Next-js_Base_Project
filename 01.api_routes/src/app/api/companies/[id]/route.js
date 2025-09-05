import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/companies/[id]
export async function GET(req, { params }) {
  const { id } = await params;   // ✅ FIX: await params

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("placementDB");

    const company = await db.collection("companies").findOne({ _id: new ObjectId(id) });

    if (!company) {
      return new Response(JSON.stringify({ error: "Company not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ ...company, _id: company._id.toString() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/companies/[id] error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// PUT /api/companies/[id]
export async function PUT(req, { params }) {
  const { id } = await params;   // ✅ FIX: await params

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("placementDB");

    const result = await db.collection("companies").updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    return new Response(
      JSON.stringify({ message: "Company updated", modifiedCount: result.modifiedCount }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("PUT /api/companies/[id] error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// DELETE /api/companies/[id]
export async function DELETE(req, { params }) {
  const { id } = await params;   // ✅ FIX: await params

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("placementDB");

    const result = await db.collection("companies").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Company not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Company deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("DELETE /api/companies/[id] error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
