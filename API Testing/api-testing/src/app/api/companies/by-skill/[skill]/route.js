import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const params = await context.params; // ✅ await params
    const { skill } = params;

    if (!skill) {
      return NextResponse.json(
        { error: "Skill parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("workbook");
    const coll = db.collection("companies");

    // Case-insensitive skill search
    const items = await coll
      .find({
        "hiringCriteria.skills": { $regex: new RegExp(`^${skill}$`, "i") },
      })
      .toArray();

    return NextResponse.json({ count: items.length, items }, { status: 200 });
  } catch (err) {
    console.error("GET /api/companies/by-skill error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
