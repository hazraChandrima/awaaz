import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const { userId, email } = req.body;

    // Upsert user data (insert if new, update if existing)
    await db.collection("users").updateOne(
      { userId }, // Find by userId
      { $set: { email, createdAt: new Date() } },
      { upsert: true } // Create if not exists
    );

    res.status(200).json({ message: "User stored successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database Error" });
  }
}
