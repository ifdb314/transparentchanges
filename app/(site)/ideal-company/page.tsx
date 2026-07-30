import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ideal Company",
  description:
    "Not a mission statement — a checklist. The standard every TransparentChanges venture is measured against.",
};

const TENETS = [
  {
    title: "Fair prices, real quality",
    body: "A product or service priced fairly and as low as it can honestly go — without cutting the quality or service customers deserve.",
  },
  {
    title: "Employees are family, and everyone's in the know",
    body: "Every employee is cared for like family, not a line item — and employees and the public alike know what the company is doing and how it's doing.",
  },
  {
    title: "100% of employees doing 100% of the work",
    body: "Layoffs are avoided by design — not 20% of employees carrying the other 80%, and never leadership bonuses funded by headcount cuts.",
  },
  {
    title: "Bad managers don't get protected",
    body: "When a hire isn't working out, or a manager plays favorites instead of leading, they're held accountable — not shielded because someone likes them.",
  },
  {
    title: "Leaders work alongside their people",
    body: "Real servant leadership means managers get their hands dirty next to their employees, not just pushing paper from above.",
  },
  {
    title: "Built around a real life, not just a job",
    body: "Remote-first wherever the work allows it, a 30–36 hour week, and three real days for family — so people aren't just working to live, they're living. Holidays try to line up with school breaks and family time, too.",
  },
  {
    title: "The benefit of the doubt, not a blank check",
    body: "Customers get the benefit of the doubt — but the ones who abuse, steal, or cheat are let go, so they don't drive up prices or morale problems for everyone else.",
  },
  {
    title: "Hired on merit. Full stop.",
    body: "The most qualified person gets the job — not the one who fits a quota. Everyone is equal, and honesty and sincerity beat politics and favoritism, every time.",
  },
  {
    title: "Profit that builds the next thing",
    body: "Profit flows back into the community — ideally into starting the next venture that improves it further, not just into a buyback. And it's mindful of its environmental footprint, not just filling office seats and adding to traffic.",
  },
  {
    title: "Technology that adds, not replaces",
    body: "AI is used to help people do more — not as an excuse to replace the person already doing the job.",
  },
  {
    title: "Job security you can actually feel",
    body: "Loyalty goes both ways. The quiet fear of losing your job for no good reason is something we're actively trying to eliminate — and coworkers stay because they share the same purpose, not just a paycheck.",
  },
];

export default function IdealCompanyPage() {
  return (
    <>
      <section
        className="photo-hero"
        style={{
          paddingTop: 56,
          backgroundImage:
            "linear-gradient(115deg, rgba(16,40,31,0.88) 20%, rgba(60,40,20,0.62) 65%, rgba(90,60,30,0.45) 100%), url('/images/family.jpg')",
        }}
      >
        <div className="photo-hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <div className="stamp">Not a mission statement — a checklist</div>
            <h1 style={{ maxWidth: "20ch" }}>
              The next evolution <span className="soft">of the American workplace.</span>
            </h1>
            <p className="hero-lede" style={{ maxWidth: "62ch" }}>
              This is the standard every TransparentChanges venture is measured against — the
              thing we&apos;re actually building toward, one honest decision at a time.
            </p>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="tenet-grid">
          {TENETS.map((t, i) => (
            <div className="tenet-card" key={t.title}>
              <div className="tenet-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <div className="tshare">Share this ↗</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Help us hold every venture to this.</h2>
          <Link href="/founding-circle" className="btn">
            Join the Founding Circle
          </Link>
        </div>
      </section>
    </>
  );
}
