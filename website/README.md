# Ed's Heavy Mobile Repair Website

Self-hosted recreation of [edsheavymobile.com](https://www.edsheavymobile.com), built with Next.js.

## Quick start

```bash
npm install
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

## Contact form

The form opens the visitor's email client with a pre-filled message to `service@edsheavymobile.com`. To use a server-side handler (Formspree, Resend, etc.), edit `components/ContactForm.tsx`.

## Deploy

```bash
npm run build
npm start
```

When deploying to Vercel, set the **Root Directory** to `website`.
