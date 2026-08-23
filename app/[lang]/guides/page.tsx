import { t } from "@/lib/translation";

const GUIDES = [
  {
    icon: "📑",
    titleKey: "guide_aadhaar_title",
    summaryKey: "guide_aadhaar_summary",
    steps: [
      "Visit your bank's net-banking portal or nearest branch.",
      "Check Aadhaar seeding status under 'Update KYC' or ask the branch staff.",
      "If not seeded, submit Aadhaar + bank passbook copy for linking.",
      "Verify DBT (Direct Benefit Transfer) is enabled on the linked account.",
    ],
  },
  {
    icon: "🗺️",
    titleKey: "guide_land_title",
    summaryKey: "guide_land_summary",
    steps: [
      "Search for '[Your State] Bhulekh' or 'Bhu Naksha' portal.",
      "Select your district, tehsil, and village.",
      "Enter your Khata or Khesra number, or search by owner name.",
      "Download or print the record of rights (RoR) as needed.",
    ],
  },
  {
    icon: "💳",
    titleKey: "guide_kcc_title",
    summaryKey: "guide_kcc_summary",
    steps: [
      "Visit your nearest bank branch (any bank offering KCC) or apply online via the bank's portal.",
      "Fill Form KCC-1 with land and crop details.",
      "Submit: Aadhaar, land records, and passport-size photo.",
      "Approval typically takes 7-14 days; loan is disbursed via RuPay KCC card.",
    ],
  },
  {
    icon: "🔍",
    titleKey: "guide_status_title",
    summaryKey: "guide_status_summary",
    steps: [
      "Go to the relevant scheme's official portal (e.g. pmkisan.gov.in for PM Kisan).",
      "Use 'Beneficiary Status' or 'Track Application' with your Aadhaar/registration number.",
      "Cross-check with your bank statement for actual credit.",
      "For unresolved issues, contact the scheme's toll-free helpline or your local Krishi Vibhag office.",
    ],
  },
];

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-primary font-bold uppercase tracking-wider text-xs bg-green-50 px-3 py-1 rounded-full">
          {t(lang, "help_docs_badge")}
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-darkgray mt-2">
          {t(lang, "guides_section_title")}
        </h1>
        <p className="text-gray-600 text-sm mt-1">{t(lang, "guides_section_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDES.map((guide) => (
          <div key={guide.titleKey} data-scroll-fade className="bg-white p-6 rounded-2xl shadow-sm border border-green-100">
            <span className="text-3xl mb-3 block">{guide.icon}</span>
            <h2 className="font-bold text-lg text-darkgray mb-1">{t(lang, guide.titleKey as any)}</h2>
            <p className="text-sm text-gray-500 mb-4">{t(lang, guide.summaryKey as any)}</p>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-700">
              {guide.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
