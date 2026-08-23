import Hero from "@/components/Hero";
import IndiaMapSection from "@/components/IndiaMap";
import SchemeCard from "@/components/SchemeCard";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { ALL_FALLBACK_SCHEMES } from "@/lib/fallbackSchemes";
import { t } from "@/lib/translation";
import { SUPPORTED_LANGUAGES } from "@/types";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Fetch live schemes (and a real total active count) from Supabase when
  // configured; otherwise fall back to real curated scheme content so the
  // "Active Schemes" number shown is never an arbitrary/fake figure.
  const supabase = getPublicSupabase();
  const { data: latestSchemes } = supabase
    ? await supabase
        .from('posts')
        .select('*, states(name, slug)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(8)
    : { data: null };

  let totalActiveCount = ALL_FALLBACK_SCHEMES.length;
  if (supabase) {
    const { count } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');
    if (typeof count === 'number') totalActiveCount = count;
  }

  const sampleSchemes = latestSchemes && latestSchemes.length > 0 ? latestSchemes : ALL_FALLBACK_SCHEMES.slice(0, 8);

  return (
    <div className="space-y-12 pb-16">
      <Hero lang={lang} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Latest Schemes Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-xs bg-green-50 px-3 py-1 rounded-full">
                {t(lang, "real_time_badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-darkgray mt-2">{t(lang, "latest_schemes_heading")}</h2>
            </div>
            <a href={`/${lang}/latest`} className="text-primary font-bold hover:underline text-sm">
              {t(lang, "view_all")} ({totalActiveCount} {t(lang, "active_schemes_label")}) →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleSchemes.map((scheme: any) => (
              <SchemeCard key={scheme.id} scheme={scheme} lang={lang} />
            ))}
          </div>
        </section>

        {/* State Government Interactive Section */}
        <IndiaMapSection lang={lang} />

        {/* Farming Guides & Help */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 border border-green-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-darkgray">{t(lang, "guides_section_title")}</h2>
            <p className="text-gray-600 text-sm mt-1">{t(lang, "guides_section_subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div data-scroll-fade className="bg-white p-5 rounded-2xl shadow-sm border border-green-100">
              <span className="text-2xl mb-2 block">📑</span>
              <h3 className="font-bold text-darkgray mb-1">{t(lang, "guide_aadhaar_title")}</h3>
              <p className="text-xs text-gray-500 mb-3">{t(lang, "guide_aadhaar_summary")}</p>
              <a href={`/${lang}/guides`} className="text-xs font-bold text-primary hover:underline">{t(lang, "guides_read_guide")} →</a>
            </div>
            <div data-scroll-fade className="bg-white p-5 rounded-2xl shadow-sm border border-green-100">
              <span className="text-2xl mb-2 block">🗺️</span>
              <h3 className="font-bold text-darkgray mb-1">{t(lang, "guide_land_title")}</h3>
              <p className="text-xs text-gray-500 mb-3">{t(lang, "guide_land_summary")}</p>
              <a href={`/${lang}/guides`} className="text-xs font-bold text-primary hover:underline">{t(lang, "guides_read_guide")} →</a>
            </div>
            <div data-scroll-fade className="bg-white p-5 rounded-2xl shadow-sm border border-green-100">
              <span className="text-2xl mb-2 block">💳</span>
              <h3 className="font-bold text-darkgray mb-1">{t(lang, "guide_kcc_title")}</h3>
              <p className="text-xs text-gray-500 mb-3">{t(lang, "guide_kcc_summary")}</p>
              <a href={`/${lang}/guides`} className="text-xs font-bold text-primary hover:underline">{t(lang, "guides_read_guide")} →</a>
            </div>
            <div data-scroll-fade className="bg-white p-5 rounded-2xl shadow-sm border border-green-100">
              <span className="text-2xl mb-2 block">🔍</span>
              <h3 className="font-bold text-darkgray mb-1">{t(lang, "guide_status_title")}</h3>
              <p className="text-xs text-gray-500 mb-3">{t(lang, "guide_status_summary")}</p>
              <a href={`/${lang}/guides`} className="text-xs font-bold text-primary hover:underline">{t(lang, "guides_read_guide")} →</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}