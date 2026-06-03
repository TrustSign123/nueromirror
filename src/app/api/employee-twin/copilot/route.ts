import { NextRequest, NextResponse } from "next/server";
import { askCopilot } from "@/lib/openai-rag";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      message?: string;
      history?: Array<{ role: "user" | "assistant"; content: string }>;
      vectorStoreId?: string | null;
      reportSummary?: string;
    };

    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const answer = await askCopilot({
      message: body.message,
      history: body.history,
      vectorStoreId: body.vectorStoreId,
      reportSummary: body.reportSummary
    });

    return NextResponse.json({ answer });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to reach the health copilot.";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
