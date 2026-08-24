import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ShareCardButton } from "@/components/ShareCardButton";

export const metadata = pageMetadata({
  title: "Ideal Company",
  description:
    "Not a mission statement — a checklist. The standard every TransparentChanges venture is measured against.",
  path: "/ideal-company",
  image: "/images/family.jpg",
});

const TENETS = [
  {
    id: "life-first",
    title: "Built around a real life, not just a job",
    body: "Remote-first wherever the work allows it, a 30–32 hour week, and three real days for family — so people aren't just working to live, they're living. Life first motto.",
  },
  {
    id: "job-security",
    title: "Job security you can actually feel",
    body: "Loyalty goes both ways. The quiet fear of losing your job for no good reason is something we're actively trying to eliminate — and coworkers stay because they share the same purpose, not just a paycheck.",
  },
  {
    id: "no-layoffs",
    title: "100% of employees doing 100% of the work",
    body: "Layoffs are avoided by design — not 20% of employees carrying the other 80%, and never leadership bonuses funded by headcount cuts.",
  },
  {
    id: "making-a-difference",
    title: "Making a difference",
    body: "Every company has a mission to make a real difference — bettering the world in some way, not just making money or turning a profit. Every venture exists to build a better, more sustainable future. Period.",
  },
  {
    id: "leaders-work-alongside",
    title: "Leaders work alongside their people",
    body: "Real servant leadership means managers get their hands dirty next to their employees, not just pushing paper from above.",
  },
  {
    id: "profit-builds-next-thing",
    title: "Profit that builds the next thing",
    body: "Profit flows back into the community — ideally into starting the next venture that creates opportunities for people, not just into a buyback.",
  },
  {
    id: "good-customers-cherished",
    title: "Good customers are cherished",
    body: "Customers get the benefit of the doubt — but the ones who abuse, steal, or cheat are let go. Neither other customers nor employees should pay for bad customer behavior or actions.",
  },
  {
    id: "hired-on-merit",
    title: "Hired on merit. Full stop.",
    body: "The most qualified person gets the job — not the one who fits a quota. Everyone is equal, and hard work, honesty and sincerity beat politics and favoritism, every time.",
  },
  {
    id: "bad-managers-not-protected",
    title: "Bad managers don't get protected",
    body: "When a hire isn't working out, or a manager plays favorites instead of leading, they're held accountable — they yield to the consequences of their actions. Titles are never a shield.",
  },
  {
    id: "tech-adds-not-replaces",
    title: "Technology that adds, not replaces",
    body: "AI is used to help people do more — not as an excuse to replace the person already doing the job. Human lives depend on their living — that must never be forgotten.",
  },
  {
    id: "fair-prices-real-quality",
    title: "Fair prices, real quality",
    body: "A product or service priced fairly and as low as it can honestly go — without cutting the quality or service customers deserve. We show customers what it costs us, what they're paying, and where the difference is going.",
  },
  {
    id: "employees-are-family",
    title: "Employees are family, and everyone's in the know",
    body: "Every employee is cared for like family, not a line item — and employees and the public alike know what the company is doing and how it's doing.",
  },
];

export default function IdealCompanyPage() {
  return (
    <>
      <section className="photo-hero" style={{ paddingTop: 56 }}>
        <img
          src="/images/family.jpg"
          alt="A family together, representing the life-first workplace TransparentChanges is building toward"
          className="photo-hero-bg"
        />
        <div
          className="photo-hero-overlay"
          style={{
            backgroundImage:
              "linear-gradient(115deg, rgba(16,40,31,0.88) 20%, rgba(60,40,20,0.62) 65%, rgba(90,60,30,0.45) 100%)",
          }}
        />
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
            <div className="tenet-card" id={t.id} key={t.id}>
              <div className="tenet-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
              <ShareCardButton anchor={t.id} />
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Help us hold every venture to this.</h2>
          <Link href="/founding-circle" className="btn">
            Join our Mission
          </Link>
        </div>
      </section>
    </>
  );
}
