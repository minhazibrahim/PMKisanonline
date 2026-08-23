import { fallbackStateSchemeCounts } from "@/lib/fallbackSchemes";

export interface StateInfo {
  name: string;
  slug: string;
  schemes: number;
}

const REAL_FALLBACK_COUNTS = fallbackStateSchemeCounts();

/**
 * All 28 Indian states (Union Territories intentionally excluded - add
 * separately if needed). Shared across the state directory, the homepage
 * map preview, and used to resolve state slugs to display names.
 *
 * `schemes` is a REAL count, not a placeholder: it comes from the number
 * of curated real schemes in lib/fallbackSchemes.ts for that state. Once
 * Supabase is configured and has live data, pages that show these counts
 * query Supabase directly for the true live count instead - this static
 * number is only the honest fallback shown before that data exists.
 */
export const STATES: StateInfo[] = [
  { name: "Andhra Pradesh", slug: "andhra-pradesh", schemes: REAL_FALLBACK_COUNTS["andhra-pradesh"] || 0 },
  { name: "Arunachal Pradesh", slug: "arunachal-pradesh", schemes: REAL_FALLBACK_COUNTS["arunachal-pradesh"] || 0 },
  { name: "Assam", slug: "assam", schemes: REAL_FALLBACK_COUNTS["assam"] || 0 },
  { name: "Bihar", slug: "bihar", schemes: REAL_FALLBACK_COUNTS["bihar"] || 0 },
  { name: "Chhattisgarh", slug: "chhattisgarh", schemes: REAL_FALLBACK_COUNTS["chhattisgarh"] || 0 },
  { name: "Goa", slug: "goa", schemes: REAL_FALLBACK_COUNTS["goa"] || 0 },
  { name: "Gujarat", slug: "gujarat", schemes: REAL_FALLBACK_COUNTS["gujarat"] || 0 },
  { name: "Haryana", slug: "haryana", schemes: REAL_FALLBACK_COUNTS["haryana"] || 0 },
  { name: "Himachal Pradesh", slug: "himachal-pradesh", schemes: REAL_FALLBACK_COUNTS["himachal-pradesh"] || 0 },
  { name: "Jharkhand", slug: "jharkhand", schemes: REAL_FALLBACK_COUNTS["jharkhand"] || 0 },
  { name: "Karnataka", slug: "karnataka", schemes: REAL_FALLBACK_COUNTS["karnataka"] || 0 },
  { name: "Kerala", slug: "kerala", schemes: REAL_FALLBACK_COUNTS["kerala"] || 0 },
  { name: "Madhya Pradesh", slug: "madhya-pradesh", schemes: REAL_FALLBACK_COUNTS["madhya-pradesh"] || 0 },
  { name: "Maharashtra", slug: "maharashtra", schemes: REAL_FALLBACK_COUNTS["maharashtra"] || 0 },
  { name: "Manipur", slug: "manipur", schemes: REAL_FALLBACK_COUNTS["manipur"] || 0 },
  { name: "Meghalaya", slug: "meghalaya", schemes: REAL_FALLBACK_COUNTS["meghalaya"] || 0 },
  { name: "Mizoram", slug: "mizoram", schemes: REAL_FALLBACK_COUNTS["mizoram"] || 0 },
  { name: "Nagaland", slug: "nagaland", schemes: REAL_FALLBACK_COUNTS["nagaland"] || 0 },
  { name: "Odisha", slug: "odisha", schemes: REAL_FALLBACK_COUNTS["odisha"] || 0 },
  { name: "Punjab", slug: "punjab", schemes: REAL_FALLBACK_COUNTS["punjab"] || 0 },
  { name: "Rajasthan", slug: "rajasthan", schemes: REAL_FALLBACK_COUNTS["rajasthan"] || 0 },
  { name: "Sikkim", slug: "sikkim", schemes: REAL_FALLBACK_COUNTS["sikkim"] || 0 },
  { name: "Tamil Nadu", slug: "tamil-nadu", schemes: REAL_FALLBACK_COUNTS["tamil-nadu"] || 0 },
  { name: "Telangana", slug: "telangana", schemes: REAL_FALLBACK_COUNTS["telangana"] || 0 },
  { name: "Tripura", slug: "tripura", schemes: REAL_FALLBACK_COUNTS["tripura"] || 0 },
  { name: "Uttar Pradesh", slug: "uttar-pradesh", schemes: REAL_FALLBACK_COUNTS["uttar-pradesh"] || 0 },
  { name: "Uttarakhand", slug: "uttarakhand", schemes: REAL_FALLBACK_COUNTS["uttarakhand"] || 0 },
  { name: "West Bengal", slug: "west-bengal", schemes: REAL_FALLBACK_COUNTS["west-bengal"] || 0 },
];

export function findState(slug: string): StateInfo | undefined {
  return STATES.find((s) => s.slug === slug);
}
