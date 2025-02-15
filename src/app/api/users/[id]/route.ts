import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore"; // Use getDoc to fetch a single document by its ID
import { db } from "@/firebase"; // Assuming this is where your Firestore instance is initialized
import { IUser } from "@/interfaces/User"; // Assuming you have an interface for User

// Assuming you're passing the `userId` as a query parameter
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Fetch the user document from Firestore using the userId
    const userDocRef = doc(db, "users", userId); // 'users' is the collection name
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Extract the user data from the document
    const userData: IUser = userDoc.data() as IUser;

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
