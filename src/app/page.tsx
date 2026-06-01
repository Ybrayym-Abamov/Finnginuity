"use client";

import Image from "next/image";
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
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SocialSection } from "@/components/social-section";

const PRODUCTS = [
  {
    id: "square-16x16",
    name: '16" × 16" Square',
    price: 119,
    tag: "Best Seller",
    image: "/images/square-counter.png",
    description:
      "The one that started it all. Fits most home ovens, holds heat like a dream, and gets better every time you cook on it.",
    features: ['1/4" A36 steel', "16 lbs", "Pre-seasoned", "Oven & grill safe"],
  },
  {
    id: "round-16",
    name: '16" Round',
    price: 109,
    tag: "In Stock",
    image: "/images/round-counter.png",
    description:
      "Built for pizza purists. The round shape follows your pie edge to edge and fits most oven racks perfectly.",
    features: ['1/4" A36 steel', "Plasma cut", "Pre-seasoned", "Broiler safe"],
  },
  {
    id: "handles-8x16",
    name: '8" × 16" with Handles',
    price: 129,
    tag: "In Stock",
    image: "/images/handles-8x16.png",
    description:
      "The carry-anywhere steel. Cutout handles make it easy to move from oven to table to grill without burning yourself.",
    features: ["Cutout handles", "Grill ready", "Pre-seasoned", "16 lbs"],
  },
  {
    id: "bread-4x16",
    name: '4" × 16" Bread Pan',
    price: 79,
    tag: "In Stock",
    image: "/images/handles-4x16.png",
    description:
      "Narrow and long for sourdough loaves, baguettes, and focaccia. The handles mean no fumbling with oven mitts.",
    features: ["Bread-optimized", "Cutout handles", "Pre-seasoned", "Oven safe"],
  },
];

const THICKNESS_OPTIONS = [
  { value: "0.25", label: '1/4" (Standard): best for home ovens' },
  { value: "0.375", label: '3/8" (Pro): restaurant-grade heat retention' },
  { value: "0.5", label: '1/2" (Ultra): maximum thermal mass' },
];

const GALLERY = [
  { src: "/images/shop-square-real.jpg", alt: "Square steel with handle, freshly seasoned" },
  { src: "/images/shop-handled-real.jpg", alt: "8x16 handled steel, polished finish" },
  { src: "/images/shop-halfmoon-real.jpg", alt: "Custom half-moon steels from the shop" },
  { src: "/images/shop-round-raw.jpg", alt: "16-inch round steel, raw A36" },
];

type OrderConfirmation = { type: "standard" | "custom"; details: string };

