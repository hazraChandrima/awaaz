import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const data = await req.json();
    const { firstName, lastName, email, password } = data;

    return NextResponse.json({
      firstName,
      lastName,
      email,
      password,
    });

    
  } catch (error) {
    console.error("Error in users route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
