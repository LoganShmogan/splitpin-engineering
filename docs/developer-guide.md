# Developer guide

For Savepoint, maintaining the Split Pin Engineering site.

## Stack

- Static HTML, one stylesheet and two small JavaScript files. No build step, no package
  manager, no framework.
- Hosted on Vercel, deployed automatically when `main` is pushed to GitHub.
- Fonts from Google Fonts. No other third-party scripts, no analytics, no cookies.

## Project structure

```
index.html            Home
services.html         Services                   (/services)
about.html            About                      (/about)
work.html             Gallery with lightbox      (/work, /work?cat=gates)
contact.html          Contact details + quote form (/contact)
legal.html            Privacy, terms, warranty, cookies, website terms (/legal)
404.html              Not-found page
css/styles.css        All styles, mobile-first
js/gallery-data.js    Gallery photo list and categories
js/main.js            Nav, scroll reveal, call bar, gallery, lightbox, quote form
images/hero.webp      Home page hero image
images/og.jpg         Social sharing image (1200x630)
images/work/full/     Gallery images for the lightbox (max 1800px, WebP)
images/work/thumb/    Gallery thumbnails (max 720px, WebP)
favicon.svg           Site icon
tools/optimise-images.py  Converts new photos for the gallery
robots.txt            Crawler rules, including AI search bots
sitemap.xml           Page list for search engines
llms.txt              Plain-text business summary for AI assistants
vercel.json           Clean URLs, security headers and caching
docs/                 This documentation
.vercelignore         Keeps docs/, tools/ and README.md off the live site
```

The original full-resolution photos (`/*.jpg` in the project root) are git-ignored. Keep
them locally or in shared storage; only the optimised WebP versions are deployed.

## Running locally

```sh
npx serve .            # supports clean URLs like /services
# or
python3 -m http.server # use /services.html instead of /services
```

## Pages and shared markup

Each page is self-contained. The following are **copied into every page**, so a change to
any of them must be made in all six main pages (and `404.html` where it applies):

- the icon sprite (`<svg>` with `<symbol>`s) at the top of `<body>`;
- the header and nav (`.site-header`);
- the footer (`.site-footer`) and the mobile call bar (`.call-bar`);
- the `<head>`: fonts, stylesheet link with its `?v=` tag, favicon and the
  `HomeAndConstructionBusiness` JSON-LD block.

Search for a unique string from the snippet you're changing to find every copy, for
example `grep -n 'class="call-bar"' *.html`.

The nav marks the current page with `aria-current="page"`. Inner pages also have a
`BreadcrumbList` JSON-LD block and a visible `.crumbs` line.

## Styles

`css/styles.css` is written mobile-first, with a breakpoint for larger screens at the
bottom. Colours, fonts and spacing are CSS custom properties on `:root`; change them there.

### Branding

There's no original logo artwork. The logo and the sign replica on the contact page are
built in HTML and CSS from a photo of the workshop sign (`SPLITPINbrand.jpg`, not deployed).

- **Russo One**, skewed: the "SPLIT PIN" wordmark.
- **Michroma**: the "ENGINEERING" plate and the phone number on the sign.
- **Barlow / Barlow Condensed**: body text and headings.
- **JetBrains Mono**: small labels and nav numbers.

Relevant classes: `.logo`, `.logo-name`, `.logo-plate`, `.sign`, `.dot-list`.

### Cache busting

Every page loads the stylesheet and scripts with a version tag, for example
`/css/styles.css?v=32f8084b`. `vercel.json` tells browsers to revalidate CSS and JS on each
visit, and the tag guarantees a fresh copy after a change.

After editing `css/styles.css` or anything in `js/`, change the `?v=` value in **every**
HTML page:

```sh
NEW=$(sha256sum css/styles.css | cut -c1-8)
sed -i "s/styles\.css?v=[a-z0-9]*/styles.css?v=$NEW/" *.html
```

Do the same for `main.js` and `gallery-data.js` when they change.

## Gallery

Photos are listed in `js/gallery-data.js`:

```js
// [file id, category, caption, thumb width, thumb height]
["4909", "gates", "Powder-coated driveway gate and fence", 720, 540],
```

- **File id** is the filename without `.webp`. The same name must exist in both
  `images/work/full/` and `images/work/thumb/`.
- **Category** must be one of the keys in `GALLERY_CATEGORIES`: `gates`, `handrails`,
  `trailers`, `vehicle`, `farm`, `fabrication`. A category with no photos doesn't show a
  filter chip.
- **Caption** is used as the image's alt text and the lightbox title, so make it describe
  the photo.
- **Width and height** are the thumbnail's size and stop the layout jumping while images
  load.

