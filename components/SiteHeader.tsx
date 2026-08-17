"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "./Icons";

const NAV_LINKS = [
  { href: "/first-steps", label: "First Steps" },
  { href: "/ideal-company", label: "Ideal Company" },
  { href: "/truth", label: "Truth" },
  { href: "/ventures", label: "Ventures" },
  { href: "/founding-circle", label: "The Mission" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" onClick={() => setOpen(false)}>
          <span className="logo-badge">
            <LogoMark />
          </span>
          <span className="site-logo-text">TransparentChanges</span>
        </Link>
        <nav className="site-nav">
          {NAV_LINKS.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/founding-circle" className="btn">
          Join — free
        </Link>
        <button
          type="button"
          className={`nav-toggle${open ? " open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`mobile-nav${open ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/founding-circle" className="btn" onClick={() => setOpen(false)}>
          Join — free
        </Link>
      </nav>
    </header>
  );
}
