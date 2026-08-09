import Link from "next/link";

export function MobileCta() {
  return (
    <div className="mobile-cta">
      <span>Help build a better future.</span>
      <Link href="/founding-circle" className="btn">
        Join Free
      </Link>
    </div>
  );
}
