import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 px-6 py-14 text-sm text-muted-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <p className="mb-2 text-base font-semibold text-foreground">
            Finnginuity LLC
          </p>
          <p className="text-sm leading-relaxed">
            Handmade steel cookware and functional art from northern Minnesota.
            Built from the same raw material the Iron Range has produced for
            over a century.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
            Shop
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/#shop" className="hover:text-foreground transition-colors">
                16&quot; × 16&quot; Square
              </Link>
            </li>
            <li>
              <Link href="/#shop" className="hover:text-foreground transition-colors">
                16&quot; Round
              </Link>
            </li>
            <li>
              <Link href="/#shop" className="hover:text-foreground transition-colors">
                Handled Steels
              </Link>
            </li>
            <li>
              <Link href="/#shop" className="hover:text-foreground transition-colors">
                Custom Orders
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
            Functional Art
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/#functional-art" className="hover:text-foreground transition-colors">
                Wooden Lamps
              </Link>
            </li>
            <li>
              <Link href="/faq#contact" className="hover:text-foreground transition-colors">
                Request a Piece
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
              <Link href="/faq#return-policy" className="hover:text-foreground transition-colors">
                Shipping &amp; Returns
              </Link>
            </li>
            <li>
              <Link href="/faq#seasoning" className="hover:text-foreground transition-colors">
                Care &amp; Seasoning Guide
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-foreground transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/faq#contact" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <a
                href="mailto:info@finnginuity.com"
                className="hover:text-foreground transition-colors"
              >
                info@finnginuity.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-center text-xs">
        © {new Date().getFullYear()} Finnginuity LLC. All rights reserved.
      </div>
    </footer>
  );
}
