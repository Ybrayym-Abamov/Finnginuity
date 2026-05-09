# Finnginuity

Custom **Baking Steel** ordering experience: payments, CRM lead capture, and room to grow into full order management.

## Stack

| Layer | Technology |
|--------|------------|
| App | [Next.js](https://nextjs.org/) 15 (App Router), React 19, TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Payments | [Stripe](https://stripe.com/) |
| CRM | [HubSpot](https://www.hubspot.com/) |
| Hosting | [Vercel](https://vercel.com/) (recommended) |

## Prerequisites

- **Node.js 20.9+** (see [`.nvmrc`](.nvmrc) — e.g. `nvm use`)
- `npm` (ships with Node)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For Stripe and HubSpot, copy [`.env.example`](.env.example) to `.env.local` and set the variables there (do not commit secrets).

## Documentation

- **[docs/initial-setup.md](docs/initial-setup.md)** — architecture and file map, environment variables, GitHub CLI (`gh`) install without Homebrew, and optional PR-description sync from the doc.

## Contributing

Use feature branches off `main`, open pull requests for review, and merge when ready.
