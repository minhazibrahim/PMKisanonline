import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/supabaseServer";
import type { ParsedSchemeDraft } from "@/types";

const SYSTEM_PROMPT = `You extract structured data from Indian government farmer-scheme announcements.
Given raw text (a notification, news snippet, or press release), respond with ONLY a JSON object
(no markdown fences, no commentary) matching this shape:
{
  "title": string,
  "category": "central" | "state",
  "benefit": string,          // short benefit summary, e.g. "₹6,000 / Year"
  "last_date": string,        // e.g. "31 March 2026" or "Ongoing"
  "short_summary": string,    // 1-2 sentences
  "description": string,      // full detail, a few paragraphs
  "eligibility": string[],
  "documents_required": string[],
  "how_to_apply": string,
  "state_name": string | null // null if it's a central scheme
}`;

/**
 * POST /api/ai-parser
 * Admin-only: takes raw pasted scheme text and asks Claude to turn it into
 * a structured draft that pre-fills the "Add Scheme" admin form.
 * Body: { text: string }
 */
export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured on the server" },
      { status: 500 }
    );
  }

  const { text } = await request.json();
  if (!text || typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: text }],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    return NextResponse.json({ error: `AI parser failed: ${errText}` }, { status: 502 });
  }

  const data = await response.json();
  const textBlock = data.content?.find((block: any) => block.type === "text");

  if (!textBlock) {
    return NextResponse.json({ error: "AI parser returned no content" }, { status: 502 });
  }

  let parsed: ParsedSchemeDraft;
  try {
    const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ error: "Could not parse AI response as JSON" }, { status: 502 });
  }

  return NextResponse.json({ draft: parsed });
}
