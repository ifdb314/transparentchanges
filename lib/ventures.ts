export type Venture = {
  slug: string;
  name: string;
  icon: "market" | "law" | "plumbing" | "home-building" | "rides";
  photo: string;
  cardDescription: string;
  headline: string;
  intro: string;
  rows: { label: string; value: string; final?: boolean }[];
  closing: string;
};

export const VENTURES: Venture[] = [
  {
    slug: "rides",
    name: "Rides",
    icon: "rides",
    photo: "/images/driver.jpg",
    cardDescription:
      "The driver's cut is fixed, published, and the majority share — every quarter.",
    headline: "Don't take a cut you can't see.",
    intro:
      "Uber's take rate climbed from 32% to 42%+ between 2022 and 2024 — then it stopped disclosing the number. Ours is published, fixed, and the driver keeps the majority every quarter.",
    rows: [
      { label: "Uber's driver take rate, 2024", value: "58% or less" },
      { label: "Uber's take rate, 2022", value: "68%" },
      { label: "TransparentChanges Rides' driver cut", value: "published, majority, fixed", final: true },
    ],
    closing:
      "The exact split is published on this page and updated every quarter — not buried in a rate card that changes without notice.",
  },
  {
    slug: "market",
    name: "Market",
    icon: "market",
    photo: "/images/farmer.jpg",
    cardDescription:
      "Local farms straight to the shelf. Farmers keep more than the industry average of 12¢ on the dollar.",
    headline: "Know what the farmer actually keeps.",
    intro:
      "Farmers keep roughly 12¢ of every retail food dollar today. We publish what our farmers are paid, right next to the shelf price.",
    rows: [
      { label: "Industry average farmer share", value: "~12¢ / $1.00" },
      { label: "Typical grocery markup on produce", value: "30–75%" },
      { label: "TransparentChanges Market's farmer share", value: "published per product", final: true },
    ],
    closing:
      "A local grocery distributor connecting nearby farms directly to shelves — cutting out the markup layers that don't add value.",
  },
  {
    slug: "law",
    name: "Law",
    icon: "law",
    photo: "/images/law_handshake.jpg",
    cardDescription:
      "Reasonable, published rates. We only collect the majority of our own fee if you win.",
    headline: "Don't sign a fee agreement you don't understand.",
    intro:
      "A reasonable flat or hourly rate, published up front. We only collect the majority of that rate if we win — if we lose, our own bill shrinks along with the case. That's what keeps us invested in your outcome, not the clock.",
    rows: [
      { label: "Typical hourly litigation billing", value: "stacks up, win or lose" },
      { label: "Typical contingency cut", value: "33–40% of your win" },
      { label: "TransparentChanges Law's agreement", value: "simplified, straightforward", final: true },
    ],
    closing:
      "Our rates and our firm-wide win rate are both published every quarter — before you ever sign anything.",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: "plumbing",
    photo: "/images/plumber.jpg",
    cardDescription: "Flat, published rates for plumbing and home repair. No truck-roll upsell.",
    headline: "A flat rate you saw before the truck showed up.",
    intro:
      "Private equity has bought roughly 800 plumbing companies since 2022, pushing sale prices — and often bills — up 46%. Our rates are flat, published, and don't change once someone's on-site.",
    rows: [
      { label: "Plumbing shops bought by PE since 2022", value: "~800" },
      { label: "Resulting sale-price increase", value: "+46%" },
      { label: "TransparentChanges Plumbing's rate sheet", value: "flat, published", final: true },
    ],
    closing: "No truck-roll upsell, no surprise diagnostic fee — the rate you saw is the rate you pay.",
  },
  {
    slug: "home-building",
    name: "Home Building",
    icon: "home-building",
    photo: "/images/construction.jpg",
    cardDescription:
      "Licensed, qualified labor and a real supervisor on-site for the biggest purchase of your life.",
    headline: "For the biggest purchase of your life, a real supervisor on-site.",
    intro:
      "One of America's largest homebuilders paid $16.1M to 200+ buyers over roof, joist, and water-intrusion defects found after move-in. Licensed, qualified labor and a real on-site supervisor are how we avoid being the next headline.",
    rows: [
      { label: "One builder's defect settlement, 2025", value: "$16.1M / 200+ buyers" },
      { label: "Typical crew supervision", value: "compressed, subcontracted" },
      { label: "TransparentChanges Home Building's crews", value: "licensed, supervised on-site", final: true },
    ],
    closing: "Qualified labor on every crew, and someone accountable on-site through the whole build.",
  },
];

export function getVenture(slug: string): Venture | undefined {
  return VENTURES.find((v) => v.slug === slug);
}
