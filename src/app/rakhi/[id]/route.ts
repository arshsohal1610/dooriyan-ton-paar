import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await clientPromise;

    const db = client.db("doorian-ton-paar");

    const record = await db.collection("rakhis").findOne(
      { id },
      { projection: { _id: 0 } }
    );

    if (!record) {
      return NextResponse.json(
        { error: "Rakhi not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("GET Rakhi error:", error);

    return NextResponse.json(
      { error: "Failed to load Rakhi" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await request.json();

    if (record.id !== id) {
      return NextResponse.json(
        { error: "Invalid Rakhi ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;

    const db = client.db("doorian-ton-paar");

    await db.collection("rakhis").replaceOne(
      { id },
      record,
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST Rakhi error:", error);

    return NextResponse.json(
      { error: "Failed to save Rakhi" },
      { status: 500 }
    );
  }
}