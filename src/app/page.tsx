import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <header className="border-b border-border/80 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight">
            Finnginuity
          </span>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link className="hover:text-foreground" href="#shop">
              Shop
            </Link>
            <Link className="hover:text-foreground" href="#about">
              Baking Steel
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex flex-1 flex-col justify-center px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Baking Steel
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Serious heat. Serious crust.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
            Finnginuity brings pro-grade steel and tools to your kitchen —
            engineered for pizza, bread, and everything you want blistered and
            beautiful.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="#shop">Shop the collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#about">Why steel</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Finnginuity. Stack: Next.js, Tailwind,
        shadcn/ui — Stripe & HubSpot ready.
      </footer>
    </main>
  );
}
