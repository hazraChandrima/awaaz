import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

interface GenerativeResponse {
  response: {
    candidates?: { content: string }[];
  };
}

export async function POST(req: NextRequest) {
  try {
    const { prompts }: { prompts: string[] } = await req.json();

    if (!Array.isArray(prompts) || prompts.length === 0) {
      return NextResponse.json({ error: "Invalid prompts array" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const responses: string[] = [];

    for (const prompt of prompts) {
      const result = (await model.generateContent(prompt)) as GenerativeResponse;

      const responseText = result.response?.candidates?.[0]?.content ?? "No response";
      responses.push(responseText);
    }

    return NextResponse.json({ responses }, { status: 200 });

  } catch (error: unknown) {
    console.error("Error generating content:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate content", details: errorMessage },
      { status: 500 }
    );
  }
}
