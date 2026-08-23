import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import AskAiPlaceholder from "@/components/AskAiPlaceholder";
import { SUPPORTED_LANGUAGES } from "@/types";

export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

/**
 * Public-site layout, nested inside the root layout. Only renders the
 * Header/Footer chrome shared by the public (non-admin) pages - the
 * <html>/<body> tags live in app/layout.tsx.
 */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <Header lang={lang} />
      <ScrollFadeIn />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} />
      <AskAiPlaceholder lang={lang} />
    </>
  );
}
