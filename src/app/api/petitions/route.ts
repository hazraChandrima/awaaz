import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { IPetition } from "@/interfaces/Petition";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "petitions"));
    const petitions: IPetition[] = [];

    querySnapshot.forEach((doc) => {
      const petitionData = doc.data() as IPetition;
      petitions.push({
        ...petitionData,
        id: doc.id, 
      });
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