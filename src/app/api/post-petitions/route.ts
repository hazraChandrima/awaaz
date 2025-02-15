import { NextResponse } from "next/server";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { IPetition } from "@/interfaces/Petition";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      title,
      description,
      image_url = "",
      category = "General",
      scope,
      userId,
      location = "",
      goal,
    } = data;

    if (!title || !description || !scope || !userId || !goal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Construct petition data
    const petitionData: IPetition = {
      title,
      description,
      image_url,
      category,
      scope,
      userId,
      location,
      signed_users:[],
      goal,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save petition to Firestore
    const docRef = await addDoc(collection(db, "petitions"), petitionData);
return NextResponse.json({message:docRef.id});
    // return NextResponse.json(
    //   { message: "Petition created successfully", petitionId: docRef.id },
    //   { status: 201 }
    // );
  } catch (error) {
    console.error("Error in petitions route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}