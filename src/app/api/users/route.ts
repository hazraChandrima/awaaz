import { NextResponse } from "next/server";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { IUser } from "@/interfaces/User";

const usersCollection = collection(db, "users");

export async function GET() {
  try {
    const querySnapshot = await getDocs(usersCollection);
    const users: IUser[] = querySnapshot.docs.map(doc => {
      const data = doc.data();

      const user: IUser = {
        id: doc.id,
        role: data.role ?? "user", 
        firstname: data.firstname ?? "",
        lastname: data.lastname ?? "",
        email: data.email ?? "",
        profile_image: data.profile_image ?? "",
        location: data.location ?? "",
        phone_number: data.phone_number ?? "",
        verified: data.verified ?? false,
        createdAt: data.createdAt?.toDate?.() ?? new Date(),
        updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
      };

      return user;
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<IUser> = await request.json();

    if (!body.email || !body.firstname || !body.lastname || !body.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newUserRef = await addDoc(usersCollection, {
      ...body,
      role: body.role ?? "user", // Default role to "user"
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });

    return NextResponse.json({ id: newUserRef.id, ...body }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
