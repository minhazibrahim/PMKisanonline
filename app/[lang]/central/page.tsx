import SchemeCard from "@/components/SchemeCard";
import SearchBar from "@/components/SearchBar";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { CENTRAL_SCHEMES } from "@/lib/fallbackSchemes";
import { t } from "@/lib/translation";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function CentralSchemesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const supabase = getPublicSupabase();
  const { data } = supabase
    ? await supabase
        .from("posts")
        .select("*, states(name, slug)")
        .eq("category", "central")
        .eq("status", "active")
        .order("created_at", { ascending: false })
    : { data: null };

  const schemes = data && data.length > 0 ? data : CENTRAL_SCHEMES;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-primary font-bold uppercase tracking-wider text-xs bg-green-50 px-3 py-1 rounded-full">
          {t(lang, "govt_of_india_badge")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mt-2">{t(lang, "central_schemes")}</h1>
        <p className="text-gray-600 text-sm mt-1">{t(lang, "central_page_subtitle")}</p>
      </div>

      <SearchBar lang={lang} className="max-w-xl" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {schemes.map((scheme: any) => (
          <SchemeCard key={scheme.id} scheme={scheme} lang={lang} />
        ))}
      </div>
    </div>
  );
}
