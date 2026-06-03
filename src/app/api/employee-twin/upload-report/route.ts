import { NextRequest, NextResponse } from "next/server";
import {
  analyzeReportFromVectorStore,
  attachFileToVectorStore,
  deleteOpenAIFile,
  getOrCreateVectorStore,
  removeFileFromVectorStore,
  uploadReportFile
} from "@/lib/openai-rag";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Upload a PDF report file." }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF reports are enabled for live AI analysis right now." }, { status: 400 });
    }

    const uploadedFile = await uploadReportFile(file);
    const vectorStoreId = await getOrCreateVectorStore();
    const vectorStoreFile = await attachFileToVectorStore(vectorStoreId, uploadedFile.id);
    const analysis = await analyzeReportFromVectorStore({
      file: uploadedFile,
      vectorStoreId
    });

    if (!analysis.isRelevant) {
      await removeFileFromVectorStore(vectorStoreId, vectorStoreFile.id);
      await deleteOpenAIFile(uploadedFile.id);
    }

    return NextResponse.json(analysis);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to analyze this report.";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
