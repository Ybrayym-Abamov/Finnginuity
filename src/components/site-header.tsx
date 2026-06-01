import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Finnginuity LLC"
            width={200}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link className="hover:text-foreground transition-colors" href="/#shop">
            Shop
          </Link>
        </nav>
      </div>
    </header>
  );
}
