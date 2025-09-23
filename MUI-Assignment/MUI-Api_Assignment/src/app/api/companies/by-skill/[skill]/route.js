import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extract 'skill' from URL path dynamically
    const url = new URL(request.url);
    const segments = url.pathname.split("/");
    const skill = segments[segments.length - 1]; // last segment

    if (!skill) {
      return NextResponse.json({ error: "Skill parameter is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const coll = db.collection("companies");

    // Case-insensitive skill search
    const items = await coll
      .find({ "hiringCriteria.skills": { $regex: new RegExp(`^${skill}$`, "i") } })
      .toArray();

    return NextResponse.json({ count: items.length, items }, { status: 200 });
  } catch (err) {
    console.error("GET /api/companies/by-skill error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
