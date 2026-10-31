# Split Pin Engineering website: documentation

Website for **Split Pin Engineering**, a welding, steel fabrication, maintenance and repair
business run by Jason Wilson as a sole trader in Palmerston North, New Zealand.

Designed, built and maintained by **Save Point Limited**. Not open source: site code © Save Point Limited, content and branding © Split Pin Engineering. See [LICENSE](../LICENSE).

| | |
|---|---|
| Live site | https://splitpin-engineering.vercel.app |
| Repository | https://github.com/LoganShmogan/splitpin-engineering |
| Hosting | Vercel (deploys automatically from `main`) |
| Business phone | 022 016 7223 |
| Business email | splitpin176v@gmail.com |

## Guides

| Guide | For | What's in it |
|---|---|---|
| [Owner guide](owner-guide.md) | Jason | What the site does, how enquiries reach you, what to send Save Point when something needs changing, and your responsibilities under the legal page |
| [Developer guide](developer-guide.md) | Save Point | Project structure, editing pages, styles, the gallery, adding photos, SEO, deployment, domains and a pre-release checklist |
| [Legal notes](legal-notes.md) | Save Point and Jason | What each part of the legal page covers, the laws it relies on, what needs checking by a lawyer, and when it must be updated |

The top-level [README](../README.md) is the short version for anyone opening the repo.

## The site at a glance

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Hero, services overview, recent work, about teaser, call to action |
| Services | `/services` | Each service in detail, plus how a job works from enquiry to install |
| About | `/about` | The owner-operator story and what customers can expect |
| Our Work | `/work` | Filterable photo gallery with a full-screen lightbox |
| Contact | `/contact` | Phone, email, service area, hours and the quote form |
| Legal | `/legal` | Privacy policy, terms of trade, warranty, cookie policy, website terms |
| Not found | any bad URL | Friendly 404 page |

It's a plain static site: HTML, CSS and a little JavaScript. There is no build step, no
framework, no database, no backend and no tracking.

## Current status (28 October 2026)

Done:

- All pages built, branded with the Split Pin workshop sign, and live on Vercel.
- Real phone number and email throughout.
- Local SEO for Palmerston North / Manawatū: titles, descriptions, Open Graph tags,
  structured data, sitemap, robots.txt and llms.txt.
- Legal page covering privacy, terms of trade, warranty, cookies and website use.

Outstanding:

- Confirm opening hours with Jason (the contact page currently says Mon–Fri, 7am–5pm).
- Decide on a custom domain (see the [developer guide](developer-guide.md#custom-domain)).
- Have the legal page reviewed (see [legal notes](legal-notes.md#before-relying-on-it)).
- Optional: Google Business Profile, Search Console, and a form service so quote requests
  arrive without relying on the visitor's email app.
