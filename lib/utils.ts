import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely (handles conflicting utility classes). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string into a readable DD MMM YYYY string. */
export function formatDate(dateString?: string | null): string {
  if (!dateString) return "Ongoing";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Turn a title into a URL-friendly slug.
 *
 * For Latin-script titles this keeps the words as a readable slug. For
 * titles in any non-Latin script (Hindi, Bengali, Tamil, etc.) it instead
 * generates a short random ASCII id. This is a deliberate reliability
 * trade-off: combining vowel signs (matras) in scripts like Devanagari can
 * get mangled on an encode/decode round-trip through the URL bar, which
 * silently breaks "Read More" links. A random id always round-trips
 * correctly, so every scheme - regardless of language - gets a link that
 * reliably opens.
 */
export function slugify(text: string): string {
  const base = text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const isAsciiOnly = base.length > 0 && /^[\x00-\x7F]+$/.test(base);
  if (isAsciiOnly) return base;

  return `scheme-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Truncate text to a max length, adding an ellipsis if cut. */
export function truncate(text: string, maxLength = 140): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}
