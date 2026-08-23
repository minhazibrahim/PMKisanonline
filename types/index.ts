export type SchemeCategory = "central" | "state";

export interface StateRef {
  name: string;
  slug: string;
}

export interface Scheme {
  id: string;
  title: string;
  slug: string;
  category: SchemeCategory;
  benefit: string;
  last_date: string;
  short_summary: string;
  description?: string;
  eligibility?: string[];
  documents_required?: string[];
  how_to_apply?: string;
  official_link?: string;
  status?: "active" | "expired" | "upcoming";
  state_id?: string | null;
  state_name?: string;
  state_slug?: string;
  states?: StateRef | null;
  created_at?: string;
  updated_at?: string;
}

export interface State {
  id: string;
  name: string;
  slug: string;
  scheme_count?: number;
}

export interface AdminUser {
  id: string;
  email: string;
}

export interface ParsedSchemeDraft {
  title: string;
  category: SchemeCategory;
  benefit: string;
  last_date: string;
  short_summary: string;
  description: string;
  eligibility: string[];
  documents_required: string[];
  how_to_apply: string;
  official_link?: string;
  state_name?: string;
}

export const SUPPORTED_LANGUAGES = ["hi", "en", "bn", "mr", "gu", "ta", "te", "pa", "kn", "ml", "or"] as const;
export type Lang = (typeof SUPPORTED_LANGUAGES)[number];
