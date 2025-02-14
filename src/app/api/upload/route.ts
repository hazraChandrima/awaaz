import { NextRequest, NextResponse } from "next/server";
import imagekit from "@/utils/imagekit"; 

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await imagekit.upload({
      file: buffer, // File Buffer
      fileName: file.name, // Image Name
      folder: "/petitions", // ImageKit Folder
    });

    return NextResponse.json({ url: response.url });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