Order in the file is the order on the page. Put the strongest photos first; the home page
"recent work" section is separate markup in `index.html`.

The gallery shows 12 photos at a time on phones and 16 on larger screens, with a "Show
more" button. Filters are reflected in the URL (`/work?cat=trailers`), so you can link
straight to a category.

### Adding photos

```sh
pip install pillow
python tools/optimise-images.py ~/Pictures/new-gate.jpg ~/Pictures/another.jpg
```

The script:

- corrects rotation from the phone's EXIF data;
- writes a 1800px WebP to `images/work/full/` and a 720px WebP to `images/work/thumb/`;
- strips EXIF and GPS data, so a customer's location isn't published;
- prints a line for each photo to paste into `js/gallery-data.js`.

Edit the pasted line's category and caption, bump the `?v=` tag for `gallery-data.js`, and
check the photo doesn't show a number plate, house number or face without consent (see
the privacy policy).

## Quote form

The form on `contact.html` doesn't post anywhere. `js/main.js` builds a `mailto:` link to
`CONTACT_EMAIL` with the name, phone, job type and message, and the visitor's email app
sends it.

To receive submissions directly instead:

1. Sign up for a form service (Formspree, Web3Forms or similar) using Jason's email.
2. Replace the submit handler in `js/main.js` with a `fetch` POST to the service, and show a
   success or error message on the page.
3. Add a spam check (most services offer a honeypot field or captcha).
4. **Update the legal page.** The privacy policy and cookie policy both say the form
   doesn't send or store anything through the website. Name the form service as a
   provider that stores enquiries, and say where it stores them.

## SEO

- Every page has a location-focused `<title>` and meta description (Palmerston North /
  Manawatū), a canonical URL, Open Graph tags and geo meta tags.
- Every page includes the same `HomeAndConstructionBusiness` JSON-LD with an `@id`, address
  locality, areas served, contact details and a services catalogue. If contact details or
  services change, update **every** copy. Test with Google's
  [Rich Results Test](https://search.google.com/test/rich-results).
- `sitemap.xml` lists every page. Update the page's `<lastmod>` when its content changes.
- `robots.txt` allows all crawlers and names the main AI search and assistant bots.
- `llms.txt` is a plain-text summary of the business for AI assistants. Keep it in step
  with the services and contact details.
- `images/og.jpg` is the image shown when the site is shared on social media or in
  messaging apps.

### After launch

- Submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console)
  and Bing Webmaster Tools.
- Set up a **Google Business Profile** for Split Pin Engineering with the same name, phone
  and service area as the site, and link it to the site. For a local trade this matters
  more than anything on the page.

## Deployment

Vercel is connected to the GitHub repo. Pushing to `main` deploys to production; pushes to
other branches and pull requests get preview URLs.

Vercel project settings: framework preset **Other**, build command and output directory
empty.

From the CLI, if needed: `npx vercel` (preview) and `npx vercel --prod`.

`vercel.json` sets:

- `cleanUrls`: `/services` serves `services.html`;
- security headers on every response (`X-Content-Type-Options`, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy`);
- 30-day caching for `/images/`, revalidation for `/css/` and `/js/`.

### Custom domain

The site currently uses `https://splitpin-engineering.vercel.app` everywhere a full URL is
needed. If a custom domain is added:

1. Add it in Vercel under **Settings → Domains** and set the DNS records Vercel shows.
2. Make it the primary domain so the `vercel.app` address redirects to it.
3. Find and replace the old URL throughout the project:

   ```sh
   grep -rl 'splitpin-engineering.vercel.app' --exclude-dir=.git . \
     | xargs sed -i 's#https://splitpin-engineering.vercel.app#https://www.example.co.nz#g'
   ```

   This covers canonical and Open Graph tags, JSON-LD, `robots.txt`, `sitemap.xml`,
   `llms.txt` and the docs.
4. Add the new domain as a property in Search Console and resubmit the sitemap.

## Pre-release checklist

Before pushing a change to `main`:

- [ ] Shared markup changed in every page that has it.
- [ ] `?v=` tags bumped if CSS or JS changed.
- [ ] Checked at phone width (about 375px) and desktop width, with no horizontal scroll.
- [ ] Nav, mobile menu, call bar, gallery filters, lightbox and quote form still work.
- [ ] No broken links (`/legal#…` anchors included).
- [ ] `sitemap.xml` `<lastmod>` updated for changed pages.
- [ ] JSON-LD still valid if it was touched.
- [ ] Legal page updated if the change affects data collection, cookies, third-party
      services or terms (see [legal notes](legal-notes.md#when-to-update-it)).
