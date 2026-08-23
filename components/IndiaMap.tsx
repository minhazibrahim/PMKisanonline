import Link from "next/link";
import { Landmark } from "lucide-react";
import { STATES } from "@/lib/states";
import { t } from "@/lib/translation";

export default function IndiaMapSection({ lang }: { lang: string }) {
  const preview = STATES.slice(0, 12);

  return (
    <section className="py-12 bg-white rounded-3xl shadow-sm border border-gray-100 my-8 px-6">
      <div className="text-center mb-10">
        <span className="text-primary font-bold uppercase tracking-wider text-sm bg-green-50 px-3 py-1 rounded-full">
          {t(lang, "state_section_badge")}
        </span>
        <h2 className="text-3xl font-bold text-darkgray mt-2">{t(lang, "state_section_title")}</h2>
        <p className="text-gray-600 mt-1">{t(lang, "state_section_subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {preview.map((state) => (
          <Link
            key={state.slug}
            href={`/${lang}/state/${state.slug}`}
            className="group p-5 bg-gray-50 border border-gray-200 rounded-2xl hover:border-primary hover:bg-green-50/50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <Landmark className="w-6 h-6 text-primary mb-2" />
              <h3 className="font-bold text-darkgray group-hover:text-primary text-lg">{state.name}</h3>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold text-gray-500">
              <span>{state.schemes} {t(lang, "active_schemes_label")}</span>
              <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href={`/${lang}/state`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition"
        >
          {t(lang, "view_all_states")} →
        </Link>
      </div>
    </section>
  );
}
