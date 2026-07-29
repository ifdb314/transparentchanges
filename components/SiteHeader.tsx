import Link from "next/link";
import { LogoMark } from "./Icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo">
          <LogoMark />
          <span className="site-logo-text">TransparentChanges</span>
        </Link>
        <nav className="site-nav">
          <Link href="/ventures">Ventures</Link>
          <Link href="/the-ledger">The Ledger</Link>
          <Link href="/founding-circle">Founding Circle</Link>
          <Link href="/ideal-company">Ideal Company</Link>
          <Link href="/truth">Truth</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/founding-circle" className="btn">
          Join — free
        </Link>
      </div>
    </header>
  );
}
