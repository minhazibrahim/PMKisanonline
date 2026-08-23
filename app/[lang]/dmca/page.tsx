import LegalPage from "@/components/LegalPage";

export default async function DmcaPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <LegalPage title="DMCA Notice" updated="17 August 2026">
      <p>
        PMkisanOnline respects the intellectual property rights of others. Scheme information on this
        site is summarized from publicly available government sources and press releases.
      </p>
      <h2>Filing a Notice</h2>
      <p>
        If you believe content on this site infringes your copyright, please send a notice including:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>A description of the copyrighted work you believe is infringed</li>
        <li>The specific URL(s) on this site where the material is located</li>
        <li>Your contact information</li>
        <li>A statement that you have a good-faith belief the use is unauthorized</li>
      </ul>
      <h2>Response</h2>
      <p>
        Upon receiving a valid notice, we will review and, where appropriate, remove or update the
        relevant content promptly.
      </p>
    </LegalPage>
  );
}
