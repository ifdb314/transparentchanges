import Link from "next/link";

export function MobileCta() {
  return (
    <div className="mobile-cta">
      <span>Fair, from the ground up.</span>
      <Link href="/founding-circle" className="btn">
        Join Free
      </Link>
    </div>
  );
}
