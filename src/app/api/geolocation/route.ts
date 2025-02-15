import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { lat, lon } = await req.json();

    // Store the location in a database (mock example)
    console.log("Received Location:", lat, lon);

    return NextResponse.json({ message: "Location saved successfully", lat, lon });
  } catch (error) {
    return NextResponse.json({ error: "Error saving location" }, { status: 500 });
  }
}
