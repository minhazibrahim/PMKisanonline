import type { Scheme } from "@/types";

/**
 * Real, verified scheme content used as fallback display data whenever
 * Supabase has not been configured yet or has no rows for a given
 * category/state. This is the SINGLE SOURCE of truth for fallback scheme
 * content across the whole site (home, central, state, latest, archive
 * and the individual scheme detail pages) so every "Read More" page has
 * real information instead of a 404 or empty placeholder.
 *
 * Every entry intentionally fills description, eligibility,
 * documents_required, how_to_apply and official_link so the detail page
 * always has "how to apply", a short explanation and a working Official
 * Website button.
 *
 * NOTE: benefit amounts and last dates change frequently (they are set
 * by the government from year to year). Always verify current figures
 * on the linked official portal before relying on them.
 */

// ---------------------------------------------------------------------
// Central Government Schemes
// ---------------------------------------------------------------------
export const CENTRAL_SCHEMES: Scheme[] = [
  {
    id: "central-pm-kisan",
    title: "PM Kisan Samman Nidhi (PM-KISAN)",
    slug: "pm-kisan-samman-nidhi",
    category: "central",
    benefit: "₹6,000 / Year",
    last_date: "Ongoing",
    short_summary:
      "Direct income support of ₹6,000 per year, paid in 3 equal instalments of ₹2,000 every four months, to eligible landholding farmer families across India.",
    description:
      "PM-KISAN is a Central Sector Scheme run by the Department of Agriculture & Farmers Welfare that gives eligible farmer families ₹6,000 every year as direct income support, credited straight to their Aadhaar-linked bank account via Direct Benefit Transfer (DBT). The amount is split into three instalments of ₹2,000, released roughly every four months. The scheme was launched to help small and marginal farmer families cover input costs for crop production and reduce their dependence on informal moneylenders.",
    eligibility: [
      "Landholding farmer family (husband, wife and minor children) with cultivable land as per state land records",
      "Aadhaar-linked bank account with active eKYC completed",
      "Excludes institutional landholders, income-tax payers, and current/former holders of constitutional posts, MPs/MLAs, and serving/retired senior government employees (Class IV/Group D staff remain eligible)",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership documents (Khasra/Khatauni or land passbook)",
      "Bank passbook with IFSC code",
      "Farmer ID (mandatory in several states, including UP, Rajasthan and Maharashtra)",
    ],
    how_to_apply:
      "Visit the official PM-KISAN portal (pmkisan.gov.in) and click 'New Farmer Registration' under the Farmers' Corner, or register through your nearest Common Service Centre (CSC). After registering, complete Aadhaar eKYC and make sure your bank account is Aadhaar-seeded so instalments aren't held up. To check your status, go to Farmers' Corner → 'Know Your Status' and enter your Aadhaar or mobile number, or use the PM Kisan GoI mobile app.",
    official_link: "https://pmkisan.gov.in/",
    status: "active",
  },
  {
    id: "central-pmfby",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    slug: "pradhan-mantri-fasal-bima-yojana",
    category: "central",
    benefit: "Up to 100% Crop Loss Cover",
    last_date: "Kharif/Rabi season cut-off (check portal)",
    short_summary:
      "India's flagship crop insurance scheme — farmers pay a fixed low premium (2% Kharif, 1.5% Rabi, 5% horticulture) while the government subsidises the rest, covering losses from natural calamities, pests and disease.",
    description:
      "PMFBY provides comprehensive, affordable crop insurance from pre-sowing to post-harvest stages, protecting farmers against yield loss due to droughts, floods, hailstorms, pests and disease. Farmers only pay a small, fixed share of the premium — 2% for Kharif crops, 1.5% for Rabi crops and 5% for annual commercial/horticultural crops — while the Central and State governments jointly subsidise the remaining actuarial premium. Claims are settled directly to the farmer's bank account through DBT, and localised or on-the-spot crop damage (including, from recent seasons, damage from wild animal attacks in notified areas) can be reported within 72 hours of the event for assessment.",
    eligibility: [
      "All farmers, including sharecroppers and tenant farmers, growing notified crops in notified areas",
      "Compulsory for farmers with crop loans (loanee farmers) for notified crops; voluntary for others",
      "Valid land records or a tenancy/crop-sharing agreement where applicable",
    ],
    documents_required: [
      "Aadhaar card",
      "Land records (khasra/khatauni) or tenant farmer agreement",
      "Bank passbook with IFSC code",
      "Sowing declaration / proof of crop sown",
    ],
    how_to_apply:
      "Apply online at pmfby.gov.in under 'Farmer Corner' before the notified cut-off date for the Kharif or Rabi season in your state (deadlines vary by state and crop). You can also apply through your bank (if you have a crop loan), a Common Service Centre, or an empanelled insurance company. To report crop damage, use the 'Report Crop Loss' option on the portal or app within 72 hours of the event. For help, call the PMFBY helpline on 14447.",
    official_link: "https://pmfby.gov.in/",
    status: "active",
  },
  {
    id: "central-kcc",
    title: "Kisan Credit Card (KCC)",
    slug: "kisan-credit-card",
    category: "central",
    benefit: "Loans up to ₹3 Lakh at ~4% Effective Interest",
    last_date: "Ongoing",
    short_summary:
      "A revolving credit line for farmers to meet crop production, post-harvest and allied-activity (dairy, fisheries) expenses, with interest subvention that can bring the effective rate down to around 4% on timely repayment.",
    description:
      "The Kisan Credit Card scheme gives farmers a simple, need-based way to access short-term and long-term credit for cultivation, working capital and allied activities such as animal husbandry and fisheries, instead of relying on informal moneylenders. Loans up to ₹3 lakh carry an interest rate of about 7% per annum under the Interest Subvention Scheme, which can drop to roughly 4% if the farmer repays on time (Prompt Repayment Incentive). Loans up to ₹1.6–2 lakh are collateral-free. The card is valid for 5 years, subject to annual review, and comes with a RuPay debit card for easy withdrawals.",
    eligibility: [
      "Owner-cultivators, tenant farmers, oral lessees and sharecroppers",
      "Self-Help Groups (SHGs) or Joint Liability Groups of farmers",
      "Farmers engaged in animal husbandry, dairy or fisheries (separate KCC variants available)",
      "Generally aged 18–75; senior applicants need a legal-heir co-borrower",
    ],
    documents_required: [
      "Duly filled KCC application form",
      "Aadhaar card and one recent passport-size photograph",
      "Proof of landholding / cultivation certified by revenue authorities",
      "Details of crops grown and area under cultivation",
    ],
    how_to_apply:
      "Apply at any nearby bank branch offering KCC (public sector, private, regional rural or cooperative banks), through the bank's net-banking/mobile app, or via a Common Service Centre. Fill in your land and crop details, submit the required documents, and the bank will verify and typically sanction the card within 7–14 days. You can also check the scheme's official listing and eligibility on the government's myScheme portal.",
    official_link: "https://www.myscheme.gov.in/schemes/kcc",
    status: "active",
  },
];

