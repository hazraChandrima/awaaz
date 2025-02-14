import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      title,
      descrition,
      image_url,
      category,
      scope,
      clerkId,
      location,
      goal,
    } = data;

    return NextResponse.json({
      title,
      descrition,
      image_url,
      category,
      scope,
      clerkId,
      location,
      goal,
    });
  } catch (error) {
    console.error("Error in users route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}