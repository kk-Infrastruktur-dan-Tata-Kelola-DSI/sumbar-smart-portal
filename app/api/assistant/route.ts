import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AIMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type RequestBody = {
  messages?: AIMessage[];
  prompt?: string;
  model?: string;
  stream?: boolean;
};

// Use models actually available for this API key (verified via ListModels)
// Your key has Gemini 2.5 and 2.0, but NOT 1.5
const DEFAULT_MODEL = "gemini-2.5-flash";
const MODEL_FALLBACKS = [
  "gemini-flash-latest",
  "gemini-2.0-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash-lite",
];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    let body: RequestBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { messages, prompt, model = DEFAULT_MODEL, stream = false } = body;

    // Prefer prompt; fallback to last user message if messages are provided
    let finalPrompt = (prompt ?? "").trim();
    if (!finalPrompt && Array.isArray(messages) && messages.length > 0) {
      const lastUser = [...messages].reverse().find((m) => m.role === "user");
      finalPrompt = (lastUser?.content ?? "").trim();
    }
    if (!finalPrompt) {
      return NextResponse.json(
        { error: "Provide a 'prompt' or at least one user message" },
        { status: 400 }
      );
    }

    // Use official Google Generative AI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try requested model with fallbacks
    const modelsToTry = uniqueModels([model, ...MODEL_FALLBACKS]);
    let geminiModel = null;
    let lastError: Error | null = null;

    for (const m of modelsToTry) {
      try {
        geminiModel = genAI.getGenerativeModel({ model: m });
        break; // SDK will throw on generate if model not found
      } catch (e: any) {
        lastError = e;
        continue;
      }
    }

    if (!geminiModel) {
      return NextResponse.json(
        {
          error: "Gemini API error",
          details: lastError?.message || "No compatible model found",
        },
        { status: 404 }
      );
    }

    // Streaming mode
    if (stream) {
      try {
        const result = await geminiModel.generateContentStream(finalPrompt);
        const encoder = new TextEncoder();
        
        const streamBody = new ReadableStream<Uint8Array>({
          async start(controller) {
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                  controller.enqueue(encoder.encode(text));
                }
              }
              controller.close();
            } catch (err: any) {
              controller.error(err);
            }
          },
        });

        return new Response(streamBody, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
          },
        });
      } catch (err: any) {
        return NextResponse.json(
          { error: "Gemini streaming error", details: err.message },
          { status: 500 }
        );
      }
    }

    // Non-streaming mode
    try {
      const result = await geminiModel.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();

      return new Response(text || "(no response)", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    } catch (err: any) {
      return NextResponse.json(
        { error: "Gemini API error", details: err.message },
        { status: 500 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

// Helper: deduplicate model list
function uniqueModels(models: (string | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of models) {
    if (!m) continue;
    const v = m.trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}
