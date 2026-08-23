"use client";

import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { t } from "@/lib/translation";

/**
 * LLM INTEGRATION PLACEHOLDER
 * ----------------------------------------------------------------------
 * This is a UI placeholder for a future farmer-facing AI assistant (e.g.
 * "which scheme am I eligible for?" / "explain this scheme in simple
 * terms"). It intentionally does NOT call any AI API yet - it only shows
 * a coming-soon panel - so it can't incur cost or introduce a new attack
 * surface until it's wired up on purpose.
 *
 * The site already has a working LLM integration for admins: see
 * app/api/ai-parser/route.ts, which uses the Claude API (ANTHROPIC_API_KEY)
 * to auto-fill the "Add Scheme" form from pasted scheme text. That one is
 * real and functional - this component is a separate, public-facing
 * placeholder for a farmer chat assistant.
 *
 * TO WIRE THIS UP LATER:
 * 1. Create a new route, e.g. app/api/ask-ai/route.ts, following the same
 *    pattern as app/api/ai-parser/route.ts (call the Anthropic Messages
 *    API with ANTHROPIC_API_KEY, but WITHOUT the admin-only auth check -
 *    this one is public-facing).
 * 2. Replace the "coming soon" message below with a real chat UI that
 *    POSTs the farmer's question (plus `lang`) to that route and streams
 *    back the answer.
 * 3. Consider rate-limiting this route since it would be publicly
 *    callable (unlike /api/ai-parser which requires an admin login).
 */
export default function AskAiPlaceholder({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask AI (coming soon)"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 bg-gold text-darkgray font-bold rounded-full shadow-lg hover:bg-amber-400 transition"
      >
        <Sparkles className="w-5 h-5" />
        <span className="hidden sm:inline text-sm">{t(lang, "ask_ai_button")}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4 pb-4 sm:pb-0">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-darkgray">{t(lang, "ask_ai_button")}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{t(lang, "ask_ai_coming_soon")}</p>
          </div>
        </div>
      )}
    </>
  );
}
