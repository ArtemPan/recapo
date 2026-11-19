import { Logo } from "@/components/brand/logo";
import { MobileMenu } from "./mobile-menu";
import { navLinks } from "./nav-links";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#demo"
          className="hidden rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground md:block"
        >
          Try it free
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
