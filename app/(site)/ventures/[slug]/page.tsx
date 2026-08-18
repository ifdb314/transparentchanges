import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VENTURE_ICONS } from "@/components/Icons";
import { getVenture, VENTURES } from "@/lib/ventures";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return VENTURES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) return {};
  return pageMetadata({
    title: venture.name,
    description: venture.cardDescription,
    path: `/ventures/${venture.slug}`,
    image: venture.photo,
  });
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();

  const Icon = VENTURE_ICONS[venture.icon];

  return (
    <>
      <section className="photo-hero">
        <img src={venture.photo} alt={`${venture.name} venture`} className="photo-hero-bg" />
        <div
          className="photo-hero-overlay"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(16,40,31,0.88) 20%, rgba(60,40,20,0.6) 65%, rgba(90,60,30,0.4) 100%)",
          }}
        />
        <div className="photo-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <div className="stamp">TransparentChanges {venture.name}</div>
            <h1>{venture.headline}</h1>
            <p className="hero-lede">{venture.intro}</p>
          </div>
        </div>
      </section>

      <section className="band" style={{ maxWidth: 760 }}>
        {venture.rows.map((row) => (
          <div className={`vrow${row.final ? " final" : ""}`} key={row.label}>
            <span>{row.label}</span>
            <span className="amt">{row.value}</span>
          </div>
        ))}
        <p style={{ marginTop: 22 }}>{venture.closing}</p>
        <Link href="/founding-circle" className="btn" style={{ marginTop: 20, display: "inline-block" }}>
          Join our Mission
        </Link>
      </section>

      <section className="band alt">
        <div className="band-head" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: 16 }}>
          <Icon />
          <p style={{ margin: 0 }}>
            Every venture publishes its own ledger once it launches — the same standard shown in{" "}
            <Link href="/first-steps" style={{ color: "var(--accent)" }}>
              What&apos;s Next
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
