/**
 * Digital nomad and remote-worker visa thresholds for /tools/nomad-visa-checker.
 *
 * Checked against published 2026 requirements in September 2026. Several
 * thresholds are tied to a local minimum or average wage and change every
 * year, so each entry records how its figure is set and the page tells readers
 * to confirm with the named authority before applying. Amounts are in the
 * currency the programme uses; the tool converts them for display only.
 */

export interface NomadVisa {
  id: string;
  country: string;
  programme: string;
  /** Minimum income, per month, in `currency`. Annual thresholds are divided by 12. */
  monthlyIncome: number | null;
  /** A higher monthly bar that applies to non-tech roles, where the programme distinguishes. */
  nonTechMonthlyIncome?: number;
  /** Savings route, if the programme accepts one instead of income. */
  savings?: number;
  currency: string;
  basis: string;
  duration: string;
  notes: string;
  authority: string;
  region: "Europe" | "Americas" | "Asia-Pacific" | "Middle East";
}

export const NOMAD_VISAS_CHECKED = "September 2026";

export const NOMAD_VISAS: NomadVisa[] = [
  {
    id: "spain", country: "Spain", programme: "Digital nomad visa", region: "Europe",
    monthlyIncome: 2849, currency: "EUR",
    basis: "200% of the 2026 national minimum wage (paid in 14 instalments, so worked out on the annual figure). Rises for each dependant.",
    duration: "Up to 1 year from a consulate, or a residence permit of up to 3 years if you apply inside Spain; renewable.",
    notes: "Remote employees can apply for Spain's special tax regime for incoming workers (24% on qualifying employment income up to €600,000).",
    authority: "Spanish consulates and the Large Companies and Strategic Groups Unit (UGE)",
  },
  {
    id: "portugal", country: "Portugal", programme: "D8 digital nomad visa", region: "Europe",
    monthlyIncome: 3680, currency: "EUR",
    basis: "Four times the 2026 national minimum wage of €920, averaged over the last three months. More is needed for a partner or children.",
    duration: "A one-year temporary stay visa, or a residence visa that leads to a two-year residence permit.",
    notes: "The old non-habitual resident tax regime is closed to newcomers; its replacement only covers certain qualifying roles.",
    authority: "Portuguese consulates and AIMA, the immigration agency",
  },
  {
    id: "croatia", country: "Croatia", programme: "Digital nomad temporary stay", region: "Europe",
    monthlyIncome: 3622.5, savings: 43470, currency: "EUR",
    basis: "2.5 times the previous year's average monthly net salary, updated each year (2026 figure). Savings for the full stay can be used instead.",
    duration: "Up to 18 months.",
    notes: "Income from foreign employers or clients is not taxed in Croatia under the scheme.",
    authority: "Croatian Ministry of the Interior",
  },
  {
    id: "estonia", country: "Estonia", programme: "Digital nomad visa", region: "Europe",
    monthlyIncome: 4500, currency: "EUR",
    basis: "Gross monthly income, averaged over the six months before you apply.",
    duration: "Up to 1 year.",
    notes: "Staying more than 183 days in 12 months can make you tax resident in Estonia.",
    authority: "Estonian embassies and the Police and Border Guard Board",
  },
  {
    id: "greece", country: "Greece", programme: "Digital nomad visa", region: "Europe",
    monthlyIncome: 3500, currency: "EUR",
    basis: "Monthly income, increased by 20% for a spouse and 15% for each child.",
    duration: "A 12-month visa, after which you can apply for a renewable two-year residence permit.",
    notes: "Since February 2026, applications must be made through a Greek consulate before travelling.",
    authority: "Greek consulates and the Ministry of Migration and Asylum",
  },
  {
    id: "malta", country: "Malta", programme: "Nomad Residence Permit", region: "Europe",
    monthlyIncome: 3500, currency: "EUR",
    basis: "€42,000 gross a year from remote work.",
    duration: "1 year, renewable up to a total of 4 years.",
    notes: "The threshold applies to the main applicant and doesn't rise with dependants.",
    authority: "Residency Malta Agency",
  },
  {
    id: "hungary", country: "Hungary", programme: "White Card", region: "Europe",
    monthlyIncome: 3000, currency: "EUR",
    basis: "At least €3,000 a month for the six months before applying.",
    duration: "1 year, renewable once.",
    notes: "You must keep earning at that level while you hold the card.",
    authority: "Hungarian National Directorate-General for Aliens Policing",
  },
  {
    id: "italy", country: "Italy", programme: "Digital nomad visa", region: "Europe",
    monthlyIncome: 2333, currency: "EUR",
    basis: "€28,000 a year. Applicants must also be highly qualified, for example with a degree or several years of relevant experience.",
    duration: "Up to 1 year, renewable.",
    notes: "Consulates began accepting applications in March 2026.",
    authority: "Italian consulates",
  },
  {
    id: "cyprus", country: "Cyprus", programme: "Digital nomad visa", region: "Europe",
    monthlyIncome: 3500, currency: "EUR",
    basis: "€3,500 net a month, increased by 20% for a spouse and 15% for each child.",
    duration: "1 year, renewable for up to 2 more years.",
    notes: "Places are capped each year.",
    authority: "Cyprus Civil Registry and Migration Department",
  },
  {
    id: "costa-rica", country: "Costa Rica", programme: "Remote worker stay (digital nomad visa)", region: "Americas",
    monthlyIncome: 3000, currency: "USD",
    basis: "US$3,000 a month from foreign sources, or US$4,000 with dependants.",
    duration: "1 year, renewable once.",
    notes: "Foreign income is exempt from Costa Rican income tax under the scheme.",
    authority: "Costa Rica's General Directorate of Migration",
  },
  {
    id: "brazil", country: "Brazil", programme: "VITEM XIV digital nomad visa", region: "Americas",
    monthlyIncome: 1500, savings: 18000, currency: "USD",
    basis: "US$1,500 a month from foreign sources, or US$18,000 in savings.",
    duration: "1 year, renewable for another year.",
    notes: "Income must come from employers or clients outside Brazil.",
    authority: "Brazilian consulates",
  },
  {
    id: "uae", country: "United Arab Emirates", programme: "Virtual Working Programme", region: "Middle East",
    monthlyIncome: 3500, currency: "USD",
    basis: "US$3,500 a month, shown on six months of bank statements. Business owners face a higher bar.",
    duration: "1 year, renewable.",
    notes: "The UAE has no personal income tax.",
    authority: "UAE federal and Dubai immigration authorities",
  },
  {
    id: "indonesia", country: "Indonesia", programme: "E33G remote worker visa", region: "Asia-Pacific",
    monthlyIncome: 5000, currency: "USD",
    basis: "US$60,000 a year, with an employment contract from a company outside Indonesia.",
    duration: "1 year.",
    notes: "You can't work for Indonesian companies or clients on this visa.",
    authority: "Indonesian Directorate General of Immigration",
  },
  {
    id: "japan", country: "Japan", programme: "Digital nomad visa (Designated Activities)", region: "Asia-Pacific",
    monthlyIncome: 833333, currency: "JPY",
    basis: "¥10 million a year. Only nationals of certain countries with visa and tax agreements with Japan can apply.",
    duration: "6 months, not renewable. You can reapply after six months outside Japan.",
    notes: "Private health insurance with at least ¥10 million of cover is required.",
    authority: "Japanese embassies and consulates",
  },
  {
    id: "thailand", country: "Thailand", programme: "Destination Thailand Visa (DTV)", region: "Asia-Pacific",
    monthlyIncome: null, savings: 500000, currency: "THB",
    basis: "No income test. You need at least ฿500,000, or the equivalent, in savings.",
    duration: "5-year multiple-entry visa, with stays of up to 180 days per entry that can be extended once.",
    notes: "Aimed at remote workers and long-stay visitors working for employers outside Thailand.",
    authority: "Royal Thai embassies and the Thai e-Visa portal",
  },
  {
    id: "malaysia", country: "Malaysia", programme: "DE Rantau Nomad Pass", region: "Asia-Pacific",
    monthlyIncome: 2000, nonTechMonthlyIncome: 5000, currency: "USD",
    basis: "US$24,000 a year for tech and digital roles. Other remote professions need US$60,000 a year.",
    duration: "12 months, renewable for another 12.",
    notes: "Non-tech applicants should use the higher threshold of US$5,000 a month.",
    authority: "Malaysia Digital Economy Corporation (MDEC)",
  },
];
