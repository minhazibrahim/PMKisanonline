import Link from "next/link";
import { Calendar, CheckCircle2, ExternalLink, FileText, ListChecks } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { t } from "@/lib/translation";
import type { Scheme } from "@/types";

/** Shared read-only scheme detail view, used by both the central and state detail routes. */
export default function SchemeDetail({ scheme, lang }: { scheme: Scheme; lang: string }) {
  const isCentral = scheme.category === "central";
  const isExpired = scheme.status === "expired";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-gray-500 mb-4">
        <Link href={`/${lang}`} className="hover:text-primary">{t(lang, "home_breadcrumb")}</Link>
        <span className="mx-1.5">/</span>
        <Link href={`/${lang}/${isCentral ? "central" : "state"}`} className="hover:text-primary">
          {isCentral ? t(lang, "central_schemes") : t(lang, "state_schemes")}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-darkgray font-medium">{scheme.title}</span>
      </nav>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            isCentral ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
          }`}
        >
          {isCentral ? t(lang, "central_scheme_singular") : scheme.state_name || scheme.states?.name || t(lang, "state_scheme_singular")}
        </span>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1 ${
            isExpired ? "text-gray-600 bg-gray-100" : "text-emerald-700 bg-emerald-50"
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> {isExpired ? t(lang, "expired") : t(lang, "active")}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mb-3">{scheme.title}</h1>
      <p className="text-gray-600 mb-6">{scheme.short_summary}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <span className="text-xs text-gray-500 block mb-1">{t(lang, "benefit_label")}</span>
          <span className="font-bold text-primary">{scheme.benefit}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <span className="text-xs text-gray-500 flex items-center gap-1 mb-1">
            <Calendar className="w-3.5 h-3.5" /> {t(lang, "last_date")}
          </span>
          <span className="font-bold text-darkgray">{formatDate(scheme.last_date)}</span>
        </div>
      </div>

      {scheme.description && (
        <section className="mb-8">
          <h2 className="font-bold text-lg text-darkgray mb-2">{t(lang, "about_scheme")}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{scheme.description}</p>
        </section>
      )}

      {scheme.eligibility && scheme.eligibility.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold text-lg text-darkgray mb-2 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" /> {t(lang, "eligibility_label")}
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {scheme.eligibility.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {scheme.documents_required && scheme.documents_required.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold text-lg text-darkgray mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> {t(lang, "documents_required_label")}
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {scheme.documents_required.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {scheme.how_to_apply && (
        <section className="mb-8">
          <h2 className="font-bold text-lg text-darkgray mb-2">{t(lang, "how_to_apply_label")}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{scheme.how_to_apply}</p>
        </section>
      )}

      {scheme.official_link && (
        <a
          href={scheme.official_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
        >
          {t(lang, "visit_official_portal_label")} <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}
