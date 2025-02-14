import { NextResponse } from 'next/server';
import { Clerk } from '@clerk/nextjs/server';
import clientPromise from '../../../lib/mongodb';

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json();
    
    if (action === 'sign-up') {
      // Create user with Clerk
      const user = await clerk.users.createUser({
        emailAddress: [email],
        password,
      });

      // Optionally store additional user data in MongoDB
      const client = await clientPromise;
      const db = client.db('sample_mflix');
      await db.collection('users').insertOne({
        clerkUserId: user.id,
        email,
        createdAt: new Date(),
      });

      return NextResponse.json({
        message: 'User created successfully',
        user,
        status: 201,
      });
    } else if (action === 'sign-in') {
      // Handle sign-in logic
      return NextResponse.json({
        message: 'Sign-in successful',
        status: 200,
      });
    } else {
      return NextResponse.json({
        error: 'Invalid action',
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Authentication failed',
      status: 500,
    });
  }
}
