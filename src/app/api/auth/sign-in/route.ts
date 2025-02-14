import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
  
    return NextResponse.json({email:email,password:password});
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Authentication failed',
      status: 500,
    });
  }
}
