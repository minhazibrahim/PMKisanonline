import Link from "next/link";
import { Calendar } from "lucide-react";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { formatDate } from "@/lib/utils";
import { t } from "@/lib/translation";
import type { Scheme } from "@/types";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function ArchivePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  const supabase = getPublicSupabase();
  const { data } = supabase
    ? await supabase
        .from("posts")
        .select("*, states(name, slug)")
        .eq("status", "expired")
        .order("last_date", { ascending: false })
    : { data: null };

  const schemes: Scheme[] = data || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-gray-500 font-bold uppercase tracking-wider text-xs bg-gray-100 px-3 py-1 rounded-full">
          {t(lang, "archive_badge")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mt-2">{t(lang, "archive_page_title")}</h1>
        <p className="text-gray-600 text-sm mt-1">{t(lang, "archive_page_subtitle")}</p>
      </div>

      {schemes.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
          {t(lang, "no_schemes_found")}
        </div>
      ) : (
        <div className="divide-y divide-gray-200 bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {schemes.map((scheme) => {
            const isCentral = scheme.category === "central";
            const href = isCentral
              ? `/${lang}/central/${scheme.slug}`
              : `/${lang}/state/${scheme.state_slug || scheme.states?.slug}/${scheme.slug}`;
            return (
              <Link
                key={scheme.id}
                href={href}
                className="flex items-center justify-between gap-4 p-5 hover:bg-gray-50 transition"
              >
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    {isCentral ? t(lang, "central_label") : scheme.state_name || scheme.states?.name}
                  </span>
                  <h3 className="font-bold text-darkgray">{scheme.title}</h3>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar className="w-3.5 h-3.5" />
                  {t(lang, "closed_on_label")} {formatDate(scheme.last_date)}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
