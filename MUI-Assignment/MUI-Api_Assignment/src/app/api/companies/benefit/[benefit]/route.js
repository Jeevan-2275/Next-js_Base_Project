import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { benefit } = params;

    if (!benefit) {
      return NextResponse.json(
        { error: "Benefit parameter is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("workbook");
    const coll = db.collection("companies");

    // Case-insensitive, substring match inside benefits array
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