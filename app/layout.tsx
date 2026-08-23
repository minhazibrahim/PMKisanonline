import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMkisanOnline - भारत की सभी किसान सरकारी योजनाएं",
  description:
    "PMkisanOnline - Find Central & State Government schemes for farmers. PM Kisan, KCC, Subsidies & more.",
  keywords: ["PMkisanOnline", "Kisan Yojana", "PM Kisan Yojana", "Farmer Scheme India", "किसान योजना", "कृषि योजना"],
};

/**
 * Root layout. Next.js requires exactly one <html>/<body> pair at the root
 * of the tree - nested layouts (e.g. app/[lang]/layout.tsx, app/admin/layout.tsx)
 * should only render their own section-specific chrome inside {children}.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body className="bg-gray-50 text-darkgray font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
