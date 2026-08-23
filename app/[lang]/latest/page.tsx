import SchemeCard from "@/components/SchemeCard";
import SearchBar from "@/components/SearchBar";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { ALL_FALLBACK_SCHEMES } from "@/lib/fallbackSchemes";
import { t } from "@/lib/translation";
import type { Scheme } from "@/types";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function LatestSchemesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { lang } = await params;
  const { q } = await searchParams;

  const supabase = getPublicSupabase();
  let schemes: Scheme[] = [];
  let usedSupabase = false;

  if (supabase) {
    let query = supabase
      .from("posts")
      .select("*, states(name, slug)")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(24);

    if (q) {
      query = query.ilike("title", `%${q}%`);
    }

    const { data } = await query;
    schemes = data || [];
    usedSupabase = true;
  }

  // Fall back to real curated content when Supabase isn't configured yet.
  if (!usedSupabase) {
    schemes = q
      ? ALL_FALLBACK_SCHEMES.filter((s) => s.title.toLowerCase().includes(q.toLowerCase()))
      : ALL_FALLBACK_SCHEMES;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-primary font-bold uppercase tracking-wider text-xs bg-green-50 px-3 py-1 rounded-full">
          {t(lang, "real_time_badge")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mt-2">
          {t(lang, "latest_schemes_heading")}
        </h1>
        <p className="text-gray-600 text-sm mt-1">{t(lang, "latest_page_subtitle")}</p>
      </div>

      <SearchBar lang={lang} className="max-w-xl" />

      {q && (
        <p className="text-sm text-gray-600">
          {t(lang, "showing_results_for")} <strong className="text-darkgray">&ldquo;{q}&rdquo;</strong>
        </p>
      )}

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
