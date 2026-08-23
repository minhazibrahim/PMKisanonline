import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { t } from "@/lib/translation";

export default function Footer({ lang }: { lang: string }) {
  return (
    <footer className="bg-darkgray text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">🌾</span>
            <span className="text-white font-extrabold text-xl">PMkisanOnline</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">{t(lang, "footer_tagline")}</p>
          <div className="flex space-x-3">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t(lang, "footer_quick_links")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/central`} className="hover:text-gold transition">{t(lang, "central_schemes")}</Link></li>
            <li><Link href={`/${lang}/state`} className="hover:text-gold transition">{t(lang, "state_schemes")}</Link></li>
            <li><Link href={`/${lang}/latest`} className="hover:text-gold transition">{t(lang, "latest")}</Link></li>
            <li><Link href={`/${lang}/archive`} className="hover:text-gold transition">{t(lang, "archive")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t(lang, "farming_guides")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/guides`} className="hover:text-gold transition">{t(lang, "farming_guides")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">{t(lang, "footer_legal")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/disclaimer`} className="hover:text-gold transition">Disclaimer</Link></li>
            <li><Link href={`/${lang}/privacy`} className="hover:text-gold transition">Privacy Policy</Link></li>
            <li><Link href={`/${lang}/terms`} className="hover:text-gold transition">Terms & Conditions</Link></li>
            <li><Link href={`/${lang}/dmca`} className="hover:text-gold transition">DMCA Notice</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 space-y-1.5">
        <p>{t(lang, "footer_copyright")}</p>
        <p>
          {t(lang, "footer_developed_by")}{" "}
          <a
            href="https://minhazibrahimportfolio.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-300 hover:text-gold transition"
          >
            Minhaz
          </a>
        </p>
      </div>
    </footer>
  );
}
