import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongodb";

export async function POST() {
  const { userId, sessionId } = auth();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDB();

  const userData = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    },
  }).then((res) => res.json());

  const { id, email_addresses, first_name, last_name } = userData;

  let user = await User.findOne({ clerkId: id });

  if (!user) {
    user = new User({
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
    });

    await user.save();
  }

  return NextResponse.json({ message: "User synced with MongoDB" });
}
