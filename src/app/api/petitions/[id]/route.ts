import { NextResponse } from "next/server";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../firebase";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const docRef = doc(db, "petitions", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json(
        { message: "Petition not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching petition data:", error);
    return NextResponse.json(
      { message: "Error fetching petition data" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const docRef = doc(db, "petitions", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { message: "Petition not found" },
        { status: 404 }
      );
    }

    const petitionData = docSnap.data();

    // Check if user already signed
    if (petitionData.signed_users.includes(userId)) {
      return NextResponse.json(
        { message: "User already signed this petition" },
        { status: 400 }
      );
    }

    // Add user to signed_users array
    await updateDoc(docRef, {
      signed_users: arrayUnion(userId),
    });

    return NextResponse.json(
      { message: "Signature added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding signature:", error);
    return NextResponse.json(
      { message: "Error adding signature" },
      { status: 500 }
    );
  }
}
