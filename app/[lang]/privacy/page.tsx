import LegalPage from "@/components/LegalPage";

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  await params;
  return (
    <LegalPage title="Privacy Policy" updated="17 August 2026">
      <p>
        This Privacy Policy explains what information PMkisanOnline collects when you use this website
        and how it is used.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We do not require account creation to browse schemes. If you use the search feature, your
        search terms may be processed to return relevant results. We do not knowingly collect
        sensitive personal information such as Aadhaar numbers, bank details, or identity documents
        through this site.
      </p>
      <h2>Cookies</h2>
      <p>
        We may use essential cookies to remember your selected language and to keep the site
        functioning correctly. We do not use cookies for cross-site advertising tracking.
      </p>
      <h2>Third-Party Links</h2>
      <p>
        Clicking through to an official government portal to apply for a scheme takes you to a
        third-party site governed by its own privacy policy, which we encourage you to review.
      </p>
      <h2>Contact</h2>
      <p>
        For privacy-related questions about this site, please reach out via the contact options
        listed in the footer.
      </p>
    </LegalPage>
  );
}
