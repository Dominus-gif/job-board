/**
 * Explainers for the three tools added on 28 October 2026: the remote job
 * location checker, the remote cover letter builder and the contractor
 * invoice generator.
 *
 * Board figures are from scripts/report-locations.ts and
 * report-applications.ts on the same day; the tax and late-payment rules
 * quoted were checked then too, and are phrased as general rules because
 * both depend on where the reader is registered.
 */
import type { ToolGuide } from "./tool-guides";

export const GUIDES_E: Record<string, ToolGuide> = {
  "remote-job-location-checker": {
    h1: "Remote job location checker",
    metaTitle: "Remote Job Location Checker: Can I Apply From My Country?",
    intro:
      "Paste the location line from a remote job, such as \"Remote - EMEA\", \"US or Canada\" or \"UTC-3 to UTC+3\", choose where you live, and see whether the role is open to you, which places the line names, and how many roles on our board you can apply to.",
    html: `
      <h2>How the checker reads a location line</h2>
      <p>It does three things with the line you paste.</p>
      <ul>
        <li><strong>Countries.</strong> Any country the line names, by name, common abbreviation or major city, is read with the same matcher our job pages use. "Austin, TX" is the United States; "Remote - Germany" is Germany.</li>
        <li><strong>Region labels.</strong> EMEA, EU, EEA, Europe, DACH, Benelux, the Nordics, CEE, MENA, GCC, Africa, North America, LATAM, the Americas, APAC, Asia, Southeast Asia and ANZ are each expanded into a list of countries. Each list has a core, the countries every employer means, and an edge, the countries employers disagree about, such as Mexico in "North America" or Turkey in "Europe". A match on the edge is reported as unclear rather than guessed.</li>
        <li><strong>Time-zone windows.</strong> "UTC-3 to UTC+3", "CET ± 3 hours", "within 4 hours of EST" and "US time zones" are turned into a range of UTC offsets and compared with your time zone.</li>
      </ul>
      <p>Where a line names a place and also says "anywhere" or "global", the place wins. That is how our board reads listings too: the location line is the employer's statement about this role, and company copy about working from anywhere is about the company.</p>

      <h2>Why most remote jobs have a place attached</h2>
      <p>On 28 October 2026 our board held 4,134 remote listings, and only 86 (2.1%) could be done from anywhere. Of the 4,048 region-locked ones, 3,306 named exactly one country. Employers limit where people can work because they need a legal entity or an employer of record to pay someone in each country, and because teams want shared working hours. Our guide to <a href="/posts/remote-job-region-labels-explained">region labels in remote job ads</a> explains each label and its disputed edges.</p>

      <h2>The count beside your answer</h2>
      <p>Under the verdict, the checker shows how many roles on the board are open to someone in your country: the work-from-anywhere roles, plus the region-locked roles whose location names your country or a region that clearly includes it. It is counted with exactly the rules the checker uses, and recounted every time the board is rebuilt. Edge cases are not counted, so a role for "North America" does not count for Mexico.</p>

      <h2>What it cannot tell you</h2>
      <p>The location line is not the whole posting. A role can be open to your country on the line and still require a work permit, citizenship or security clearance further down, or ask for hours you cannot keep. The checker flags work-authorisation wording if you paste it, but for the full posting use the <a href="/tools/jd-remote-analyzer">remote job description analyzer</a>, which marks every location, visa and time-zone clause. When a line names nothing at all, the answer is in the description, or with the recruiter.</p>
    `,
    faq: [
      {
        q: "How do I know if I can apply for a remote job from my country?",
        a: "Read the location line, not the title. If it names your country, or a region that includes it, you can usually apply. Then check the description for work authorisation or time-zone requirements. If the line says only Remote, the description or the recruiter will say where.",
      },
      {
        q: "What countries are in EMEA for remote jobs?",
        a: "Europe, the Middle East and Africa, about 75 countries from Iceland to the United Arab Emirates. In practice many employers can hire only where they have an entity or an employer-of-record partner, and Russia, Belarus, Turkey and the Caucasus vary.",
      },
      {
        q: "Does this tool store what I paste?",
        a: "No. The check runs in your browser, and nothing you type is sent to our servers. The only data it loads is the count of roles on our board for each country.",
      },
      {
        q: "Why does the checker say unclear?",
        a: "Either the line names no place at all, such as a bare Remote, or your country sits at the edge of a region employers define differently, such as Mexico in North America. In both cases the honest answer is to read the description or ask the recruiter.",
      },
    ],
    related: [
      { href: "/posts/remote-job-region-labels-explained", label: "EMEA, APAC, LATAM: what region labels mean" },
      { href: "/posts/how-to-find-work-from-anywhere-jobs", label: "How to find work-from-anywhere jobs" },
      { href: "/posts/work-from-home-vs-work-from-anywhere", label: "Work from home vs work from anywhere" },
      { href: "/posts/how-to-spot-hybrid-bait-in-remote-job-descriptions", label: "How to spot hybrid bait in job descriptions" },
    ],
  },

  "remote-cover-letter-builder": {
    h1: "Remote cover letter builder",
    metaTitle: "Remote Cover Letter Builder: Free Template for Remote Jobs",
    intro:
      "Answer a few questions and get a cover letter written for a remote job: why this company, two or three results with numbers, and a paragraph that says where you are, which hours you share with the team and how you can be hired.",
    html: `
      <h2>What the builder writes, and what it doesn't</h2>
      <p>Every sentence that states something about you comes from a field you filled in. Leave a field empty and its sentence disappears; nothing is invented to fill the gap. What the builder adds is the structure: an opening that names the role and your reason for this company, your results joined into a short paragraph, a remote paragraph, and a close.</p>
      <p>The remote paragraph is the part most cover letters leave out. A remote application raises three questions before anyone reads your experience: where you are, which hours you can share with the team, and on what basis the company can pay you. Answer them up front and the reader does not have to guess.</p>

      <h2>How it works out your overlap</h2>
      <p>Choose the nearest city to you and the city the team works from. The builder compares two standard 9:00 to 17:00 working days on today's clocks, daylight saving included, and writes the number of shared hours into the letter. Lisbon and New York share three hours for most of the year, for example, and London and Bengaluru two and a half in winter and three and a half in summer. If you tick the option to shift your hours, the letter says you are willing to cover the team's core hours. Only tick it if you mean it. The <a href="/tools/timezone-overlap">timezone overlap finder</a> shows the shared window in detail.</p>

      <h2>The checklist beside the letter</h2>
      <p>The builder checks the letter against what a remote hiring manager scans for: a length of 150 to 400 words, a reason that names the company, at least one result with a number, your location, the shared hours, one example of working in writing, and an opening that is not "To whom it may concern". Writing matters more than usual here. On our board on 28 October 2026, 147 listings from 86 employers asked for strong written communication by name, and the letter is the first sample of yours they read.</p>

      <h2>When to use a cover letter at all</h2>
      <p>Few remote employers ask for one: 11 of the 2,113 full postings we read mentioned a cover letter. Write one when the posting asks, when the form has a free-text box, or when your situation needs explaining. Our guide to <a href="/posts/how-to-write-a-remote-job-cover-letter">writing a remote cover letter</a> covers each case, with a template and the mistakes to avoid.</p>
      <p>Your answers are saved in this browser only, so you can come back and adapt the letter for the next application. Nothing is sent to our servers.</p>
    `,
    faq: [
      {
        q: "What should a cover letter for a remote job include?",
        a: "Why you want this company, two or three results with numbers, and a short remote paragraph: where you are based, which working hours you share with the team, one example of working in writing, and how you can be hired if that is relevant.",
      },
      {
        q: "Is this cover letter generator free and private?",
        a: "Yes. It is free, it runs in your browser, and your answers are saved only on your device so you can reuse them. Nothing you type is sent to our servers, and the Clear button removes the saved draft.",
      },
      {
        q: "Does the builder use AI to write the letter?",
        a: "No. It assembles the letter from your own answers using a fixed structure, so every fact in it is one you supplied. That keeps the letter accurate and in your words, which matters when the letter is read as a writing sample.",
      },
      {
        q: "How long should my remote cover letter be?",
        a: "Between 150 and 400 words. The checklist beside the letter shows the count as you type, and a short, specific letter does more for a remote application than a long, general one.",
      },
    ],
    related: [
      { href: "/posts/how-to-write-a-remote-job-cover-letter", label: "How to write a cover letter for a remote job" },
      { href: "/posts/remote-job-resume-tips", label: "How to write a resume for remote jobs" },
      { href: "/posts/what-recruiters-see-when-you-apply-remotely", label: "What recruiters see when you apply remotely" },
      { href: "/posts/remote-job-interview-questions", label: "Remote job interview questions" },
    ],
  },

  "contractor-invoice-generator": {
    h1: "Contractor invoice generator",
    metaTitle: "Free Contractor Invoice Generator for International Clients",
    intro:
      "Make a clean invoice for a client in another country: any currency, payment terms with the due date worked out, an optional tax line or reverse-charge note, and your payment details. Print it or save it as a PDF from your browser.",
    html: `
      <h2>What goes on the invoice</h2>
      <p>The generator lays out everything an international client's accounts team looks for: your details and theirs, a sequential invoice number, the issue and due dates, each line of work with quantity and rate, the currency as a code, the total, and how to pay you. Add a purchase-order number or contract reference in the notes if the client gave you one; large companies route invoices by it.</p>
      <p>Totals are added up in whole cents rather than floating-point numbers, so a long list of lines never comes out a cent off, and currencies such as the Japanese yen are shown without decimals.</p>

      <h2>Tax: none, a rate, or reverse charge</h2>
      <p>Choose one of three options. <strong>No tax line</strong> suits most contractors who are not registered for VAT or sales tax, and many services supplied to business customers abroad. <strong>Add tax at a rate</strong> adds a named line, such as VAT at 20%, when you need to charge it. <strong>Reverse charge</strong> is for business-to-business services between EU countries, where the customer accounts for the VAT: the invoice then carries the words "Reverse charge", and you should add the client's VAT number, which the EU VAT Directive requires on such invoices.</p>
      <p>Which applies to you depends on where you are registered and where your client is. This is a layout tool, not tax advice. Our guide to <a href="/posts/how-to-invoice-international-clients">invoicing an international client</a> covers the EU, the UK, US clients' Form W-8BEN and late-payment rules, and when to ask a local accountant.</p>

      <h2>Payment terms and due dates</h2>
      <p>Pick terms from due on receipt to Net 60, and the due date is worked out from the issue date in calendar days and printed on the invoice. Net 14 or Net 30 is normal for contractors. In the EU, business payment terms are limited to 60 days unless expressly agreed, and a late payer owes statutory interest of at least 8 percentage points above the European Central Bank's reference rate, plus a fixed €40.</p>

      <h2>Saving and privacy</h2>
      <p>Everything stays in your browser. The draft, bank details included, is saved on your device so the next invoice starts where you left off, and "Start the next invoice" moves the number on by one and clears the lines. On a shared computer, use "Clear everything" when you finish. Nothing is sent to our servers. To set a rate before you invoice, the <a href="/tools/freelance-rate-calculator">freelance rate calculator</a> turns a target salary into the day rate that covers it.</p>
    `,
    faq: [
      {
        q: "How do I make an invoice as a PDF for free?",
        a: "Fill in the form, then choose Print or save as PDF. Your browser's print dialog opens with only the invoice on the page; pick Save as PDF as the destination. Nothing is uploaded, and the invoice prints on its own without the rest of the page.",
      },
      {
        q: "What should an invoice to a foreign client include?",
        a: "Your details and the client's, a unique sequential invoice number, the issue and due dates, what you did and for which period, the currency as a code such as USD, the total, any tax line or reverse-charge note, and your payment details such as IBAN and SWIFT.",
      },
      {
        q: "When do I put reverse charge on an invoice?",
        a: "Mainly when you are VAT-registered in the EU and supply services to a business in another EU country. The customer then accounts for the VAT, the invoice shows no VAT, carries the words 'Reverse charge' and includes the customer's VAT number. Check local rules if you are elsewhere.",
      },
      {
        q: "Is it safe to put my bank details in this invoice generator?",
        a: "The details never leave your device: the generator runs in your browser and saves the draft only in its local storage. On a shared or public computer, use Clear everything when you finish so the next person cannot see them.",
      },
    ],
    related: [
      { href: "/posts/how-to-invoice-international-clients", label: "How to invoice an international client" },
      { href: "/posts/contractor-employee-or-employer-of-record", label: "Contractor, employee or employer of record?" },
      { href: "/posts/remote-work-taxes-living-abroad", label: "Remote work and taxes when you live abroad" },
      { href: "/posts/hourly-vs-annual-remote-pay-converting-offers", label: "Converting hourly and annual remote pay" },
    ],
  },
};
