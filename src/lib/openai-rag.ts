import { ReportAnalysisResult } from "@/features/employee-twin/types";

const OPENAI_API_BASE = "https://api.openai.com/v1";
const DEFAULT_MODEL = "gpt-4.1-mini";

let runtimeVectorStoreId: string | null = null;

type OpenAIFile = {
  id: string;
  filename?: string;
};

type VectorStoreFile = {
  id: string;
  status?: "in_progress" | "completed" | "cancelled" | "failed";
  last_error?: { message?: string } | null;
};

type ResponseOutput = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
      type?: string;
    }>;
  }>;
};

function getApiKey() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }
  return apiKey;
}

async function openaiFetch<T>(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${getApiKey()}`);

  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${OPENAI_API_BASE}${path}`, {
    ...init,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${errorText}`);
  }

  return (await response.json()) as T;
}

export async function uploadReportFile(file: File) {
  const formData = new FormData();
  formData.append("purpose", "user_data");
  formData.append("file", file, file.name);

  return openaiFetch<OpenAIFile>("/files", {
    method: "POST",
    body: formData
  });
}

export async function getOrCreateVectorStore() {
  if (process.env.OPENAI_VECTOR_STORE_ID) {
    return process.env.OPENAI_VECTOR_STORE_ID;
  }

  if (runtimeVectorStoreId) {
    return runtimeVectorStoreId;
  }

  const vectorStore = await openaiFetch<{ id: string }>("/vector_stores", {
    method: "POST",
    body: JSON.stringify({
      name: "Neuromirror employee health reports",
      expires_after: {
        anchor: "last_active_at",
        days: 30
      }
    })
  });

  runtimeVectorStoreId = vectorStore.id;
  return vectorStore.id;
}

export async function attachFileToVectorStore(vectorStoreId: string, fileId: string) {
  const vectorStoreFile = await openaiFetch<VectorStoreFile>(`/vector_stores/${vectorStoreId}/files`, {
    method: "POST",
    body: JSON.stringify({
      file_id: fileId
    })
  });

  return waitForVectorStoreFile(vectorStoreId, vectorStoreFile.id);
}

async function waitForVectorStoreFile(vectorStoreId: string, vectorStoreFileId: string) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const vectorStoreFile = await openaiFetch<VectorStoreFile>(`/vector_stores/${vectorStoreId}/files/${vectorStoreFileId}`);

    if (vectorStoreFile.status === "completed") {
      return vectorStoreFile;
    }

    if (vectorStoreFile.status === "failed" || vectorStoreFile.status === "cancelled") {
      throw new Error(vectorStoreFile.last_error?.message ?? "The report could not be indexed for search.");
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  throw new Error("The report is still indexing. Please try again in a moment.");
}

function getOutputText(response: ResponseOutput) {
  if (response.output_text) {
    return response.output_text;
  }

  return (
    response.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => content.text ?? "")
      .join("\n")
      .trim() ?? ""
  );
}

function parseJsonObject(text: string) {
  const clean = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  const match = clean.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("The model response did not include JSON.");
  }

  return JSON.parse(match[0]) as Omit<ReportAnalysisResult, "fileName" | "fileId" | "vectorStoreId">;
}

export async function analyzeReportFromVectorStore(params: {
  file: OpenAIFile;
  vectorStoreId: string;
}) {
  const response = await openaiFetch<ResponseOutput>("/responses", {
    method: "POST",
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? DEFAULT_MODEL,
      tools: [
        {
          type: "file_search",
          vector_store_ids: [params.vectorStoreId]
        }
      ],
      input: [
        {
          role: "system",
          content:
            "You are NeuroMirror's health report analysis engine. Extract lab markers from the uploaded report using file search. Do not diagnose. Return only valid JSON."
        },
        {
          role: "user",
          content:
            "Analyze the latest uploaded employee health report. Return JSON with keys: summary string, biomarkers array of {name,value,unit,status,note}, organInsights array of {organ,score,risk,insight}, recommendations array of strings. Status must be one of Normal, Low, Borderline, High. Keep values short and dashboard-ready."
        }
      ]
    })
  });

  const parsed = parseJsonObject(getOutputText(response));

  return {
    ...parsed,
    fileName: params.file.filename,
    fileId: params.file.id,
    vectorStoreId: params.vectorStoreId
  } satisfies ReportAnalysisResult;
}

export async function askCopilot(params: {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  vectorStoreId?: string | null;
  reportSummary?: string;
}) {
  const vectorStoreId = params.vectorStoreId ?? process.env.OPENAI_VECTOR_STORE_ID ?? runtimeVectorStoreId;
  const tools = vectorStoreId
    ? [
        {
          type: "file_search",
          vector_store_ids: [vectorStoreId]
        }
      ]
    : undefined;

  const response = await openaiFetch<ResponseOutput>("/responses", {
    method: "POST",
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? DEFAULT_MODEL,
      tools,
      input: [
        {
          role: "system",
          content:
            "You are NeuroMirror AI Health Copilot. Answer from the uploaded health report when available. Be concise, cite uncertainty, and say this is informational guidance rather than diagnosis."
        },
        ...(params.history ?? []).slice(-8).map((item) => ({
          role: item.role,
          content: item.content
        })),
        {
          role: "user",
          content: `${params.reportSummary ? `Latest report summary: ${params.reportSummary}\n\n` : ""}${params.message}`
        }
      ]
    })
  });

  return getOutputText(response);
}
