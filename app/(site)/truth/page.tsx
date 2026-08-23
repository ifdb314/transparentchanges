import { pageMetadata } from "@/lib/seo";
import { ShareCardButton } from "@/components/ShareCardButton";

export const metadata = pageMetadata({
  title: "Truth You Don't Know",
  description:
    "Sourced, dated, screenshot-sized facts — what the biggest players in each industry, and the economy at large, don't put on the receipt.",
  path: "/truth",
  image: "/images/overworked.jpg",
});

const BY_INDUSTRY = [
  {
    id: "uber-take-rate",
    stat: "42%",
    body: "Uber's cut of every fare in 2024, up from 32% in 2022 — then it stopped publishing the number.",
    src: "NELP, Jul 2025",
  },
  {
    id: "farmer-share",
    stat: "12¢",
    body: "What a farmer keeps from every retail food dollar you spend at the grocery store.",
    src: "USDA / Nature study",
  },
  {
    id: "plumbing-pe-buyouts",
    stat: "~800",
    body: "Plumbing companies bought by private equity since 2022, driving sale prices up 46%.",
    src: "Main Street Wealth, 2025",
  },
  {
    id: "lawyer-billing-rate",
    stat: "$349/hr",
    body: "The average U.S. lawyer's billing rate in 2025, up from $255 in 2016 — while firm win rates are almost never disclosed upfront.",
    src: "Clio Legal Trends Report, 2025",
  },
  {
    id: "new-home-repairs",
    stat: "92%",
    body: "New homeowners who ran into at least one major repair issue within their first year in the home.",
    src: "American Home Shield survey, 2024",
  },
  {
    id: "hospital-markup",
    stat: "224%",
    body: "What U.S. hospitals charged private insurers in 2022, on average, for the exact same care Medicare would have paid for at 100%.",
    src: "RAND Hospital Price Transparency Study, 2022",
  },
  {
    id: "insulin-markup",
    stat: "30×+",
    body: "How many times more a vial of insulin sells for in the U.S. than it actually costs to manufacture.",
    src: "RAND Corporation, insulin cost study, 2020",
  },
  {
    id: "mattress-markup",
    stat: "5–10×",
    body: "The typical markup on a mattress from factory cost to sticker price — one of the widest margins in retail.",
    src: "Mattress industry pricing reports",
  },
];

const BIGGER_PICTURE = [
  {
    id: "tech-layoffs",
    stat: "245,953",
    body: "U.S. tech workers laid off in 2025 alone — while executive bonuses kept climbing.",
    src: "Layoff trackers, 2025",
  },
  {
    id: "ai-job-displacement",
    stat: "92M",
    body: "Jobs the World Economic Forum projects AI and automation will displace worldwide by 2030.",
    src: "WEF Future of Jobs, 2025",
  },
  {
    id: "ceo-pay-ratio",
    stat: "281×",
    body: "What the average CEO of a major U.S. company now makes compared to their typical employee.",
    src: "EPI, 2024",
  },
  {
    id: "overworked-workers",
    stat: "40%",
    body: "Full-time U.S. workers who report working 50+ hours a week just to keep up.",
    src: "Gallup / TD.org",
  },
  {
    id: "paid-vacation",
    stat: "11 days",
    body: "Average paid vacation for a U.S. worker — France and Spain guarantee 30, by law.",
    src: "BLS / Justworks",
  },
  {
    id: "commute-time",
    stat: "46 min",
    body: "Average round-trip commute for a U.S. worker, every single day, unpaid.",
    src: "Gallup",
  },
  {
    id: "parental-leave",
    stat: "1 of 41",
    body: "OECD and EU nations with no mandated paid parental leave: the United States is the only one.",
    src: "Pew Research",
  },
  {
    id: "retail-theft-cost",
    stat: "$500+",
    body: "Estimated extra a law-abiding household pays every year in higher retail prices to cover the cost of theft and shrink.",
    src: "National Retail Federation estimates",
  },
];

export default function TruthPage() {
  return (
    <>
      <div className="photo-band">
        <img
          src="/images/overworked.jpg"
          alt="An overworked person at a desk, illustrating the toll of industries that don't put people first"
          className="photo-band-bg"
        />
        <div
          className="photo-band-overlay"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(16,40,31,0.1), rgba(16,40,31,0.8))" }}
        />
        <div className="photo-band-text">
          <p>
            What if you really knew the truths behind businesses? Would you still support and use
            them? Let&apos;s make truth a requirement, not a nice-to-have.
          </p>
          <small>These numbers affect real people.</small>
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
            <div className={`tcard tc-${(i % 3) + 1}`} id={t.id} key={t.id}>
              <div className="tstat">{t.stat}</div>
              <div className="tbody">{t.body}</div>
              <div className="tsrc">{t.src}</div>
              <ShareCardButton anchor={t.id} />
            </div>
          ))}
        </div>

        <div className="truth-subhead">The bigger picture</div>
        <div className="truth-grid-site">
          {BIGGER_PICTURE.map((t, i) => (
            <div className={`tcard tc-${(i % 3) + 1}`} id={t.id} key={t.id}>
              <div className="tstat">{t.stat}</div>
              <div className="tbody">{t.body}</div>
              <div className="tsrc">{t.src}</div>
              <ShareCardButton anchor={t.id} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
