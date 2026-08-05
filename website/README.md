# Ed's Heavy Mobile Repair Website

Self-hosted recreation of [edsheavymobile.com](https://www.edsheavymobile.com), built with Next.js.

## Quick start

From the **repo root**:

```bash
npm run setup
npm run dev
```

Or from this folder:

```bash
npm run setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Page     | Route       |
|----------|-------------|
| Home     | `/`         |
| About    | `/about`    |
| Services | `/services` |
| Repairs  | `/repairs`  |
| Contact  | `/contact`  |

## Project structure

```
website/
├── app/              # Next.js pages and global styles
├── components/       # Header, Footer, ContactForm, etc.
├── lib/              # Site data (services, repairs, business info)
├── public/images/    # Logo and photos (no external CDN)
├── package.json
└── next.config.ts
```

## Google listing hours

The top bar schedule is loaded from the Google Business listing via the Places API (New) when `GOOGLE_PLACES_API_KEY` is set. Without a key it falls back to the hours in `lib/site-data.ts` (kept aligned with the Google listing).

```bash
# website/.env.local
GOOGLE_PLACES_API_KEY=your_key_here
```

Enable **Places API (New)** for the key in Google Cloud. The place ID is `business.googlePlaceId` in `lib/site-data.ts`.

## Contact form

The “Send Us a Message” form posts to `/api/contact` and delivers to `service@edsheavymobile.com`.

**Preferred:** Install **Resend** from the [Vercel Marketplace](https://vercel.com/marketplace/resend) (adds `RESEND_API_KEY`), verify `edsheavymobile.com`, then set:

```bash
CONTACT_TO_EMAIL=service@edsheavymobile.com
CONTACT_FROM_EMAIL=Ed's Heavy Mobile Repair <service@edsheavymobile.com>
```

**Fallback:** If `RESEND_API_KEY` is unset, submissions use FormSubmit. The first message triggers a one-time activation email to `service@edsheavymobile.com` — confirm that link, then later messages deliver normally.

## Deploy

```bash
npm run build
npm start
```

When deploying to Vercel, either set **Root Directory** to `website` (recommended), or deploy from the repo root — the root `vercel.json` handles the build via `npm run setup` and `npm run build`.
