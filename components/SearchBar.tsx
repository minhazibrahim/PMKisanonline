"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { t } from "@/lib/translation";

export default function SearchBar({
  lang,
  className = "",
}: {
  lang: string;
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/${lang}/latest?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t(lang, "search_placeholder")}
        className="w-full pl-11 pr-24 py-3 border border-gray-300 rounded-xl bg-white text-darkgray focus:outline-none focus:ring-2 focus:ring-primary text-sm"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition"
      >
        {t(lang, "search_button")}
      </button>
    </form>
  );
}
