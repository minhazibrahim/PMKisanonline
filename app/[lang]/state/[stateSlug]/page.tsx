import { notFound } from "next/navigation";
import SchemeCard from "@/components/SchemeCard";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { findState } from "@/lib/states";
import { fallbackSchemesForState } from "@/lib/fallbackSchemes";
import { t } from "@/lib/translation";
import type { Scheme } from "@/types";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function StateSchemesPage({
  params,
}: {
  params: Promise<{ lang: string; stateSlug: string }>;
}) {
  const { lang, stateSlug } = await params;
  const state = findState(stateSlug);

  if (!state) {
    notFound();
  }

  const supabase = getPublicSupabase();
  // The `!inner` hint on the embedded "states" relation is required for
  // .eq("states.slug", ...) to actually filter the outer "posts" rows -
  // without it, PostgREST ignores the filter and the query either returns
  // every state's schemes or none, which is why nothing matched before.
  const { data } = supabase
    ? await supabase
        .from("posts")
        .select("*, states!inner(name, slug)")
        .eq("category", "state")
        .eq("states.slug", stateSlug)
        .eq("status", "active")
        .order("created_at", { ascending: false })
    : { data: null };

  // Prefer live Supabase data; fall back to real curated content for this
  // state when Supabase isn't configured yet or has nothing published.
  const schemes: Scheme[] = data && data.length > 0 ? data : fallbackSchemesForState(stateSlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-primary font-bold uppercase tracking-wider text-xs bg-green-50 px-3 py-1 rounded-full">
          🏛️ {state.name}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mt-2">
          {state.name} {t(lang, "state_page_heading_suffix")}
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {t(lang, "state_page_subtitle_prefix")} {state.name}.
        </p>
      </div>

      {schemes.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
          {t(lang, "no_schemes_found")}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
