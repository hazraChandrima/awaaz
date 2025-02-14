import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {5
    const client = await clientPromise;
    const db = client.db('test_db');
    const collection = db.collection('awaaz');
    const data = await collection.find({}).limit(10).toArray();

    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to fetch data from MongoDB',
      status: 500,
    });
  }
}