export function LogoMark({ className = "logo-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="42" cy="40" r="30" fill="#C2451F" />
      <circle cx="60" cy="40" r="30" fill="#E3A93F" />
      <circle cx="51" cy="63" r="30" fill="#1F7A6C" />
    </svg>
  );
}

export function IconMark({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="6" width="32" height="36" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconMarket({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="20" width="32" height="18" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="20" x2="16" y2="38" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="20" x2="24" y2="38" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="20" x2="32" y2="38" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="14" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="26" cy="11.5" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="14.5" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconLaw({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <line x1="24" y1="8" x2="24" y2="36" stroke="currentColor" strokeWidth="2" />
      <line x1="9" y1="14" x2="39" y2="14" stroke="currentColor" strokeWidth="2" />
      <path d="M9 14 L4.5 24 A5.5 5.5 0 0 0 13.5 24 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M39 14 L34.5 24 A5.5 5.5 0 0 0 43.5 24 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="15" y1="38" x2="33" y2="38" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconPlumbing({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <g transform="rotate(-30 24 24)">
        <circle cx="12" cy="24" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <rect x="12" y="21.2" width="24" height="5.6" fill="currentColor" />
        <circle cx="36" cy="24" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      </g>
    </svg>
  );
}

export function IconHomeBuilding({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <polygon points="24,7 43,22 5,22" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="22" width="28" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="21" y="28" width="6" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconRides({ className = "icon" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <rect x="5" y="22" width="38" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 22 L17 13 H31 L36 22" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="35" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="34" cy="35" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export const VENTURE_ICONS = {
  market: IconMarket,
  law: IconLaw,
  plumbing: IconPlumbing,
  "home-building": IconHomeBuilding,
  rides: IconRides,
} as const;

export type VentureSlug = keyof typeof VENTURE_ICONS;
