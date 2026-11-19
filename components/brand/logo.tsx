export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="9" className="fill-accent" />
      <path
        d="M9 11h14M9 16h10M9 21h6"
        className="stroke-accent-foreground"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="21" r="3" className="fill-accent-foreground" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
      <LogoMark />
      <span>Recapo</span>
    </a>
  );
}
