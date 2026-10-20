# Splitpin Engineering — website

Static, mobile-first site for Splitpin Engineering (sole-trader welding & fabrication).
No build step, no dependencies — plain HTML, CSS and JS, ready for Vercel.

```
index.html            Home: hero, services, about, process, gallery, contact
legal.html            Privacy policy, terms of trade, website terms (served at /legal)
404.html              Not-found page
css/styles.css        All styles (mobile-first)
js/gallery-data.js    Gallery photo list — edit this to add/remove photos
js/main.js            Nav, gallery filters, lightbox, quote form
images/work/          Optimised photos (full = lightbox, thumb = grid)
tools/                Helper to optimise new photos
vercel.json           Clean URLs, caching and security headers
```

## Before going live — replace placeholders

Search the project for `TODO` and `splitpinengineering.co.nz`:

- **Phone** `021 000 0000` / `+64210000000` — index.html, legal.html
- **Email** `hello@splitpinengineering.co.nz` — index.html, legal.html, js/main.js (`CONTACT_EMAIL`)
- **Service area** (`Manawatū & surrounds`) and **hours** — index.html contact section
- **Domain** `https://www.splitpinengineering.co.nz` — canonical/OG tags, robots.txt, sitemap.xml
- **NZBN** — legal.html
- Have the legal page reviewed — it's a sensible NZ template, not legal advice.

## Run locally

```sh
npx serve .        # or: python3 -m http.server
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Leave build command and output directory empty.
4. Deploy, then add the custom domain under **Settings → Domains**.

Or from the CLI: `npx vercel` (preview) and `npx vercel --prod`.

## Adding photos

```sh
pip install pillow
python tools/optimise-images.py ~/Pictures/new-gate.jpg
```

Paste the printed line into `js/gallery-data.js`, set the category
(`gates`, `handrails`, `trailers`, `vehicle`, `farm`, `fabrication`) and a caption.

## Quote form

The form opens the visitor's email app with their details pre-filled (no backend needed).
To receive submissions directly instead, point the form at a service like Formspree or
Web3Forms and replace the submit handler in `js/main.js`.
