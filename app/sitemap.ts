import type { MetadataRoute } from "next";
import { SUPPORTED_LANGUAGES } from "@/types";
import { STATES } from "@/lib/states";
import { CENTRAL_SCHEMES, STATE_SCHEMES } from "@/lib/fallbackSchemes";
import { getPublicSupabase } from "@/lib/supabasePublic";

/**
 * Set NEXT_PUBLIC_SITE_URL in your environment (e.g.
 * https://pmkisanonline.com) so the sitemap emits absolute URLs pointing
 * at your real deployed domain. Falls back to a placeholder domain if not
 * set, so the site still builds without it.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://pmkisanonline.com").replace(/\/$/, "");

const STATIC_PATHS = ["", "central", "state", "latest", "archive", "guides", "disclaimer", "privacy", "terms", "dmca"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Static top-level pages, per language.
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${lang}${path ? `/${path}` : ""}`,
        lastModified: now,
        changeFrequency: path === "" || path === "latest" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    // State directory pages.
    for (const state of STATES) {
      entries.push({
        url: `${SITE_URL}/${lang}/state/${state.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Central scheme detail pages - live Supabase data when configured,
  // otherwise the real curated fallback schemes so the sitemap always
  // reflects what's actually reachable on the site.
  const supabase = getPublicSupabase();
  let centralSlugs = CENTRAL_SCHEMES.map((s) => s.slug);
  let stateSchemeRefs = STATE_SCHEMES.map((s) => ({ stateSlug: s.state_slug!, slug: s.slug }));

  if (supabase) {
    const { data: centralData } = await supabase.from("posts").select("slug").eq("category", "central");
    if (centralData && centralData.length > 0) {
      centralSlugs = centralData.map((row: any) => row.slug);
    }

    const { data: stateData } = await supabase
      .from("posts")
      .select("slug, states(slug)")
      .eq("category", "state");
    if (stateData && stateData.length > 0) {
      stateSchemeRefs = stateData
        .filter((row: any) => row.states?.slug)
        .map((row: any) => ({ stateSlug: row.states.slug, slug: row.slug }));
    }
  }

  for (const lang of SUPPORTED_LANGUAGES) {
    for (const slug of centralSlugs) {
      entries.push({
        url: `${SITE_URL}/${lang}/central/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const { stateSlug, slug } of stateSchemeRefs) {
      entries.push({
        url: `${SITE_URL}/${lang}/state/${stateSlug}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
