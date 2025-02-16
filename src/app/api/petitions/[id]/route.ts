import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, arrayUnion, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Ensure params is awaited

  try {
    const docRef = doc(db, "petitions", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json({ message: "Petition not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching petition data:", error);
    return NextResponse.json({ message: "Error fetching petition data" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    const docRef = doc(db, "petitions", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ message: "Petition not found" }, { status: 404 });
    }

    const petitionData = docSnap.data();

    if (petitionData.signed_users.includes(userId)) {
      return NextResponse.json({ message: "User already signed this petition" }, { status: 400 });
    }

    await updateDoc(docRef, { signed_users: arrayUnion(userId) });

    return NextResponse.json({ message: "Signature added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error adding signature:", error);
    return NextResponse.json({ message: "Error adding signature" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    if (!id) {
      return NextResponse.json({ error: "Petition ID is required" }, { status: 400 });
    }

    const petitionRef = doc(db, "petitions", id);
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