export default function HomePage() {
  const [customWidth, setCustomWidth] = useState("");
  const [customDepth, setCustomDepth] = useState("");
  const [customThickness, setCustomThickness] = useState("");
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [customError, setCustomError] = useState("");

  function handleStandardOrder(product: (typeof PRODUCTS)[0]) {
    setConfirmation({ type: "standard", details: `${product.name}, $${product.price}` });
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
    const label = THICKNESS_OPTIONS.find((t) => t.value === customThickness)?.label.split(":")[0];
    setConfirmation({ type: "custom", details: `Custom ${customWidth}" × ${customDepth}" at ${label}` });
  }

  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-0 px-6 py-16 md:grid-cols-2 md:gap-12 md:py-24">
          <div className="order-2 md:order-1">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Handmade in northern Minnesota
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Serious heat. Serious crust.
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg text-muted-foreground">
              Every Finnginuity steel is cut, finished, and seasoned by hand
              from A36 structural steel. The same material that builds
              bridges, put to work in your kitchen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#shop">Shop the collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#story">Our story</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-muted shadow-xl">
              <Image
                src="/images/square-counter.png"
                alt="16x16 Baking Steel on marble counter"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Shop ───────────────────────────────────────────── */}
      <section id="shop" className="border-b border-border bg-muted/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Shop
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              The Collection
            </h2>
            <p className="mt-3 text-muted-foreground">
              Ready to ship. Every piece pre-seasoned and finished by hand.
            </p>
          </div>

          {/* Standard products 2x2 grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold leading-tight">{product.name}</h3>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {product.tag}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="my-4 flex flex-wrap gap-1.5">
                    {product.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ${product.price}
                      <span className="ml-1 text-xs font-normal text-muted-foreground">USD</span>
                    </span>
                    <Button size="sm" onClick={() => handleStandardOrder(product)}>
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom order */}
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl bg-stone-900 p-8 text-white">
              <div className="relative z-10">
                <Badge className="mb-4 bg-primary/90 text-white hover:bg-primary">
                  Custom Order
                </Badge>
                <h3 className="text-2xl font-semibold">Build your steel.</h3>
                <p className="mt-3 text-stone-300 leading-relaxed">
                  Have a specific oven size, grill dimension, or odd rack
                  configuration? We cut every steel to spec on the plasma
                  table. No odd size is too odd.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-stone-300">
                  <li>✓ Any width or depth from 6" to 36"</li>
                  <li>✓ Three thickness options</li>
                  <li>✓ Handles, hang holes, or clean edges</li>
                  <li>✓ Ships in 2 to 3 weeks</li>
                </ul>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10">
                <Image
                  src="/images/stacked-handles.png"
                  alt=""
                  width={280}
                  height={280}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-background p-8 ring-1 ring-primary/10">
              <form onSubmit={handleCustomOrder} className="flex flex-col gap-5">
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
                <Button type="submit" size="lg">
                  Request Custom Order
                </Button>
              </form>
            </div>
          </div>

          {/* Confirmation */}
          {confirmation && (
            <div className="mt-8 flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-6 py-4 text-sm dark:border-green-800 dark:bg-green-950">
              <p className="text-green-800 dark:text-green-200">
                <span className="font-semibold">Order received.</span>{" "}
                {confirmation.details}.{" "}
                {confirmation.type === "standard"
                  ? "We will follow up with a payment link shortly."
                  : "We will review your specs and send a quote within 24 hours."}
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

      {/* ── Story ──────────────────────────────────────────── */}
      <section id="story" className="border-b border-border px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/bread.jpg"
              alt="Artisan sourdough baked on Finnginuity steel"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Our story
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Built from iron range steel.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We are based in northern Minnesota, where the ground has been
              producing iron ore for over a hundred years. You taste it in
              the water. You see it in the landscape. And now you can cook
              on it.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every Finnginuity steel starts as a full sheet of A36 structural
              grade steel. The same material used in bridges, buildings, and
              machinery. We cut it on a plasma table, finish every edge by
              hand, season it, and ship it to you ready to use.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We are a small, woman-owned operation. Every order matters.
              Every piece is made with intention, priced so anyone can afford
              quality American steel in their kitchen.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {[
                { stat: "A36", label: "Structural steel" },
                { stat: "100%", label: "Made in the USA" },
                { stat: "3+", label: "Thickness options" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-bold text-foreground">{item.stat}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Steel ──────────────────────────────────────── */}
      <section id="about" className="border-b border-border bg-muted/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
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
                title: "20x more conductive than ceramic",
                body: "Steel pulls heat into your dough fast and hard. No more pale bottoms. Expect a leopard-spotted crust in under 5 minutes.",
              },
              {
                title: "Gets better every single use",
                body: "A36 steel builds a natural seasoning layer over time. Unlike stone that cracks or ceramic that chips, your steel improves the more you cook on it.",
              },
              {
                title: "Oven, grill, or broiler",
                body: "Rated to 1000 degrees F. Use it on a gas or charcoal grill for Neapolitan pies, slide it under the broiler for bubbling gratins, or go old school in a 500-degree oven.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-background p-6 shadow-sm"
              >
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── From the shop ──────────────────────────────────── */}
      <section className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              From the shop
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Made by hand, not by machine
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every piece you order has been through these hands.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {GALLERY.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-square overflow-hidden rounded-xl bg-stone-100 shadow-sm"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SocialSection />
      <SiteFooter />
    </main>
  );
}
