import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { IPetition } from "@/interfaces/Petition";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); 

    if (!id) {
      return NextResponse.json(
        { error: "Petition ID is required" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "petitions", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Petition not found" }, { status: 404 });
    }

    const petitionData = docSnap.data() as IPetition;
    return NextResponse.json(
      { ...petitionData, id: docSnap.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in petitions/[id] route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
