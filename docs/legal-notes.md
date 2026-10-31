# Legal notes

Background on `legal.html`: what each section does, the New Zealand laws it relies on, what
needs a professional review, and when it has to change.

> These notes and the legal page are a well-researched starting point, not legal advice.
> Save Point isn't a law firm. A lawyer should review the terms of trade and warranty before
> Split Pin Engineering relies on them in a dispute.

Last updated: 28 October 2026 (matches the date shown on the legal page).

## Business details on the page

- Split Pin Engineering is a **sole trader** business owned by Jason Wilson. A sole trader isn't a
  separate legal entity, so the page says the business is "the trading name of Jason
  Wilson", naming the person customers are contracting with. No
  NZBN or company number is shown.
- The page doesn't show a GST number. It says the GST number appears on quotes and invoices
  if the business is GST registered.
- If the business becomes a company, the legal page, the JSON-LD and the footer ("Sole
  trader") all need updating with the company name and number.

## Sections

### 1. About us

Identifies who operates the site and who customers are contracting with.

### 2. Privacy policy

Based on the **Privacy Act 2020** and its 13 Information Privacy Principles (IPPs).

| What the page says | Why |
|---|---|
| What's collected, where from, and why | IPP 1–4: collect only what's needed, from the person, for a lawful purpose, and tell them why (IPP 3) |
| Who it's shared with | IPP 11: limits on disclosure. The list covers the realistic cases for a fabrication business |
| Stored with Gmail and Vercel, possibly overseas | IPP 12 (cross-border disclosure) and transparency. Providers acting as agents aren't strictly a disclosure, but saying so is good practice |
| Security, seven-year retention | IPP 5 (security) and IPP 9 (don't keep longer than needed). Tax records must be kept for seven years under the Tax Administration Act 1994 |
| Notifiable privacy breaches | Part 6 of the Act: breaches likely to cause serious harm must be reported to the Privacy Commissioner and affected people |
| Access and correction within 20 working days | IPP 6 and 7, and the response time limit in section 44 |
| Complaints to the Privacy Commissioner | Required information for individuals |
| Photos of customers' jobs | Not strictly required, but builds trust and matches what the site does. `tools/optimise-images.py` strips GPS data to back this up |

The Act doesn't require a business to appoint a separate privacy officer by title, but it
does require someone to be responsible. For a sole trader that's the owner.

### 3. Terms of trade

Covers quotes vs estimates, quote validity, acceptance, variations, deposits, payment,
timeframes, cancellation, ownership and risk, the customer's responsibilities, liability and
disputes.

Points to note:

- **Prices including GST:** the Fair Trading Act 1986 requires prices advertised to
  consumers to include GST.
- **Residential work of $30,000 or more:** Part 4A of the Building Act 2004 and
  the Building (Residential Consumer Rights and Remedies) Regulations 2014 require a written
  contract, a disclosure statement and the prescribed checklist before work starts. Much
  of Split Pin's work won't be "residential building work", but structural handrails,
  balustrades, pool fencing and gates fixed to a dwelling can be. The terms commit to
  meeting these requirements; Jason will need templates if such a job comes up.
- **Retention of title (PPSA):** the Personal Property Securities Act 1999 lets an unpaid
  supplier register a security interest. This only protects Split Pin if a financing
  statement is actually registered on the PPSR. For most small jobs that's not worth
  doing; it's there for larger trailer or equipment builds.
- **No interest on overdue accounts:** the terms only claim reasonable recovery costs, to
  the extent permitted by law. Charging interest or fees on deferred payment for consumers
  can bring the arrangement under the Credit Contracts and Consumer Finance Act 2003,
  which has heavy compliance requirements. Don't add interest without legal advice.
- **Vehicles and trailers:** new builds and modifications may need certification, such as
  low-volume vehicle (LVV) certification, or heavy trailer certification for trailers over
  3,500 kg. The terms make this the customer's responsibility unless agreed, and say Split
  Pin can't guarantee a certifier's decision.
- **Consents:** the Building Act 2004 governs when work needs a building consent. Pool
  barriers have their own requirements under the Building Act. The terms put consents on
  the customer unless Split Pin agrees in writing to arrange them.
- **Unfair contract terms:** the Fair Trading Act 1986 (section 26A) prohibits unfair terms
  in standard form consumer contracts and, since August 2022, in small trade contracts.
  The terms are deliberately balanced (for example, cancellation only recovers actual
  costs, and the deposit balance is refunded). Keep it that way when editing.
- **Disputes Tribunal:** handles most small claims quickly and cheaply. The page links to
  it without quoting a monetary limit, so it doesn't go out of date.

### 4. Workmanship & warranty

- **Consumer Guarantees Act 1993:** services must be done with reasonable care and skill
  (s 28), fit for a particular purpose (s 29) and finished within a reasonable time (s 30);
  goods must be of acceptable quality (s 6) and fit for purpose (s 8). These rights can't
  be excluded for consumers, and the page says so.
- **Building Act 2004 implied warranties:** for residential building work, warranties are
  implied by section 362I regardless of the contract, enforceable for 10 years.
- **What isn't covered:** the exclusions describe things that aren't faults in the work
  (misuse, lack of maintenance, other people's modifications and so on). They don't remove
  statutory rights; they explain what the workmanship guarantee doesn't extend to.
- **Galvanising and powder coating:** surface and colour variation in hot-dip galvanising
  is normal and covered by AS/NZS 4680. Flagging it heads off a common complaint.
- **Business customers:** the callout contracts out of the CGA (s 43) and specific Fair
  Trading Act sections (s 5D: ss 9, 12A, 13 and 14(1)). Both sections require the
  agreement to be **in writing** and **fair and reasonable**. A website page alone may not
  be enough: quotes and invoices to business customers should refer to these terms (for
  example, "Our terms of trade at splitpin-engineering.vercel.app/legal apply").

### 5. Cookie policy

New Zealand has no cookie-specific law, but the Privacy Act applies to information
collected through a website, and overseas visitors expect a cookie policy. The policy is
accurate as of this date:

- the site sets **no cookies** and uses no `localStorage` or `sessionStorage`;
- the only third-party requests are Google Fonts (no cookies) and Vercel hosting;
- the quote form is a `mailto:` link, so nothing is submitted to the website.

### 6. Website terms of use

Standard terms: information is general only, copyright in content and designs, links,
acceptable use and New Zealand governing law. It also credits Save Point as the designer and
builder of the site.

### 7. Changes

Says which version applies to a job (the one in place when the quote was accepted), so
updating the page doesn't change the terms of past jobs.

## Before relying on it

Have a lawyer review:

- [ ] the terms of trade, especially liability limits, the PPSA clause and cancellation;
- [ ] the business-customer contracting-out callout and how it's brought to business
      customers' attention;
- [ ] whether any of Split Pin's regular work counts as residential building work, and
      templates for the written contract, disclosure statement and checklist;

Practical steps for Jason:

- [ ] Put "Terms of trade: splitpin-engineering.vercel.app/legal" on every quote and
      invoice (update the address if a custom domain is added).
- [ ] Turn on two-step verification for the Gmail account.
- [ ] Keep job records for seven years.

## When to update it

Update `legal.html`, its "Last updated" date and this file when any of these happen:

| Change | Sections affected |
|---|---|
| Analytics, a chat widget, embedded maps or video, or any other third-party script | 2 (Privacy: website), 5 (Cookies), possibly a consent banner |
| The quote form starts sending to a form service | 2 (Where it's stored), 5 (Third-party services) |
| Moving away from Gmail or Vercel | 2 (Where it's stored), 5 (Hosting) |
| GST registration | 1 (About us); quotes and invoices |
| Business becomes a company or changes name | 1, 8, the footer and JSON-LD on every page |
| Payment terms, deposit policy, quote validity or storage fees change | 3 (Terms of trade) and the owner guide |
| Offering finance or charging interest | 3, and get legal advice first (CCCFA) |
| Selling products online | 3 and 4: add delivery, returns and refunds, and online-trading requirements under the Fair Trading Act |
| New contact details | 8 (Contact) and everywhere else on the site |

Also bump `<lastmod>` for `/legal` in `sitemap.xml`.
