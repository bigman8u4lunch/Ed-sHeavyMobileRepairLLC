# Ed's Heavy Mobile Repair Website

Self-hosted recreation of [edsheavymobile.com](https://www.edsheavymobile.com), built with Next.js so you can deploy independently of ShopView or any other site builder.

## Pages

- **Home** — hero, about intro, services/repairs overview, testimonials, contact
- **About** — company story and sidebar with hours/contact
- **Services** — all 13 service offerings with descriptions
- **Repairs** — all 17 repair categories with descriptions
- **Contact** — contact form, business info, and map

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to [Vercel](https://vercel.com), Netlify, or any Node.js host:

```bash
npm run build
npm start
```

Point your domain `edsheavymobile.com` to the deployment when ready to switch from the current provider.

## Contact Form

The contact form opens the visitor's email client with a pre-filled message to `service@edsheavymobile.com`. To use a server-side form handler (Formspree, Resend, etc.), update `components/ContactForm.tsx`.

## Assets

All images are stored locally in `public/images/` — no dependency on the previous hosting provider's CDN.
