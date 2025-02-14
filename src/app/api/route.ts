import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req:NextApiRequest, res:NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix');
    const collection = db.collection('comments');
    const data = await collection.find({}).limit(10).toArray();

    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'Failed to fetch data from MongoDB',
      status: 500,
    });
  }
}