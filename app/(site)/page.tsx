import Link from "next/link";
import Image from "next/image";
import { LedgerBar, LedgerLegend } from "@/components/LedgerBar";
import { VENTURE_ICONS } from "@/components/Icons";
import { VENTURES } from "@/lib/ventures";

export default function HomePage() {
  return (
    <>
      <section
        className="photo-hero"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(16,40,31,0.90) 15%, rgba(110,46,28,0.68) 60%, rgba(60,30,18,0.55) 100%), url('/images/hero_hands.jpg')",
        }}
      >
        <div className="photo-hero-inner">
          <div>
            <div className="stamp">Founding phase — We need you!</div>
            <h1>
              Fair, <span className="soft">from the ground up.</span>
            </h1>
            <p className="hero-lede">
              We&apos;re building companies that publish their receipts and put employees and
              customers first — a grocery distributor, a law firm, a plumber, a home builder, a
              rideshare — one industry at a time, starting with the one you help build first.
            </p>
            <div className="hero-cta-row">
              <Link href="/founding-circle" className="btn">
                Join the Founding Circle
              </Link>
              <Link href="/founding-circle" className="btn ghost">
                See how you can help →
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <b>1,842</b>people in
              </div>
              <div>
                <b>5</b>candidate ventures
              </div>
              <div>
                <b>$0</b>required to join
              </div>
            </div>
          </div>
          <div className="hero-chart-card">
            <div className="hero-chart-label">
              This is our own ledger — the same standard every venture will publish.
            </div>
            <LedgerBar />
            <LedgerLegend />
          </div>
        </div>
      </section>

      <section className="band forest">
        <div className="band-head">
          <div className="band-eyebrow">Five ventures, one standard</div>
          <h2>Ordinary industries, run the way they should have been all along.</h2>
        </div>
        <div className="venture-grid-site">
          {VENTURES.map((v) => {
            const Icon = VENTURE_ICONS[v.icon];
            return (
              <Link href={`/ventures/${v.slug}`} className="vcard" key={v.slug}>
                <div
                  className="vcard-photo"
                  style={{ backgroundImage: `url('${v.photo}')` }}
                >
                  <div className="icon-tile">
                    <Icon />
                  </div>
                </div>
                <div className="vcard-body">
                  <h3>{v.name}</h3>
                  <p>{v.cardDescription}</p>
                  <div className="vlink">See the venture →</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="band">
        <div className="band-head">
          <h2>1,842 people already said yes.</h2>
        </div>
        <div className="story-row">
          <div className="story-ring">
            <div className="ring">
              <Image src="/images/volunteers.jpg" alt="" width={66} height={66} style={{ objectFit: "cover", objectPosition: "30% 30%" }} />
            </div>
            <div className="label">Maria T.</div>
          </div>
          <div className="story-ring">
            <div className="ring">
              <Image src="/images/family.jpg" alt="" width={66} height={66} style={{ objectFit: "cover", objectPosition: "60% 30%" }} />
            </div>
            <div className="label">Jamal R.</div>
          </div>
          <div className="story-ring">
            <div className="ring">
              <Image src="/images/farmer.jpg" alt="" width={66} height={66} style={{ objectFit: "cover" }} />
            </div>
            <div className="label">Priya S.</div>
          </div>
          <div className="story-ring">
            <div className="ring">
              <Image src="/images/construction.jpg" alt="" width={66} height={66} style={{ objectFit: "cover", objectPosition: "60% 20%" }} />
            </div>
            <div className="label">Devon K.</div>
          </div>
          <div className="story-ring">
            <div className="ring">
              <Image src="/images/driver.jpg" alt="" width={66} height={66} style={{ objectFit: "cover" }} />
            </div>
            <div className="label">Owen P.</div>
          </div>
          <div className="story-ring">
            <div className="ring placeholder">
              <span>+1.8K</span>
            </div>
            <div className="label">You?</div>
          </div>
        </div>
      </section>

      <section className="band coral">
        <div className="band-head">
          <div className="band-eyebrow">What actually changes</div>
          <h2>Not a better ad. A different set of numbers.</h2>
        </div>
        <div className="compare">
          <div className="old">
            <h4>The industry standard</h4>
            <ul>
              <li>Take rates and fees rise quietly, then stop being disclosed</li>
              <li>Executive pay is a multiple no one at the company can see</li>
              <li>&quot;Values&quot; live on the About page, not the P&amp;L</li>
              <li>Layoffs fund the buyback, not the other way around</li>
            </ul>
          </div>
          <div className="new">
            <h4>TransparentChanges</h4>
            <ul>
              <li>Every rate, fee, and take is published and dated</li>
              <li>Manager pay is capped at 2× their lowest-paid direct report</li>
              <li>The Ledger is the values page — updated every quarter</li>
              <li>Leadership pay moves before headcount does</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="band-head">
          <div className="band-eyebrow">Truth you don&apos;t know</div>
          <h2>What the industry doesn&apos;t put on the receipt.</h2>
        </div>
        <div className="truth-grid-site">
          <div className="tcard tc-1">
            <div className="tstat">42%</div>
            <div className="tbody">
              Uber&apos;s cut of every fare in 2024, up from 32% in 2022 — then it stopped
              disclosing the number.
            </div>
            <div className="tsrc">NELP, 2025</div>
          </div>
          <div className="tcard tc-2">
            <div className="tstat">281×</div>
            <div className="tbody">
              What the average CEO of a major U.S. company makes compared to their typical
              employee.
            </div>
            <div className="tsrc">EPI, 2024</div>
          </div>
          <div className="tcard tc-3">
            <div className="tstat">$16.1M</div>
            <div className="tbody">
              Paid by one major homebuilder to 200+ buyers over roof and water-intrusion defects.
            </div>
            <div className="tsrc">Sauder Schelkopf, 2025</div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Add your name. $0 required.</h2>
          <Link href="/founding-circle" className="btn">
            Join the Founding Circle
          </Link>
        </div>
      </section>
    </>
  );
}
