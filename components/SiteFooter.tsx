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
            <small>Help build a better future, from the ground up.</small>
          </div>
        </div>
        <div className="site-footer-cols">
          <div>
            <span className="ff-h">Ventures</span>
            <Link href="/ventures/market">Grocery</Link>
            <Link href="/ventures/law">Law</Link>
            <Link href="/ventures/plumbing">Plumbing</Link>
            <Link href="/ventures/home-building">Home Building</Link>
            <Link href="/ventures/rides">Rides</Link>
            <Link href="/ventures/reviews">Reviews</Link>
            <Link href="/ventures/website">Website Builder</Link>
            <Link href="/ventures/credit-cards">Credit Cards</Link>
          </div>
          <div>
            <span className="ff-h">Transparency</span>
            <Link href="/first-steps">First Steps</Link>
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
        © {new Date().getFullYear()} TransparentChanges. Every dollar, published every 6 months.
        <a href="https://www.startwithasite.com" target="_blank" rel="noopener noreferrer" className="ff-credit">
          Built by StartWithASite.com
        </a>
      </div>
    </footer>
  );
}
