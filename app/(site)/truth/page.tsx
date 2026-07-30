import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truth You Don't Know",
  description:
    "Sourced, dated, screenshot-sized facts — what the biggest players in each industry, and the economy at large, don't put on the receipt.",
};

const BY_INDUSTRY = [
  {
    stat: "42%",
    body: "Uber's cut of every fare in 2024, up from 32% in 2022 — then it stopped publishing the number.",
    src: "NELP, Jul 2025",
  },
  {
    stat: "12¢",
    body: "What a farmer keeps from every retail food dollar you spend at the grocery store.",
    src: "USDA / Nature study",
  },
  {
    stat: "~800",
    body: "Plumbing companies bought by private equity since 2022, driving sale prices up 46%.",
    src: "Main Street Wealth, 2025",
  },
  {
    stat: "33–40%",
    body: "The standard contingency fee lawyers take — with the firm's actual win rate rarely disclosed upfront.",
    src: "LegalClarity, 2025",
  },
  {
    stat: "$16.1M",
    body: "Paid by one of America's largest homebuilders to 200+ buyers over roof, joist, and water-intrusion defects.",
    src: "Sauder Schelkopf, 2025",
  },
];

const BIGGER_PICTURE = [
  {
    stat: "245,953",
    body: "U.S. tech workers laid off in 2025 alone — while executive bonuses kept climbing.",
    src: "Layoff trackers, 2025",
  },
  {
    stat: "92M",
    body: "Jobs the World Economic Forum projects AI and automation will displace worldwide by 2030.",
    src: "WEF Future of Jobs, 2025",
  },
  {
    stat: "281×",
    body: "What the average CEO of a major U.S. company now makes compared to their typical employee.",
    src: "EPI, 2024",
  },
  {
    stat: "40%",
    body: "Full-time U.S. workers who report working 50+ hours a week just to keep up.",
    src: "Gallup / TD.org",
  },
  {
    stat: "11 days",
    body: "Average paid vacation for a U.S. worker — France and Spain guarantee 30, by law.",
    src: "BLS / Justworks",
  },
  {
    stat: "46 min",
    body: "Average round-trip commute for a U.S. worker, every single day, unpaid.",
    src: "Gallup",
  },
  {
    stat: "1 of 41",
    body: "OECD and EU nations with no mandated paid parental leave: the United States is the only one.",
    src: "Pew Research",
  },
];

export default function TruthPage() {
  return (
    <>
      <div
        className="photo-band"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(16,40,31,0.1), rgba(16,40,31,0.8)), url('/images/overworked.jpg')",
        }}
      >
        <div className="photo-band-text">
          <p>These numbers have names attached.</p>
        </div>
      </div>

      <section className="band">
        <div className="band-head">
          <div className="band-eyebrow">Sourced, dated, screenshot-sized</div>
          <h2>
            Truth <span className="soft">you don&apos;t know.</span>
          </h2>
          <p>
            What the biggest players in each industry — and the economy at large — don&apos;t put
            on the receipt.
          </p>
        </div>

        <div className="truth-subhead">By industry</div>
        <div className="truth-grid-site">
          {BY_INDUSTRY.map((t, i) => (
            <div className={`tcard tc-${(i % 3) + 1}`} key={t.stat + t.src}>
              <div className="tstat">{t.stat}</div>
              <div className="tbody">{t.body}</div>
              <div className="tsrc">{t.src}</div>
              <div className="tshare">Share this ↗</div>
            </div>
          ))}
        </div>

        <div className="truth-subhead">The bigger picture</div>
        <div className="truth-grid-site">
          {BIGGER_PICTURE.map((t, i) => (
            <div className={`tcard tc-${(i % 3) + 1}`} key={t.stat + t.src}>
              <div className="tstat">{t.stat}</div>
              <div className="tbody">{t.body}</div>
              <div className="tsrc">{t.src}</div>
              <div className="tshare">Share this ↗</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
