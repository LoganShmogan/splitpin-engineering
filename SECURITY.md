# Security Policy

The Split Pin Engineering website is maintained by **Save Point Limited** on behalf of Split Pin Engineering.

## Reporting a problem

If you find a security issue with the site or this repository, please email **[support@savepoint.co.nz](mailto:support@savepoint.co.nz)** with the subject line "Security: Split Pin website". **Do not** open a public GitHub issue for it. We will acknowledge your report within 2 working days.

## Secrets

The site is static: no backend, database, API keys or tracking. The quote form opens the visitor's own email app, so nothing is sent to a server. If a form service (Formspree, Web3Forms) is added later, its key goes in the Vercel environment or the service's dashboard, never in this repo; `.gitignore` already excludes `.env*` files.

The phone number and email in the site are the business's public contact details, not secrets.

## Access

Only Save Point can push to `main`, which deploys straight to Vercel. If a GitHub or Vercel token leaks, revoke it at github.com/settings/tokens or vercel.com/account/tokens.
