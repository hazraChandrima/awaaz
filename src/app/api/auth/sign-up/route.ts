import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {

    const data = await req.json();
    const { firstName, lastName, email, clerkId } = data;
    console.log({ firstName, lastName, email, clerkId });

    return NextResponse.json({
      firstName,
      lastName,
      email,
      clerkId,
    });

    
  } catch (error) {
    console.error('Error in users route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}