import LegalPage from "@/components/LegalPage";

export default async function DisclaimerPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <LegalPage title="Disclaimer" updated="17 August 2026">
      <p>
        PMkisanOnline is an independent information portal that aggregates publicly available details
        about Central and State Government farmer schemes, subsidies, and benefit programs. It is{" "}
        <strong>not an official government website</strong> and is not affiliated with, endorsed by,
        or operated by the Government of India or any state government.
      </p>
      <h2>Accuracy of Information</h2>
      <p>
        While we make every effort to keep scheme details, eligibility criteria, deadlines, and
        benefit amounts accurate and up to date, government schemes and their terms can change
        without notice. Always verify details on the relevant scheme's official government portal
        before applying or making financial decisions.
      </p>
      <h2>No Liability</h2>
      <p>
        PMkisanOnline and its operators are not responsible for any loss, damage, or inconvenience
        arising from reliance on information found on this site, including missed deadlines,
        rejected applications, or discrepancies with official sources.
      </p>
      <h2>External Links</h2>
      <p>
        This site links to official government portals for applications and verification. We are
        not responsible for the content, accuracy, or availability of those external sites.
      </p>
    </LegalPage>
  );
}
