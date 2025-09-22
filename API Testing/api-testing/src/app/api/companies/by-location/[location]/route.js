import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { location } = params;

    if (!location) {
      return NextResponse.json(
        { error: "Location parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("workbook");
    const coll = db.collection("companies");

    // Case-insensitive location search
    const items = await coll
      .find({ location: { $regex: new RegExp(`^${location}$`, "i") } })
      .toArray();

    return NextResponse.json({ count: items.length, items }, { status: 200 });
  } catch (err) {
    console.error("GET /api/companies/by-location error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}