import Link from "next/link";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { t } from "@/lib/translation";
import { formatDate } from "@/lib/utils";
import type { Scheme } from "@/types";

export default function SchemeCard({ scheme, lang }: { scheme: Scheme; lang: string }) {
  const isCentral = scheme.category === "central";
  const stateSlug = scheme.state_slug || scheme.states?.slug;
  const slugPath = isCentral ? `central/${scheme.slug}` : `state/${stateSlug}/${scheme.slug}`;
  const isExpired = scheme.status === "expired";

  return (
    <div
      data-scroll-fade
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              isCentral ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
            }`}
          >
            {isCentral ? t(lang, "central_schemes") : scheme.state_name || scheme.states?.name || t(lang, "state_schemes")}
          </span>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1 ${
              isExpired ? "text-gray-600 bg-gray-100" : "text-emerald-700 bg-emerald-50"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> {isExpired ? t(lang, "expired") : t(lang, "active")}
          </span>
        </div>

        <h3 className="font-bold text-lg text-darkgray group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {scheme.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{scheme.short_summary}</p>

        <div className="flex items-center text-xs text-gray-500 gap-1.5 mb-2 font-medium">
          <Calendar className="w-4 h-4 text-gold" />
          <span>
            {t(lang, "last_date")}: <strong className="text-darkgray">{formatDate(scheme.last_date)}</strong>
          </span>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-bold text-primary">{scheme.benefit}</span>
        <Link
          href={`/${lang}/${slugPath}`}
          className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark"
        >
          {t(lang, "read_more")} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