// ---------------------------------------------------------------------
// State Government Schemes (one flagship, real scheme per state — grows
// as more states are curated; see README note in states.ts for how to add
// more via the admin panel, which is the preferred long-term way to grow this).
// ---------------------------------------------------------------------
export const STATE_SCHEMES: Scheme[] = [
  {
    id: "state-bihar-diesel-anudan",
    title: "Bihar Diesel Anudan Yojana",
    slug: "bihar-diesel-anudan-yojana",
    category: "state",
    state_name: "Bihar",
    state_slug: "bihar",
    benefit: "₹750 / Acre / Irrigation (Max 8 Acres)",
    last_date: "Kharif/Rabi window (check portal)",
    short_summary:
      "Diesel subsidy of ₹75 per litre (about ₹750 per acre per irrigation) for farmers in Bihar who irrigate their Kharif and Rabi crops using diesel pump sets, up to a maximum of 8 acres per farmer.",
    description:
      "Bihar's Diesel Anudan Yojana helps farmers offset the rising cost of diesel-powered irrigation during Kharif (paddy, maize) and Rabi (wheat, pulses, oilseeds) seasons, especially in years of deficient rainfall. Farmers who use diesel pump sets for irrigation can claim a subsidy of ₹75 per litre of diesel used (roughly ₹750 per acre per irrigation, based on 10 litres/acre), capped at 8 acres per farmer. The subsidy is paid directly into the farmer's Aadhaar-linked bank account through DBT after verification of the fuel receipt.",
    eligibility: [
      "Registered farmer with a valid 13-digit Bihar Kisan Registration Number",
      "Land under cultivation in Bihar for the notified Kharif/Rabi crop",
      "Used a diesel pump set for irrigation and holds a computerised fuel receipt (hand-written receipts are not accepted)",
    ],
    documents_required: [
      "Bihar Kisan Registration Number (register first if you don't have one)",
      "Computerised diesel purchase receipt from the pump",
      "Aadhaar-linked bank account details",
      "Land record / self-declaration of area irrigated",
    ],
    how_to_apply:
      "First register as a farmer on the DBT Agriculture Bihar portal (dbtagriculture.bihar.gov.in) if you don't already have a Kisan Registration Number. Once the Diesel Anudan application window opens for the season, log in, select 'Diesel Anudan', enter your registration number and upload your computerised diesel receipt along with the acreage irrigated. Track your application/payment status under 'Diesel Status' on the same portal.",
    official_link: "https://dbtagriculture.bihar.gov.in/",
    status: "active",
  },
  {
    id: "state-maharashtra-namo-shetkari",
    title: "Namo Shetkari Mahasanman Nidhi Yojana",
    slug: "namo-shetkari-mahasanman-nidhi-yojana",
    category: "state",
    state_name: "Maharashtra",
    state_slug: "maharashtra",
    benefit: "₹6,000 / Year (Additional to PM-KISAN)",
    last_date: "Ongoing",
    short_summary:
      "A Maharashtra state top-up scheme that matches PM-KISAN, giving eligible farmers an extra ₹6,000 a year in 3 instalments of ₹2,000 — on top of the ₹6,000 they already receive from the central PM-KISAN scheme.",
    description:
      "Namo Shetkari Mahasanman Nidhi Yojana (NSMNY) is a Maharashtra state government scheme modelled on PM-KISAN. It gives every farmer already registered under PM-KISAN an additional ₹6,000 per year, paid in three equal instalments of ₹2,000, aligned with the central scheme's payment schedule. There is no separate registration required — if you're already a verified PM-KISAN beneficiary from Maharashtra, you're automatically considered for NSMNY.",
    eligibility: [
      "Must already be a registered and verified PM-KISAN beneficiary",
      "Permanent resident of Maharashtra owning cultivable land",
      "Aadhaar-linked bank account",
    ],
    documents_required: [
      "Aadhaar card",
      "PM-KISAN registration/beneficiary ID",
      "Aadhaar-linked bank passbook",
      "Land ownership record (7/12 extract)",
    ],
    how_to_apply:
      "No separate application is needed if you are already a verified PM-KISAN beneficiary in Maharashtra — the instalment is credited automatically alongside your PM-KISAN payment. To check your registration and payment status, visit the official NSMNY portal and use 'Beneficiary Status', or verify your PM-KISAN registration first at pmkisan.gov.in if you haven't enrolled yet.",
    official_link: "https://nsmny.mahait.org/",
    status: "active",
  },
  {
    id: "state-mp-kisan-kalyan",
    title: "Mukhyamantri Kisan Kalyan Yojana",
    slug: "mukhyamantri-kisan-kalyan-yojana",
    category: "state",
    state_name: "Madhya Pradesh",
    state_slug: "madhya-pradesh",
    benefit: "₹4,000 / Year (Additional to PM-KISAN)",
    last_date: "Ongoing",
    short_summary:
      "Madhya Pradesh's top-up to PM-KISAN — an extra ₹4,000 a year for eligible farmers, paid in 2 instalments of ₹2,000, taking their total annual central + state support to around ₹10,000.",
    description:
      "Mukhyamantri Kisan Kalyan Yojana provides additional financial assistance to farmer families in Madhya Pradesh who are already registered and verified under the central PM-KISAN scheme. The state government transfers ₹4,000 per year in two instalments of ₹2,000 directly to the farmer's Aadhaar-linked bank account through DBT, on top of the ₹6,000 they receive annually under PM-KISAN. Payment status, beneficiary lists and instalment history can be checked online through the MP SAARA portal.",
    eligibility: [
      "Must be a registered and verified PM-KISAN beneficiary",
      "Permanent resident of Madhya Pradesh owning cultivable agricultural land",
      "Land records, Aadhaar and bank account verified with the Revenue Department",
    ],
    documents_required: [
      "Aadhaar card",
      "PM-KISAN registration details",
      "Aadhaar-linked bank passbook",
      "Land ownership record (khasra/B1)",
    ],
    how_to_apply:
      "No separate application is required — eligible PM-KISAN beneficiaries in Madhya Pradesh are automatically considered. Check your beneficiary status, instalment history and payment date on the MP SAARA portal (saara.mp.gov.in). For issues, contact the state helpline at 0755-2525804.",
    official_link: "https://saara.mp.gov.in/",
    status: "active",
  },
  {
    id: "state-wb-krishak-bandhu",
    title: "Krishak Bandhu Scheme",
    slug: "krishak-bandhu-scheme",
    category: "state",
    state_name: "West Bengal",
    state_slug: "west-bengal",
    benefit: "Up to ₹10,000 / Year + ₹2 Lakh Death Benefit",
    last_date: "Kharif/Rabi window (check portal)",
    short_summary:
      "West Bengal's assured income scheme for farmers and sharecroppers — up to ₹10,000 a year in two seasonal instalments, plus a one-time ₹2 lakh grant to the family in the event of a registered farmer's death.",
    description:
      "Krishak Bandhu ('Farmer's Friend') is West Bengal's flagship farmer welfare scheme, providing direct seasonal income support of up to ₹10,000 per year (paid in two instalments — one for Kharif, one for Rabi) to landholding farmers and registered sharecroppers. It also includes a Death Benefit component: if a registered farmer aged 18–60 passes away, their family receives a one-time grant of ₹2 lakh, with no premium required from the farmer.",
    eligibility: [
      "Permanent resident of West Bengal, aged 18–60",
      "Owns or leases agricultural land within West Bengal, including registered sharecroppers (bargadars)",
      "Farming as a primary occupation",
    ],
    documents_required: [
      "Aadhaar card or Voter ID",
      "Land ownership record or registered lease/sharecropping document",
      "Bank account details",
      "Passport-size photograph",
    ],
    how_to_apply:
      "Visit the official Krishak Bandhu portal (krishakbandhu.wb.gov.in), sign in/register, and complete the online application with your land and bank details. You can also apply through the Agriculture Department's local Krishi office or Duare Sarkar camps. To check your status or the beneficiary list, use your Voter ID or Aadhaar number on the same portal.",
    official_link: "https://krishakbandhu.wb.gov.in/",
    status: "active",
  },
  {
    id: "state-rajasthan-free-krishi-bijli",
    title: "Mukhyamantri Nishulk Krishi Bijli Yojana",
    slug: "mukhyamantri-nishulk-krishi-bijli-yojana",
    category: "state",
    state_name: "Rajasthan",
    state_slug: "rajasthan",
    benefit: "Free Electricity up to 2,000 Units / Month",
    last_date: "Ongoing",
    short_summary:
      "Rajasthan farmers get a zero electricity bill on agricultural power connections consuming up to 2,000 units per month, cutting a major recurring cost of tube-well and pump-set irrigation.",
    description:
      "Launched by the Government of Rajasthan, the Mukhyamantri Nishulk Krishi Bijli Yojana provides free electricity for agricultural use to farmers, up to a consumption limit of 2,000 units per month. Farmers whose monthly agricultural power usage stays within this limit pay a zero electricity bill, easing the cost of running irrigation pump sets and tube wells. The scheme is aimed at stabilising farm input costs and reducing the financial burden of irrigation on small and marginal farmers.",
    eligibility: [
      "Farmer with a registered agricultural electricity connection in Rajasthan",
      "Monthly consumption within the notified 2,000-unit limit for the zero-bill benefit",
    ],
    documents_required: [
      "Aadhaar card",
      "Existing agricultural electricity connection / K-number details",
      "Land ownership record",
    ],
    how_to_apply:
      "Registration is done at your nearest Mehangai Rahat Camp / local electricity discom (Jaipur, Ajmer or Jodhpur Vidyut Vitran Nigam) office, or through the state's e-Mitra kiosks. Carry your Aadhaar, land record and existing agricultural connection (K-number) details. For queries, call the Rajasthan helpline on 181.",
    official_link: "https://energy.rajasthan.gov.in/",
    status: "active",
  },
  {
    id: "state-telangana-rythu-bharosa",
    title: "Rythu Bharosa Scheme",
    slug: "rythu-bharosa-scheme",
    category: "state",
    state_name: "Telangana",
    state_slug: "telangana",
    benefit: "₹12,000 / Acre / Year",
    last_date: "Kharif/Rabi window (check portal)",
    short_summary:
      "Telangana's investment support scheme for active cultivators — ₹6,000 per acre per crop season (₹12,000/acre/year), paid directly to farmers with verified, actively cultivated land.",
    description:
      "Rythu Bharosa is Telangana's flagship agricultural investment-support scheme, replacing the earlier Rythu Bandhu programme. It provides ₹6,000 per acre for each of the Kharif and Rabi seasons — ₹12,000 per acre annually — to help farmers meet input costs like seeds, fertiliser and labour, reducing dependence on informal credit. Unlike its predecessor, Rythu Bharosa restricts benefits strictly to actively cultivated agricultural land, verified through the Bhu Bharati land records portal and joint field surveys, and includes tenant and landless cultivators under a separate livelihood-support component.",
    eligibility: [
      "Permanent resident of Telangana; small or marginal farmer, or a verified tenant farmer",
      "Land must be actively cultivated (verified via Bhu Bharati records and field survey) — non-agricultural, industrial or real-estate land is excluded",
      "Landless agricultural labourers may be covered under the linked livelihood-support component, subject to separate criteria",
    ],
    documents_required: [
      "Aadhaar card",
      "Updated land ownership/lease record on the Bhu Bharati portal",
      "Aadhaar-linked bank account",
    ],
    how_to_apply:
      "Ensure your land details are correctly updated on the Bhu Bharati portal, then check or apply through the official Rythu Bharosa website. Status can be checked by logging in with your Aadhaar number or Pattadar Passbook details under 'Know Your Status'.",
    official_link: "https://rythubharosa.telangana.gov.in/",
    status: "active",
  },
  {
    id: "state-ap-annadata-sukhibhava",
    title: "Annadata Sukhibhava Scheme",
    slug: "annadata-sukhibhava-scheme",
    category: "state",
    state_name: "Andhra Pradesh",
    state_slug: "andhra-pradesh",
    benefit: "Investment Support per Farmer Family",
    last_date: "Ongoing",
    short_summary:
      "Andhra Pradesh's farmer investment-support scheme, giving eligible farmer families annual financial assistance for cultivation costs, on top of the central PM-KISAN benefit.",
    description:
      "Annadata Sukhibhava is the Andhra Pradesh state government's farmer welfare scheme providing direct annual financial assistance to eligible farmer families to help with cultivation expenses such as seeds, fertiliser and other inputs, disbursed via Direct Benefit Transfer alongside their PM-KISAN instalments. Because state scheme names and amounts are periodically revised, always confirm the current instalment amount and dates on the official portal before applying.",
    eligibility: [
      "Permanent resident of Andhra Pradesh; landholding farmer family",
      "Generally requires PM-KISAN registration and verified land records",
      "Aadhaar-linked bank account",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership records",
      "Aadhaar-linked bank passbook",
    ],
    how_to_apply:
      "Check your eligibility and apply through the Government of India's myScheme portal (which lists the current official AP scheme details and links), or contact your local Village/Ward Secretariat and Agriculture Department office for the current application window and required forms.",
    official_link: "https://www.myscheme.gov.in/",
    status: "active",
  },
  {
    id: "state-karnataka-krishi-bhagya",
    title: "Krishi Bhagya Scheme",
    slug: "krishi-bhagya-scheme",
    category: "state",
    state_name: "Karnataka",
    state_slug: "karnataka",
    benefit: "Up to 90% Subsidy on Water Conservation Equipment",
    last_date: "Ongoing",
    short_summary:
      "A Karnataka scheme that subsidises farm ponds, polyhouses, drip irrigation and diesel/solar pump sets to help rain-fed farmers conserve water and reduce the impact of drought on their crops.",
    description:
      "Krishi Bhagya helps farmers in Karnataka's rain-fed (dryland) areas build water-harvesting structures such as farm ponds, and adopt water-efficient practices like drip irrigation and polyhouse cultivation. The scheme subsidises the cost of pond-lining sheets (up to 80%), drip irrigation equipment (up to 90%), and diesel or solar pump sets used to lift stored water — with higher subsidies when groups of farmers pool resources. The goal is to help farmers recharge groundwater, store rainwater for critical irrigation during dry spells, and diversify into horticulture.",
    eligibility: [
      "Farmer with cultivable land in a notified rain-fed/dryland taluk in Karnataka",
      "Willingness to construct a farm pond or adopt the supported water-conservation practice on their own land",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership record (RTC / Pahani)",
      "Bank account details",
    ],
    how_to_apply:
      "Apply through your local Raitha Samparka Kendra (Farmer Contact Centre) or the Karnataka Department of Agriculture, which verifies the site and sanctions the subsidy for the pond/irrigation equipment. Details and updates are published on the Department of Agriculture, Karnataka's official website.",
    official_link: "https://raitamitra.karnataka.gov.in/",
    status: "active",
  },
  {
    id: "state-punjab-crop-residue-management",
    title: "Crop Residue Management (CRM) Machinery Subsidy",
    slug: "crop-residue-management-machinery-subsidy",
    category: "state",
    state_name: "Punjab",
    state_slug: "punjab",
    benefit: "50%–80% Subsidy on Farm Machinery",
    last_date: "Season-based (check portal)",
    short_summary:
      "Punjab subsidises Happy Seeders, Super SMS units, mulchers and other in-situ crop-residue management machinery to help farmers manage paddy stubble without burning it.",
    description:
      "To reduce stubble burning and its impact on air quality, Punjab's Agriculture Department subsidises machinery that lets farmers manage paddy straw directly in the field (in-situ) or bale it for other use (ex-situ) — including Happy Seeders, Super Straw Management Systems (Super SMS), zero-till drills, mulchers and balers. Individual farmers can get up to 50% subsidy, while registered Custom Hiring Centres and farmer groups can receive up to 80% subsidy on eligible machines, making mechanised alternatives to burning affordable.",
    eligibility: [
      "Farmer or registered Custom Hiring Centre/cooperative society in Punjab growing paddy",
      "Purchasing machinery from an approved manufacturer/dealer under the scheme",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership record",
      "Bank account details",
      "Quotation/invoice from an approved machinery dealer",
    ],
    how_to_apply:
      "Apply online through Punjab's official agricultural machinery subsidy portal when the seasonal application window opens, selecting the machine you want and an approved dealer. Applications are verified by the district Agriculture Department before the subsidy is released.",
    official_link: "https://agrimachinerypb.com/",
    status: "active",
  },
  {
    id: "state-gujarat-ikhedut",
    title: "iKhedut Portal Farm Subsidy Schemes",
    slug: "ikhedut-portal-farm-subsidy-schemes",
    category: "state",
    state_name: "Gujarat",
    state_slug: "gujarat",
    benefit: "Varies by Scheme (Farm Equipment, Inputs & Infrastructure)",
    last_date: "Scheme-specific (check portal)",
    short_summary:
      "Gujarat's single-window iKhedut portal lets farmers apply online for dozens of state subsidy schemes covering farm equipment, drip irrigation, horticulture, animal husbandry and more.",
    description:
      "iKhedut is the Government of Gujarat's unified online portal where farmers can browse and apply for a wide range of Agriculture, Horticulture, Animal Husbandry and Fisheries Department subsidy schemes from one place — including subsidies for tractors and farm implements, micro-irrigation (drip/sprinkler) systems, greenhouses, storage structures and seed/input support. Each scheme has its own eligibility, subsidy percentage and application window, listed on the portal.",
    eligibility: [
      "Farmer with cultivable land in Gujarat (specific criteria vary by the individual scheme applied for)",
      "Valid Aadhaar and bank account for DBT",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership record (7/12 and 8-A extract)",
      "Bank passbook",
      "Scheme-specific documents (e.g. equipment quotation) as listed on the portal",
    ],
    how_to_apply:
      "Visit ikhedut.gujarat.gov.in, choose the relevant department (e.g. Agriculture) and browse the current list of open schemes. Select a scheme, fill in the online application with your land and bank details, and submit — you can track your application status on the same portal using your application number.",
    official_link: "https://ikhedut.gujarat.gov.in/",
    status: "active",
  },
  {
    id: "state-tn-cm-crop-insurance",
    title: "Chief Minister's Comprehensive Crop Insurance Scheme",
    slug: "cm-comprehensive-crop-insurance-scheme",
    category: "state",
    state_name: "Tamil Nadu",
    state_slug: "tamil-nadu",
    benefit: "Free Crop Insurance (No Farmer Premium)",
    last_date: "Season-based (check portal)",
    short_summary:
      "Tamil Nadu covers eligible farmers' crop insurance premium in full, so farmers get compensation for crop loss from natural calamities without having to pay anything themselves.",
    description:
      "Under the Chief Minister's Comprehensive Crop Insurance Scheme, the Tamil Nadu government pays the entire insurance premium on behalf of eligible farmers, extending crop-loss protection against natural calamities, pests and disease without any premium cost to the farmer. Coverage is aligned with notified crops and areas each season, and payouts follow the same yield/loss-assessment methodology used in national crop insurance schemes.",
    eligibility: [
      "Farmer cultivating a notified crop within a notified area/season in Tamil Nadu",
      "Registered on the state's agriculture department records (Uzhavan app/portal) for the relevant season",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership or tenancy record",
      "Bank account details",
    ],
    how_to_apply:
      "Registration is generally done automatically for farmers with land records in notified areas, but you should confirm your enrolment each season through your local Agriculture Department office or the Uzhavan mobile app/portal, and keep your land and bank details updated so any payout reaches you without delay.",
    official_link: "https://www.myscheme.gov.in/",
    status: "active",
  },
  {
    id: "state-odisha-cm-kisan",
    title: "CM Kisan Yojana (successor to KALIA)",
    slug: "cm-kisan-yojana-odisha",
    category: "state",
    state_name: "Odisha",
    state_slug: "odisha",
    benefit: "₹4,000 / Year (Small & Marginal Farmers)",
    last_date: "Ongoing",
    short_summary:
      "Odisha's restructured farmer income-support scheme (built on the earlier KALIA programme) — ₹4,000 a year for small and marginal farmers, and higher support for landless agricultural households.",
    description:
      "CM Kisan Yojana is Odisha's current farmer income-support scheme, restructured from the earlier KALIA (Krushak Assistance for Livelihood and Income Augmentation) programme. Small and marginal farmers receive ₹4,000 per year in two instalments, while landless agricultural households receive higher support paid in instalments, on top of any PM-KISAN benefit they already receive. Payments are made via DBT to Aadhaar-linked bank accounts, and status/beneficiary lists remain available on the state's farmer portal.",
    eligibility: [
      "Permanent resident of Odisha; small or marginal farmer (landholding within the notified limit) or a landless agricultural labourer",
      "Not a government employee, pensioner drawing above the notified threshold, or income-tax payer",
      "Aadhaar-linked bank account with completed eKYC",
    ],
    documents_required: [
      "Aadhaar card",
      "Land record (for landholding farmers) or local certification (for landless households)",
      "Bank passbook",
    ],
    how_to_apply:
      "Apply or check your status on the official Odisha farmer portal, or through your local Block Agriculture Office / Gram Panchayat. Existing KALIA beneficiaries are automatically migrated — use your Aadhaar number or earlier KALIA/CM Kisan ID to check payment status and the beneficiary list online.",
    official_link: "https://cmkisan.odisha.gov.in/",
    status: "active",
  },
  {
    id: "state-haryana-bhavantar-bharpai",
    title: "Bhavantar Bharpai Yojana",
    slug: "bhavantar-bharpai-yojana",
    category: "state",
    state_name: "Haryana",
    state_slug: "haryana",
    benefit: "Price-Deficiency Payment on Notified Crops",
    last_date: "Season-based (check portal)",
    short_summary:
      "Haryana's price-deficiency scheme tops up farmers' income when the market (mandi) price of a notified fruit, vegetable or crop falls below its guaranteed price, without requiring the government to physically procure the produce.",
    description:
      "Bhavantar Bharpai Yojana protects farmers from sudden crashes in market prices for notified fruits, vegetables and select crops. If the average selling price in the mandi during the harvest period falls below the scheme's pre-announced guaranteed price for that commodity, the government pays the farmer the difference directly — helping stabilise farm income without the state needing to buy and store the produce itself.",
    eligibility: [
      "Farmer growing a notified crop/vegetable/fruit in Haryana",
      "Produce sold through a recognised mandi/market yard and registered on the scheme's portal for the season",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership or tenancy record",
      "Mandi sale receipt (J-Form) for the notified crop",
      "Bank account details",
    ],
    how_to_apply:
      "Register your crop details on the Haryana Meri Fasal Mera Byora (crop registration) portal before the season, then sell your notified produce through a recognised mandi and keep the J-Form receipt. If the mandi price falls below the guaranteed price, the deficiency amount is credited to your registered bank account — check the scheme's current notified crops and rates on the state agriculture department's official site.",
    official_link: "https://www.myscheme.gov.in/",
    status: "active",
  },
  {
    id: "state-up-free-boring",
    title: "UP Free Boring Yojana",
    slug: "up-free-boring-yojana",
    category: "state",
    state_name: "Uttar Pradesh",
    state_slug: "uttar-pradesh",
    benefit: "Subsidy on Tube-Well Boring & Irrigation Set",
    last_date: "Ongoing",
    short_summary:
      "Uttar Pradesh subsidises the cost of boring a private tube well and installing a pump set, so small and marginal farmers can set up their own irrigation source instead of depending on erratic canal or rented-pump water.",
    description:
      "The Free Boring Yojana helps small and marginal farmers in Uttar Pradesh install their own irrigation tube well by subsidising the boring cost and, for SC/ST and smallholder categories, part of the pump set cost as well. This reduces farmers' dependence on canal irrigation schedules or rented diesel pump sets, giving them more control over irrigation timing for their crops.",
    eligibility: [
      "Small or marginal farmer (as per landholding norms) resident in Uttar Pradesh",
      "Land suitable for tube-well boring, not already covered by an existing government-subsidised boring",
    ],
    documents_required: [
      "Aadhaar card",
      "Land ownership record (khatauni)",
      "Bank passbook",
      "Caste certificate (for applicable category benefits)",
    ],
    how_to_apply:
      "Apply online through the UP Department of Agriculture's official portal (upagriculture.com), selecting the Free Boring Yojana under minor irrigation schemes, and upload your land and identity documents. Applications are verified by the local minor irrigation/agriculture office before the boring work is sanctioned.",
    official_link: "https://upagriculture.com/",
    status: "active",
  },
];

