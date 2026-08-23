import Link from "next/link";
import { Landmark } from "lucide-react";
import { STATES } from "@/lib/states";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { t } from "@/lib/translation";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function StateDirectoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Prefer real, live counts from Supabase when it's configured and has
  // data; otherwise each state falls back to its real curated count from
  // lib/states.ts (derived from lib/fallbackSchemes.ts - never an
  // arbitrary/fake number).
  const supabase = getPublicSupabase();
  let liveCounts: Record<string, number> | null = null;

  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("state_id, states(slug)")
      .eq("category", "state")
      .eq("status", "active");

    if (data) {
      liveCounts = {};
      for (const row of data as any[]) {
        const slug = row.states?.slug;
        if (slug) liveCounts[slug] = (liveCounts[slug] || 0) + 1;
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-primary font-bold uppercase tracking-wider text-xs bg-green-50 px-3 py-1 rounded-full">
          {t(lang, "state_section_badge")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mt-2">{t(lang, "state_section_title")}</h1>
        <p className="text-gray-600 text-sm mt-1">{t(lang, "state_section_subtitle")}</p>
        <p className="text-xs text-gray-400 mt-1">{STATES.length} states</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {STATES.map((state) => {
          const count = liveCounts ? liveCounts[state.slug] || 0 : state.schemes;
          return (
            <Link
              key={state.slug}
              href={`/${lang}/state/${state.slug}`}
              className="group p-5 bg-white border border-gray-200 rounded-2xl hover:border-primary hover:bg-green-50/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <Landmark className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-bold text-darkgray group-hover:text-primary text-lg">{state.name}</h3>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>{count} {t(lang, "active_schemes_label")}</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
