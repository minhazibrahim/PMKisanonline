import { notFound } from "next/navigation";
import { getPublicSupabase } from "@/lib/supabasePublic";
import { findState } from "@/lib/states";
import { findFallbackStateScheme } from "@/lib/fallbackSchemes";
import SchemeDetail from "@/components/SchemeDetail";
import type { Scheme } from "@/types";

// Always fetch fresh data from Supabase on every request instead of
// caching a static snapshot at build time - so newly added/edited
// schemes show up immediately without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function StateSchemeDetailPage({
  params,
}: {
  params: Promise<{ lang: string; stateSlug: string; schemeSlug: string }>;
}) {
  const { lang, stateSlug, schemeSlug } = await params;
  const state = findState(stateSlug);
  if (!state) notFound();

  const supabase = getPublicSupabase();

  // Look up the scheme by its (globally unique) slug first - this alone
  // is enough to find the right row, so we don't rely on filtering through
  // the embedded "states" relation (which needs the `!inner` join hint to
  // actually filter on a nested column - using it without that hint
  // silently fails to match and returns nothing).
  const { data: scheme } = supabase
    ? await supabase
        .from("posts")
        .select("*, states(name, slug)")
        .eq("slug", schemeSlug)
        .eq("category", "state")
        .maybeSingle()
    : { data: null };

  // Fall back to real curated content when Supabase isn't configured yet,
  // or the DB simply doesn't have this scheme (so "Read More" always
  // lands on a real page instead of a 404).
  const resolvedScheme: Scheme | null | undefined = scheme || findFallbackStateScheme(stateSlug, schemeSlug);

  if (!resolvedScheme) notFound();

  return <SchemeDetail scheme={resolvedScheme as Scheme} lang={lang} />;
}
