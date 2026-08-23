import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import FarmerScene from "@/components/illustrations/FarmerScene";
import { t } from "@/lib/translation";

export default function Hero({ lang }: { lang: string }) {
  return (
    <div className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white pt-16 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFB300_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
          {t(lang, "hero_title")}
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 mb-8">{t(lang, "hero_subtitle")}</p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 shadow-2xl rounded-2xl">
          <SearchBar lang={lang} />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`/${lang}/central`}
            className="px-8 py-3 bg-gold text-darkgray font-bold rounded-xl shadow-lg hover:bg-amber-400 transition transform hover:-translate-y-0.5"
          >
            {t(lang, "central_schemes")}
          </Link>
          <Link
            href={`/${lang}/state`}
            className="px-8 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-0.5"
          >
            {t(lang, "state_schemes")}
          </Link>
        </div>
      </div>

      {/* Farmer-in-the-field illustration along the bottom edge */}
      <FarmerScene className="absolute bottom-0 left-0 w-full h-32 sm:h-40 z-0" />
    </div>
  );
}
