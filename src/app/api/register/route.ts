import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect"; 
import User from "../../../models/User"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await dbConnect();

  try {
    const { clerkId, email, name } = req.body;

    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ clerkId, email, name });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
