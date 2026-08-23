import LegalPage from "@/components/LegalPage";

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <LegalPage title="Terms & Conditions" updated="17 August 2026">
      <p>By using PMkisanOnline, you agree to the following terms.</p>
      <h2>Use of Content</h2>
      <p>
        Scheme summaries on this site are provided for general informational purposes only and do
        not constitute legal, financial, or official government advice. Always confirm details on
        the relevant official government portal before applying.
      </p>
      <h2>No Warranty</h2>
      <p>
        This site is provided "as is" without warranties of any kind, express or implied, regarding
        the completeness, reliability, or timeliness of scheme information.
      </p>
      <h2>Acceptable Use</h2>
      <p>
        You agree not to misuse this site, including attempting to scrape data at scale, disrupt
        service availability, or use the site for unlawful purposes.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the site after changes are
        posted constitutes acceptance of the revised terms.
      </p>
    </LegalPage>
  );
}