export const ALL_FALLBACK_SCHEMES: Scheme[] = [...CENTRAL_SCHEMES, ...STATE_SCHEMES];

/** Look up a fallback central scheme by its slug. */
export function findFallbackCentralScheme(slug: string): Scheme | undefined {
  return CENTRAL_SCHEMES.find((s) => s.slug === slug);
}

/** Look up a fallback state scheme by state slug + scheme slug. */
export function findFallbackStateScheme(stateSlug: string, schemeSlug: string): Scheme | undefined {
  return STATE_SCHEMES.find((s) => s.state_slug === stateSlug && s.slug === schemeSlug);
}

/** All fallback schemes published for a given state slug. */
export function fallbackSchemesForState(stateSlug: string): Scheme[] {
  return STATE_SCHEMES.filter((s) => s.state_slug === stateSlug);
}

/**
 * Real (not arbitrary) fallback scheme counts per state slug, derived
 * directly from STATE_SCHEMES above. Used by the state directory + map
 * whenever Supabase has no live data yet, so the numbers shown always
 * match what a visitor will actually find if they click through.
 */
export function fallbackStateSchemeCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const scheme of STATE_SCHEMES) {
    if (!scheme.state_slug) continue;
    counts[scheme.state_slug] = (counts[scheme.state_slug] || 0) + 1;
  }
  return counts;
}
