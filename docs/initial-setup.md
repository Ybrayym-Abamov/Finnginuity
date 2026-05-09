# Finnginuity — initial setup reference

The block below is intended to be pasted into the GitHub pull request description for `feature/InitialSetup`.

---

## PR description (copy from here through the end of this section)

<!-- pr-body-start -->

### Summary

Initial application scaffold for **Finnginuity** (Baking Steel): a **Next.js** storefront/marketing foundation with **Tailwind CSS**, **shadcn/ui**, and stubs for **Stripe** (payments) and **HubSpot** (CRM), ready for **Vercel** deployment.

### Stack

| Area | Choice |
|------|--------|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 3, CSS variables, `tailwindcss-animate` |
| Components | shadcn/ui — **New York** style (`components.json`), Radix Slot, CVA |
| Payments | `stripe` SDK — server helper + webhook route |
| CRM | `@hubspot/api-client` — client factory + placeholder sync |
| Hosting target | Vercel (no `vercel.json` required for defaults) |

### What was added

- **App shell:** `src/app/layout.tsx` (metadata, Geist fonts, global styles), `src/app/page.tsx` (Finnginuity / Baking Steel landing hero and CTAs).
- **Design system:** `src/app/globals.css` (theme tokens; warm primary for brand), `tailwind.config.ts` (shadcn color/radius/chart tokens, font variables), `src/lib/utils.ts` (`cn`), `src/components/ui/button.tsx`.
- **shadcn config:** `components.json` (aliases, New York, neutral base).
- **Stripe:** `src/lib/stripe.ts` (`getStripe()`), `src/app/api/webhooks/stripe/route.ts` (signature verification, `checkout.session.completed` placeholder).
- **HubSpot:** `src/lib/hubspot.ts` (`getHubSpotClient()`, `syncLeadPlaceholder()` — implement search-then-create before production).
- **Tooling:** ESLint flat config (`eslint.config.mjs`), PostCSS, `tsconfig.json` with `@/*` paths, `next.config.ts`, `.gitignore`.
- **Environment template:** `.env.example` (`NEXT_PUBLIC_SITE_URL`, Stripe keys, `STRIPE_WEBHOOK_SECRET`, `HUBSPOT_ACCESS_TOKEN`).
- **Node:** `.nvmrc` (22) and `package.json` `engines` (`>=20.9.0`).
- **Git history:** Merged `origin/main` so the existing `README.md` remains in the tree.

### How to run (after install)

Requires **Node 20.9+** (see `.nvmrc`).

```bash
npm install
npm run dev
```

### Follow-ups (not in this PR)

- Wire **Stripe Checkout** or Payment Links and finalize webhook handlers (orders, HubSpot sync).
- Implement **HubSpot** contact upsert (search by email, then create/update).
- Connect **Vercel** project, set env vars from `.env.example`, register Stripe webhook URL.
- Add more shadcn primitives as needed (`npx shadcn@latest add …`).

<!-- pr-body-end -->

---

## Detailed file map

| Path | Purpose |
|------|---------|
| `package.json` | Scripts and dependencies |
| `next.config.ts` | Next config (minimal) |
| `tsconfig.json` | TypeScript + `@/*` paths |
| `tailwind.config.ts` | Tailwind + shadcn theme extensions |
| `postcss.config.mjs` | Tailwind + Autoprefixer |
| `eslint.config.mjs` | `next/core-web-vitals`, `next/typescript` |
| `components.json` | shadcn/ui project settings |
| `src/app/globals.css` | Tailwind layers + design tokens |
| `src/app/layout.tsx` | Root layout, fonts, metadata |
| `src/app/page.tsx` | Home / marketing shell |
| `src/components/ui/button.tsx` | shadcn Button |
| `src/lib/utils.ts` | `clsx` + `tailwind-merge` helper |
| `src/lib/stripe.ts` | Stripe server client |
| `src/lib/hubspot.ts` | HubSpot client + CRM stub |
| `src/app/api/webhooks/stripe/route.ts` | Stripe webhook endpoint |
| `.env.example` | Documented env vars |
| `.nvmrc` | Node 22 for local/Vercel alignment |

## GitHub CLI (`gh`) without Homebrew

Homebrew may fail on older macOS/Xcode CLT. Install the official binary instead:

```bash
VER=2.92.0 ARCH=amd64  # use arm64 on Apple Silicon
curl -fsSL -o /tmp/gh.zip "https://github.com/cli/cli/releases/download/v${VER}/gh_${VER}_macOS_${ARCH}.zip"
unzip -o /tmp/gh.zip -d /tmp && mkdir -p ~/.local/bin && cp "/tmp/gh_${VER}_macOS_${ARCH}/bin/gh" ~/.local/bin/
chmod +x ~/.local/bin/gh
```

Ensure `~/.local/bin` is on your `PATH` (e.g. `export PATH="$HOME/.local/bin:$PATH"` in `~/.zshrc`).

**Authenticate once** (browser or token):

```bash
gh auth login
# or: export GH_TOKEN=ghp_xxx   # classic PAT with repo scope
```

**Sync this PR’s description** from `docs/initial-setup.md` (markers `pr-body-start` / `pr-body-end`):

```bash
./scripts/update-pr-description.sh
```
