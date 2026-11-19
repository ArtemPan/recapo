import { LogoMark } from "@/components/brand/logo";
import { navLinks } from "./nav-links";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <LogoMark className="size-6" />
          <p className="text-sm text-muted">
            Recapo is a portfolio project. Payments run in Stripe test mode.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="https://github.com/ArtemPan/recapo" className="hover:text-foreground">
                Source on GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
