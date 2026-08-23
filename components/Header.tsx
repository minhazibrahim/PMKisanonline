"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { t } from "@/lib/translation";
import { SUPPORTED_LANGUAGES } from "@/types";

const LANGUAGE_NAMES: Record<string, string> = {
  hi: "हिंदी",
  en: "English",
  bn: "বাংলা",
  mr: "मराठी",
  gu: "ગુજરાતી",
  ta: "தமிழ்",
  te: "తెలుగు",
  pa: "ਪੰਜਾਬੀ",
  kn: "ಕನ್ನಡ",
  ml: "മലയാളം",
  or: "ଓଡ଼ିଆ",
};

export default function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  /** Switch the active language while preserving the current page/path. */
  function switchLanguage(newLang: string) {
    const segments = pathname.split("/");
    segments[1] = newLang; // segments[0] is "" since pathname starts with "/"
    const newPath = segments.join("/") || `/${newLang}`;
    router.push(newPath);
  }

  const navLinks = [
    { href: `/${lang}`, label: t(lang, "home") },
    { href: `/${lang}/central`, label: t(lang, "central_schemes") },
    { href: `/${lang}/state`, label: t(lang, "state_schemes") },
    { href: `/${lang}/latest`, label: t(lang, "latest") },
    { href: `/${lang}/archive`, label: t(lang, "archive") },
    { href: `/${lang}/guides`, label: t(lang, "farming_guides") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <div className="bg-primary text-white p-2.5 rounded-xl font-bold text-xl shadow-lg">
              🌾 PMkisanOnline
            </div>
            <span className="hidden sm:inline text-xs font-semibold px-2 py-1 bg-gold text-darkgray rounded-md">
              {t(lang, "portal_name")}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-primary transition">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAs & Language Selector */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              title="Telegram"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <select
              value={lang}
              onChange={(e) => switchLanguage(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {SUPPORTED_LANGUAGES.map((code) => (
                <option key={code} value={code}>
                  {LANGUAGE_NAMES[code] || code}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-700">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block py-2 font-medium">
              {link.label}
            </Link>
          ))}
          <select
            value={lang}
            onChange={(e) => switchLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          >
            {SUPPORTED_LANGUAGES.map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_NAMES[code] || code}
              </option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
}
