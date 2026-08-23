import { notFound } from "next/navigation";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { findFallbackCentralScheme } from "@/lib/fallbackSchemes";
import SchemeDetail from "@/components/SchemeDetail";
import type { Scheme } from "@/types";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function CentralSchemeDetailPage({
  params,
}: {
  params: Promise<{ lang: string; schemeSlug: string }>;
}) {
  const { lang, schemeSlug } = await params;

  const supabase = getPublicSupabase();
  const { data: scheme } = supabase
    ? await supabase
        .from("posts")
        .select("*, states(name, slug)")
        .eq("slug", schemeSlug)
        .eq("category", "central")
        .single()
    : { data: null };

  // Fall back to real curated content when Supabase isn't configured yet,
  // or the DB simply doesn't have this scheme (so "Read More" always
  // lands on a real page instead of a 404).
  const resolvedScheme: Scheme | null | undefined = scheme || findFallbackCentralScheme(schemeSlug);

  if (!resolvedScheme) notFound();

  return <SchemeDetail scheme={resolvedScheme as Scheme} lang={lang} />;
}
