import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: 'Failed to create user',
      status: 500,
    });
  }
}
