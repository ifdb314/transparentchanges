export type Venture = {
  slug: string;
  name: string;
  icon: "market" | "law" | "plumbing" | "home-building" | "rides" | "reviews" | "website" | "credit-cards";
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
      "The driver's cut is fixed, published, and the majority share — every quarter. See what you pay and how it's used.",
    headline: "Don't take a cut you can't see.",
    intro:
      "Uber's take rate climbed from 32% to 42%+ between 2022 and 2024 — then it stopped disclosing the number. Ours is published, fixed, and the driver keeps the majority every quarter.",
    rows: [
      { label: "Uber's cut of every fare, 2022", value: "32%" },
      { label: "Uber's cut of every fare, 2024", value: "42%+" },
      { label: "TransparentChanges Rides' driver cut", value: "published, majority, fixed", final: true },
    ],
    closing:
      "The exact split is published publicly with all components of what a customer is paying and where it's going, in writing, for the driver, the passengers, and everyone else to see.",
  },
  {
    slug: "market",
    name: "Grocery",
    icon: "market",
    photo: "/images/grocery.jpg",
    cardDescription:
      "Local Farms direct to consumer. Farmers keep more than the industry average of 12¢ on the dollar. See what you pay and how it's used.",
    headline: "Know what the farmer actually keeps.",
    intro:
      "Farmers keep roughly 12¢ of every retail food dollar today. We publish what our farmers are paid, right next to the shelf price.",
    rows: [
      { label: "Industry average farmer share", value: "~12¢ / $1.00" },
      { label: "Typical grocery markup on produce", value: "30–75%" },
      { label: "TransparentChanges Grocery's farmer share", value: "published per product", final: true },
    ],
    closing:
      "A local grocery distributor connecting nearby farms directly to shelves — cutting out the markup layers that don't add value. We'll show you where the difference goes and why.",
  },
  {
    slug: "law",
    name: "Law",
    icon: "law",
    photo: "/images/law_handshake.jpg",
    cardDescription:
      "Reasonable, published rates — not hundreds of dollars an hour — with the majority of that rate collected only if you win. We're in this with you, not just in words. See what you pay and how it's used.",
    headline: "Don't sign a fee agreement you don't understand.",
    intro:
      "A reasonable flat or hourly rate, published up front. We only collect the majority of that rate if we win — if we lose, our own bill shrinks along with the case. That's what keeps us invested in your outcome, not the clock.",
    rows: [
      { label: "Typical hourly litigation billing", value: "stacks up, win or lose" },
      { label: "Typical contingency cut", value: "33–40% of your win" },
      { label: "TransparentChanges Law's agreement", value: "simplified, straightforward", final: true },
    ],
    closing:
      "Our rates and our firm-wide win rate are both published every quarter — before you ever sign anything. We take cases we truly believe in — cases we want to win because we believe you deserve to.",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    icon: "plumbing",
    photo: "/images/plumbing-pipes.jpg",
    cardDescription:
      "Flat, published rates for plumbing and home repair. No truck-roll upsell. Clear quotes showing all costs, fair labor rates, and profit. See what you pay and how it's used.",
    headline: "A flat rate you saw before the truck showed up.",
    intro:
      "Private equity has bought roughly 800 plumbing companies since 2022, pushing sale prices — and often bills — up 46%. Our rates are flat, published, and don't change once someone's on-site.",
    rows: [
      { label: "Plumbing shops bought by PE since 2022", value: "~800" },
      { label: "Resulting sale-price increase", value: "+46%" },
      { label: "TransparentChanges Plumbing's rate sheet", value: "flat, published", final: true },
    ],
    closing:
      "We tell you what things cost us, exactly how many hours something will take, a reasonable hourly rate, and what every dollar you pay goes toward. Not just a basic invoice with a large number.",
  },
  {
    slug: "home-building",
    name: "Home Building",
    icon: "home-building",
    photo: "/images/home-framing.jpg",
    cardDescription:
      "Licensed, qualified labor and a real supervisor on-site for the biggest purchase of your life. Goal is to build for quality that lasts. See what you pay and how it's used.",
    headline: "For the biggest purchase of your life, a real supervisor on-site.",
    intro:
      "A home is likely the biggest purchase you'll ever make — and too often it's built fast, cheap, and unsupervised, with corners cut you won't discover for years. Licensed, qualified labor and a real supervisor on-site, from foundation to final walkthrough, is how we build for quality that lasts instead of just a fast handoff.",
    rows: [
      { label: "New homeowners with a major repair issue, year one", value: "92%" },
      { label: "Typical crew supervision", value: "compressed, subcontracted" },
      { label: "TransparentChanges Home Building's crews", value: "licensed, supervised on-site", final: true },
    ],
    closing:
      "Qualified labor on every crew, and someone accountable on-site through the whole build. See what you're paying for, how much it costs us in detail, what any markup is, and what it goes for — building made transparent so quality and value can be seen.",
  },
  {
    slug: "reviews",
    name: "Reviews",
    icon: "reviews",
    photo: "/images/reviews.jpg",
    cardDescription:
      "We review real products for real use, so customers know the unbiased truth — no sponsored reviews, no buying fake ones. We review what you want, so you can buy what fits you.",
    headline: "A review you can actually trust.",
    intro:
      "An estimated 30% of online reviews today are fake or manipulated — paid for, incentivized, or written by bots, while the products that don't play along get buried. Ours works the other way: reviews are done in house by our staff against real customers' actual needs — they can't be bought, gifted, influenced, or pressured by the company being reviewed. If a company believes in their products, they'll submit for an honest review.",
    rows: [
      { label: "Online reviews estimated fake or manipulated, 2025", value: "~30%" },
      { label: "Consumers who've encountered a fake review in the last year", value: "82%" },
      { label: "TransparentChanges Reviews' policy", value: "honest, real, and unbiased", final: true },
    ],
    closing:
      "Every product we test is eventually donated to someone who needs it — so the review process helps everyone all the way through, and hopefully produces longer-lasting products, fewer returns, and less waste!",
  },
  {
    slug: "website",
    name: "Website Builder",
    icon: "website",
    photo: "/images/website-builder.jpg",
    cardDescription:
      "Every step, cost, and markup published up front — so you know exactly what's involved and what to expect as you go. See what you pay and how it's used.",
    headline: "Know every step before you start.",
    intro:
      "A professional agency site commonly starts at $6,000 and climbs past $35,000, and freelancers can come with hidden recurring fees or lock your site into a system you don't actually own and can't take with you. For a lot of first-time owners, jumping straight to \"just use AI\" is its own wall to climb. We lay out every step so you know what's involved, what it costs, and what to expect as you go.",
    rows: [
      { label: "Typical agency small-business website", value: "$6,000–$35,000+" },
      { label: "Shoppers who've skipped a business with no website", value: "~31%" },
      { label: "TransparentChanges Website Builder's pricing", value: "published per step, no lock-in", final: true },
    ],
    closing:
      "Every step, its real cost, and the markup on it — laid out ahead of time, so you can start small and level up only when you're ready, with no surprise recurring bill. We want everyone to be an entrepreneur and create new opportunities where they can to help the community or the world.",
  },
  {
    slug: "credit-cards",
    name: "Credit Cards",
    icon: "credit-cards",
    photo: "/images/credit-cards.jpg",
    cardDescription:
      "A card built to keep you out of debt, not into it — with smaller fees that merchants can expect, plan for, and understand, passing the savings on to you, the customer, on every purchase. See what you pay and how it's used.",
    headline: "A credit card that isn't trying to get you into debt.",
    intro:
      "Visa alone reported $40 billion in revenue last year, funded largely by transaction fees that merchants pass straight into the price of everything you buy. Meanwhile Americans now carry $1.25 trillion in credit card debt at an average interest rate near 21% — and every card on the market is designed to encourage more spending, not less. Ours is built backwards from that: lower, flatter transaction fees that bring everyday prices down, and a card whose whole design is to keep you spending wisely, not maximize what you owe.",
    rows: [
      { label: "Visa's reported revenue, FY2025", value: "$40B" },
      { label: "Total U.S. credit card debt, 2026", value: "$1.25T" },
      { label: "Average credit card interest rate", value: "~21%" },
      { label: "TransparentChanges Credit Cards' transaction fee", value: "flat, published, lower", final: true },
    ],
    closing:
      "Convenience without the trap — a card designed to help you spend wisely, not to profit more the deeper in debt you go.",
  },
];

export function getVenture(slug: string): Venture | undefined {
  return VENTURES.find((v) => v.slug === slug);
}
