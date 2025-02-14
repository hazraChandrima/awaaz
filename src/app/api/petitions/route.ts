import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Petition from "@/models/Petition";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const {
      title,
      description,
      image_url,
      category,
      scope,
      location,
      goal,
      expiry,
    } = data;

    if (
      !title ||
      !description ||
      !image_url ||
      !scope ||
      !location ||
      !goal ||
      !expiry
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPetition = new Petition({
      title,
      desc: description,
      image: image_url,
      category: category || null,
      scope,
      user: userId,
      location,
      goal,
      expiry: new Date(expiry),
    });

    await newPetition.save();

    return NextResponse.json(
      { message: "Petition created successfully", petition: newPetition },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/petitions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}