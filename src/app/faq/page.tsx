"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SocialSection } from "@/components/social-section";

const FAQS = [
  {
    id: "return-policy",
    question: "What is your return policy?",
    answer:
      "We stand behind every steel we make. If you're not completely satisfied, you can return any standard product within 30 days of delivery for a full refund — no questions asked. Custom orders are made to your exact specifications and are non-refundable, but we'll work with you if there's a defect or error on our end. To start a return, use the contact form below and we'll guide you through the process.",
  },
  {
    id: "seasoning",
    question: "Do I need to season my Baking Steel?",
    answer:
      "All Finnginuity Baking Steels ship pre-seasoned with a thin layer of food-safe oil, so you can use it right out of the box. Over time, cooking naturally builds up a better seasoning layer. If you ever need to re-season: dry the steel completely, rub a very thin coat of flaxseed or vegetable oil across the surface, and bake it upside down at 450–500 °F for one hour. Repeat 2–3 times for a bulletproof finish. Avoid soaking in water and never put it in the dishwasher.",
  },
  {
    id: "made-in-usa",
    question: "Where is Finnginuity Baking Steel made?",
    answer:
      "Proudly made in the USA. Every Baking Steel is cut, finished, and seasoned right here on American soil using domestically sourced A36 structural steel. We believe in supporting local craftspeople, keeping jobs in our community, and delivering a product built with the standards American manufacturing is known for. When you order from Finnginuity, you're not just getting a great product — you're investing in something made with pride.",
  },
  {
    id: "free-shipping",
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free standard shipping on all orders over $75 within the contiguous United States. Standard delivery takes 5–7 business days. Need it faster? Expedited 2-day shipping is available at checkout for an additional fee. For custom orders, lead time is 2–3 weeks from order confirmation, after which your steel ships free (standard) or expedited at your option. We currently ship within the US only — international shipping is coming soon.",
  },
  {
    id: "custom-dimensions",
    question: "How do I know what size to order for a custom steel?",
    answer:
      "Measure your oven's interior width and depth, then subtract about 1–2 inches on each side to allow airflow around the steel. For a standard home oven, the 16\" × 16\" fits perfectly. For a larger range or outdoor grill, consider going up to 18\" × 18\" or wider. Thickness is about preference: 1/4\" heats up fast and is great for home bakers, 3/8\" gives restaurant-grade retention for back-to-back pies, and 1/2\" is the ultimate thermal mass for serious enthusiasts.",
  },
  {
    id: "care",
    question: "How do I clean and maintain my Baking Steel?",
    answer:
      "After use, let the steel cool completely, then scrape off any residue with a bench scraper or stiff brush. Wipe down with a damp cloth and dry immediately — never leave it wet or it can surface-rust. A tiny drop of oil rubbed in after cleaning keeps the seasoning fresh. Light surface rust is totally normal and easy to fix: scrub with steel wool, rinse, dry thoroughly, and apply a fresh thin layer of oil. Your steel is essentially indestructible with minimal care.",
  },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type SubmitStatus = "idle" | "success";

export default function FAQPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Please leave us a message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("success");
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight hover:text-primary transition-colors"
          >
            Finnginuity
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              className="hover:text-foreground transition-colors"
              href="/#shop"
            >
              Shop
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="border-b border-border bg-muted/30 px-6 py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Support
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-muted-foreground">
              Everything you need to know about your Baking Steel — from care
              and shipping to what makes ours different.
            </p>
          </div>
        </section>

        {/* ── FAQ Accordion ──────────────────────────────────── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-xl border border-border bg-background px-6 shadow-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline hover:text-primary transition-colors [&[data-state=open]]:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Made in USA Banner ─────────────────────────────── */}
        <section className="border-y border-border bg-stone-800 px-6 py-12 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="text-3xl">🇺🇸</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Proudly Made in America
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-stone-300">
              Every Finnginuity Baking Steel is cut, finished, and seasoned in
              the USA using domestically sourced A36 steel. Built by American
              hands, built to last a lifetime.
            </p>
          </div>
        </section>

        {/* ── Contact Form ───────────────────────────────────── */}
        <section id="contact" className="px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Contact
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                How else can we help?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Send us a message
                and we&apos;ll get back to you within one business day.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
                    ✓
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">Message sent!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thanks for reaching out. We&apos;ll get back to you within
                    one business day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={handleChange}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone">
                      Phone Number{" "}
                      <span className="text-muted-foreground text-xs font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="message">
                      How can we help?{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your order, question, or feedback…"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Social Media ───────────────────────────────────── */}
        <SocialSection />
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border bg-muted/30 px-6 py-14 text-sm text-muted-foreground">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-base font-semibold text-foreground">
              Finnginuity
            </p>
            <p className="text-sm leading-relaxed">
              Premium Baking Steel cookware for home cooks and professionals.
              Engineered for heat. Built to last.
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
              Shop
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#shop"
                  className="hover:text-foreground transition-colors"
                >
                  16&quot; × 16&quot; Baking Steel
                </Link>
              </li>
              <li>
                <Link
                  href="/#shop"
                  className="hover:text-foreground transition-colors"
                >
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
              Support
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq#return-policy"
                  className="hover:text-foreground transition-colors"
                >
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#seasoning"
                  className="hover:text-foreground transition-colors"
                >
                  Care &amp; Seasoning Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq#contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl border-t border-border pt-6 text-center text-xs">
          © {new Date().getFullYear()} Finnginuity. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
