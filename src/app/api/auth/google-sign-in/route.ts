import { NextResponse } from "next/server";
import { auth, db } from "@/firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { IUser } from "@/interfaces/User";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const token = data.token;

    if (!token) {
      return NextResponse.json(
        { error: "Google OAuth token is missing" },
        { status: 400 }
      );
    }

    // Use token to authenticate server-side
    const credential = GoogleAuthProvider.credential(token);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      const userData: IUser = {
        id: user.uid,
        role: "user",
        firstname: user.displayName?.split(" ")[0] || "",
        lastname: user.displayName?.split(" ")[1] || "",
        email: user.email || "",
        profile_image: user.photoURL || "",
        location: "",
        phone_number: "",
        verified: user.emailVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(userRef, userData);
    }

    return NextResponse.json(
      {
        message: "User signed in successfully",
        user: {
          id: user.uid,
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email,
          profile_image: user.photoURL,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Google sign-in API:", error);

    return NextResponse.json(
      { error: "Google sign-in failed" },
      { status: 500 }
    );
  }
}
