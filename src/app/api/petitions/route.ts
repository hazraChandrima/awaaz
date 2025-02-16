import { NextResponse } from "next/server";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { IPetition } from "@/interfaces/Petition";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "petitions"));
    const petitions: IPetition[] = [];

    querySnapshot.forEach((doc) => {
      const petitionData = doc.data();

      const petition: IPetition = {
        id: doc.id,
        title: petitionData.title,
        description: petitionData.description,
        image_url: petitionData.image_url,
        category: petitionData.category,
        scope: petitionData.scope,
        userId: petitionData.userId,
        location: petitionData.location,
        goal: petitionData.goal,
        signed_users: petitionData.signed_users || [],
        createdAt:
          petitionData.createdAt instanceof Timestamp
            ? petitionData.createdAt.toDate()
            : new Date(),
        updatedAt:
          petitionData.updatedAt instanceof Timestamp
            ? petitionData.updatedAt.toDate()
            : new Date(),
      };

      petitions.push(petition);
    });

    return NextResponse.json({ petitions }, { status: 200 });
  } catch (error) {
    console.error("Error in petitions route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
