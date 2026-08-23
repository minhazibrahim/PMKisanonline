import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Public (anon-key) Supabase client for use in Server Components that read
 * data for anonymous visitors. Returns null instead of throwing when the
 * project hasn't configured Supabase yet (e.g. NEXT_PUBLIC_SUPABASE_URL is
 * missing in .env.local) so pages can fall back to sample content instead
 * of crashing the build/render.
 */
export function getPublicSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}
