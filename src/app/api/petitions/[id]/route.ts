import { NextResponse } from "next/server";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
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

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const petitionId = params.id;

    if (!petitionId) {
      return NextResponse.json({ error: "Petition ID is required" }, { status: 400 });
    }

    const petitionRef = doc(db, "petitions", petitionId);
    const petitionSnap = await getDoc(petitionRef);

    if (!petitionSnap.exists()) {
      return NextResponse.json({ error: "Petition not found" }, { status: 404 });
    }

    await deleteDoc(petitionRef);
    return NextResponse.json({ message: "Petition deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting petition:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
