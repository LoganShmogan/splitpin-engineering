# Split Pin Engineering website

Static, mobile-first site for Split Pin Engineering (sole-trader welding & fabrication).
No build step, no dependencies. Plain HTML, CSS and JS, ready for Vercel.

```
index.html            Home: hero, services overview, recent work, about teaser
services.html         Each service in detail + how it works      (/services)
about.html            About the business                         (/about)
work.html             Filterable photo gallery with lightbox     (/work, /work?cat=gates)
contact.html          Contact details + quote form               (/contact)
legal.html            Privacy, terms of trade, cookies, website terms (/legal)
404.html              Not-found page
css/styles.css        All styles (mobile-first)
js/gallery-data.js    Gallery photo list (edit this to add/remove photos)
js/main.js            Nav, gallery filters, lightbox, quote form
images/work/          Optimised photos (full = lightbox, thumb = grid)
tools/                Helper to optimise new photos
vercel.json           Clean URLs, caching and security headers
```

The header and footer are repeated in each HTML page, so nav or footer changes need making in all six.

## Before going live: replace placeholders

Phone (022 016 7223) and email (splitpin176v@gmail.com) are set. Still to confirm
(search the project for `TODO` and `splitpinengineering.co.nz`):

- **Service area** (`Manawatū & surrounds`) and **hours**: contact.html
- **Domain** `https://www.splitpinengineering.co.nz`: canonical/OG tags, robots.txt, sitemap.xml
- **NZBN**: legal.html
- Have the legal page reviewed. It's a sensible NZ template, not legal advice.

## Branding

The logo and the sign replica on the contact page are built in HTML/CSS from a photo of the
workshop sign (no original artwork file). Fonts: Russo One (SPLIT PIN, skewed), Michroma
(ENGINEERING plate and phone number), Kaushan Script ("Call Me"). Classes: `.logo`, `.sign`, `.dot-list`.

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

## Cache busting

Each page loads CSS/JS with a version tag (e.g. `/css/styles.css?v=df132369`) so visitors
never get stuck on an old stylesheet. After editing `css/styles.css` or anything in `js/`,
change the `?v=` value in every HTML page (any new value works; a short hash of the file is tidy).
