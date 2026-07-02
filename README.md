# Ed's Heavy Mobile Repair LLC

Repository for Ed's Heavy Mobile Repair website and related assets.

## One-command setup

From the **repo root** (after cloning):

```bash
git clone https://github.com/bigman8u4lunch/Ed-sHeavyMobileRepairLLC.git
cd Ed-sHeavyMobileRepairLLC
npm run setup
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
|---------|----------------|
| `npm run setup` | Install dependencies in `website/` |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production server |

You can also work directly inside `website/`:

```bash
cd website
npm run setup   # or: npm install
npm run dev
```

## Project structure

```
├── package.json      ← root scripts (setup, dev, build)
├── vercel.json       ← Vercel config (uses website/ via npm scripts)
└── website/          ← Next.js app
    ├── app/
    ├── components/
    ├── public/images/
    └── package.json
```

## Deploy on Vercel

**Option A (recommended):** Import the repo and set **Root Directory** to `website` in Project Settings → Build & Deployment.

**Option B:** Leave Root Directory as `.` (repo root). The root `vercel.json` runs `npm run setup` and `npm run build`, which build the app in `website/` automatically.

Then point `edsheavymobile.com` DNS to Vercel when ready to leave ShopView.
