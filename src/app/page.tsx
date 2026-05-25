"use client";

import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STANDARD_PRODUCT = {
  name: '16" × 16" Baking Steel',
  price: 119,
  weight: "16 lbs",
  thickness: '1/4"',
  description:
    "The classic square. Holds heat like cast iron, conducts like steel — ideal for pizza, bread, and searing. Ships in 3–5 business days.",
  features: ["1/4″ A36 steel", "16 lbs", "Pre-seasoned", "Oven & grill safe"],
};

const THICKNESS_OPTIONS = [
  { value: "0.25", label: '1/4" (Standard) — best for home ovens' },
  { value: "0.375", label: '3/8" (Pro) — restaurant-grade heat retention' },
  { value: "0.5", label: '1/2" (Ultra) — maximum thermal mass' },
];

type OrderConfirmation = {
  type: "standard" | "custom";
  details: string;
};

export default function HomePage() {
  const [customWidth, setCustomWidth] = useState("");
  const [customDepth, setCustomDepth] = useState("");
  const [customThickness, setCustomThickness] = useState("");
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null,
  );
  const [customError, setCustomError] = useState("");

  function handleStandardOrder() {
    setConfirmation({
      type: "standard",
      details: `16" × 16" Baking Steel — $${STANDARD_PRODUCT.price}`,
    });
  }

  function handleCustomOrder(e: React.FormEvent) {
    e.preventDefault();
    setCustomError("");

    const w = parseFloat(customWidth);
    const d = parseFloat(customDepth);

    if (!customWidth || !customDepth || !customThickness) {
      setCustomError("Please fill in all fields.");
      return;
    }
    if (w < 6 || w > 36 || d < 6 || d > 36) {
      setCustomError("Width and depth must be between 6 and 36 inches.");
      return;
    }

    const label = THICKNESS_OPTIONS.find(
      (t) => t.value === customThickness,
    )?.label.split(" —")[0];

    setConfirmation({
      type: "custom",
      details: `Custom ${customWidth}" × ${customDepth}" @ ${label}`,
    });
  }

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/80 backdrop-blur">
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

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="flex flex-1 flex-col justify-center px-6 py-24">
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

      {/* ── Shop ───────────────────────────────────────────── */}
      <section id="shop" className="border-t border-border bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Shop
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              The Collection
            </h2>
            <p className="mt-3 text-muted-foreground">
              Ready-to-ship standard sizes or fully custom to your spec.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* ── Standard Product Card ── */}
            <div className="flex flex-col rounded-xl border border-border bg-background p-7 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className="mb-3">In Stock</Badge>
                  <h3 className="text-xl font-semibold">
                    {STANDARD_PRODUCT.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {STANDARD_PRODUCT.description}
                  </p>
                </div>
              </div>

              <div className="my-6 grid grid-cols-2 gap-3">
                {STANDARD_PRODUCT.features.map((f) => (
                  <div
                    key={f}
                    className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground"
                  >
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ${STANDARD_PRODUCT.price}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    USD
                  </span>
                </span>
                <Button onClick={handleStandardOrder} size="lg">
                  Order Now
                </Button>
              </div>
            </div>

            {/* ── Custom Order Card ── */}
            <div className="flex flex-col rounded-xl border border-primary/30 bg-background p-7 shadow-sm ring-1 ring-primary/10">
              <Badge variant="outline" className="mb-3 w-fit border-primary/40 text-primary">
                Custom Order
              </Badge>
              <h3 className="text-xl font-semibold">Build Your Steel</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose your exact dimensions and thickness. We cut and season to
                order — allow 2–3 weeks lead time.
              </p>

              <form onSubmit={handleCustomOrder} className="mt-6 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="width">Width (inches)</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="e.g. 14"
                      min={6}
                      max={36}
                      step={0.5}
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="depth">Depth (inches)</Label>
                    <Input
                      id="depth"
                      type="number"
                      placeholder="e.g. 14"
                      min={6}
                      max={36}
                      step={0.5}
                      value={customDepth}
                      onChange={(e) => setCustomDepth(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="thickness">Thickness</Label>
                  <Select onValueChange={setCustomThickness} value={customThickness}>
                    <SelectTrigger id="thickness">
                      <SelectValue placeholder="Select thickness…" />
                    </SelectTrigger>
                    <SelectContent>
                      {THICKNESS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {customError && (
                  <p className="text-sm text-destructive">{customError}</p>
                )}

                <Button type="submit" size="lg" className="mt-auto">
                  Request Custom Order
                </Button>
              </form>
            </div>
          </div>

          {/* ── Confirmation Toast ── */}
          {confirmation && (
            <div className="mt-8 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-6 py-4 text-sm dark:border-green-800 dark:bg-green-950">
              <p className="text-green-800 dark:text-green-200">
                <span className="font-semibold">Order received!</span>{" "}
                {confirmation.details} —{" "}
                {confirmation.type === "standard"
                  ? "We'll follow up with a payment link shortly."
                  : "We'll review your specs and send a quote within 24 hours."}
              </p>
              <button
                onClick={() => setConfirmation(null)}
                className="ml-4 text-green-600 hover:text-green-800 dark:text-green-400"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Why Steel
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              The science of the crust
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "20× more conductive than stone",
                body: "Steel transfers heat into your dough instantly — no more pale, soggy bottoms. Expect leopard-spotted crusts in under 5 minutes.",
              },
              {
                title: "Lasts a lifetime",
                body: "A36 structural steel doesn't crack, chip, or warp. Season it once, maintain it lightly, and it outlives any ceramic or cordierite stone.",
              },
              {
                title: "Grill, oven, or broiler",
                body: "Rated to 1000 °F. Use it on a gas or charcoal grill for outdoor Neapolitan pies, or slide it on the top rack under the broiler.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-muted/40 p-6"
              >
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border bg-muted/30 px-6 py-14 text-sm text-muted-foreground">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="mb-2 text-base font-semibold text-foreground">Finnginuity</p>
            <p className="text-sm leading-relaxed">
              Premium Baking Steel cookware for home cooks and professionals.
              Engineered for heat. Built to last.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
              Shop
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="#shop" className="hover:text-foreground transition-colors">
                  16&quot; × 16&quot; Baking Steel
                </Link>
              </li>
              <li>
                <Link href="#shop" className="hover:text-foreground transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-foreground transition-colors">
                  Why Baking Steel?
                </Link>
              </li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
              Support
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Care & Seasoning Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl border-t border-border pt-6 text-center text-xs">
          © {new Date().getFullYear()} Finnginuity. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
