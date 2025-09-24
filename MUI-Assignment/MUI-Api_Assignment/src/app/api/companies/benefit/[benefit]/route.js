import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extract benefit from the request URL
    const url = new URL(request.url);
    const benefit = decodeURIComponent(url.pathname.split("/").pop());

    if (!benefit) {
      return NextResponse.json(
        { error: "Benefit parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("workbook");
    const coll = db.collection("companies");

    // Case-insensitive match inside benefits array
    const items = await coll
      .find({ benefits: { $regex: new RegExp(benefit, "i") } })
      .toArray();

    return NextResponse.json({ count: items.length, items }, { status: 200 });
  } catch (err) {
    console.error("GET /api/companies/benefit error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
