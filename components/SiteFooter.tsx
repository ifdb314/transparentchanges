import Link from "next/link";
import { LogoMark } from "./Icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <LogoMark />
          <div>
            TransparentChanges
            <small>Fair, from the ground up.</small>
          </div>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="ff-h">Ventures</span>
            <Link href="/ventures/market">Market</Link>
            <Link href="/ventures/law">Law</Link>
            <Link href="/ventures/plumbing">Plumbing</Link>
            <Link href="/ventures/home-building">Home Building</Link>
            <Link href="/ventures/rides">Rides</Link>
          </div>
          <div>
            <span className="ff-h">Transparency</span>
            <Link href="/the-ledger">The Ledger</Link>
            <Link href="/truth">Truth</Link>
            <Link href="/founding-circle">Founding Circle</Link>
          </div>
          <div>
            <span className="ff-h">Join</span>
            <Link href="/founding-circle">Pledge</Link>
            <Link href="/founding-circle">Work With Us</Link>
            <Link href="/ventures#suggest">Suggest an Industry</Link>
          </div>
        </div>
      </div>
      <div className="site-footer-legal">
        © {new Date().getFullYear()} TransparentChanges. Every dollar, published quarterly.
      </div>
    </footer>
  );
}
