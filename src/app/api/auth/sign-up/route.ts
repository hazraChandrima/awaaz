import { NextResponse } from "next/server";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { IUser } from "@/interfaces/User";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, password } = data;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    const userData: IUser = {
      id: userId,
      role: "user",
      firstname: firstName,
      lastname: lastName,
      email: email,
      profile_image: "",
      location: "", 
      phone_number: "",
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await addDoc(collection(db, "users"), {
      ...userData
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: userId,
          firstName,
          lastName,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in users route:", error);

    if (error.code === "auth/email-already-in-use") {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}