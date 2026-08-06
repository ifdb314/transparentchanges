import Link from "next/link";
import { ProblemsChart, ProblemsLegend } from "@/components/ProblemsChart";
import { VENTURE_ICONS } from "@/components/Icons";
import { VENTURES } from "@/lib/ventures";
import { getFoundingCircleData, initialsFromName, colorForName } from "@/lib/foundingCircle";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getFoundingCircleData();
  const members = data.recent.slice(0, 5).map((r) => ({ key: r.id, name: r.name }));
  const overflow = data.totalPeople - members.length;
  const peopleHeadline =
    data.totalPeople === 0
      ? "Be the first to say yes."
      : `${data.totalPeople.toLocaleString()} ${data.totalPeople === 1 ? "person has" : "people have"} already said yes.`;

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
              Built to be better, <span className="soft">from the ground up.</span>
            </h1>
            <p className="hero-lede">
              If you&apos;ve ever wished your work life was better, that you were happier, that
              companies cared more about their employees, offered products and services people
              truly loved at fair prices, and were mindful of the planet and its resources — then
              we need you to help make it a reality. Together, we can make these wishes come true.
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
                <b>{data.totalPeople.toLocaleString()}</b>people in
              </div>
              <div>
                <b>{VENTURES.length}</b>candidate ventures
              </div>
              <div>
                <b>$0</b>required to join
              </div>
            </div>
          </div>
          <div className="hero-chart-card">
            <div className="hero-chart-label">Top reasons people are unhappy at work.</div>
            <ProblemsChart />
            <ProblemsLegend />
          </div>
        </div>
      </section>

      <section className="band alt">
        <div className="band-head">
          <div className="band-eyebrow">A different starting point</div>
          <h2>What if businesses were built better, from the ground up?</h2>
        </div>
        <ul className="point-grid whatif">
          <li>Employees worked remotely as the first option, not the exception.</li>
          <li>People worked 30–32 hours a week — a four-day week.</li>
          <li>Companies prioritized people first, not profits.</li>
          <li>Manager salaries directly capped to their lowest-paid employee.</li>
          <li>100% of employees did 100% of the work.</li>
          <li>Managers didn&apos;t push paper — they worked beside their employees.</li>
          <li>Companies existed to make the world better.</li>
          <li>Jobs had purpose — sense of doing something important.</li>
        </ul>
        <p className="band-closing">
          These are just a few. If this is what you&apos;d like to see start to be the norm, help
          us change the future. We can&apos;t do this alone — it&apos;s daunting going up against
          big companies and established industries, but together, done the right way, we
          absolutely can.
        </p>
        <p className="band-closing">
          If you&apos;ve ever watched a movie where one person held tens or hundreds of people at
          bay, and thought: why don&apos;t the people just band together and free themselves? They
          have the numbers, and there&apos;s strength in numbers — that&apos;s what we&apos;re
          asking of you. Join us. Help increase our numbers, in whatever way you can, so that
          together we&apos;re strong.
        </p>
        <div className="hero-cta-row" style={{ marginTop: 22 }}>
          <Link href="/founding-circle" className="btn">
            Join the Founding Circle
          </Link>
        </div>
      </section>

      <section className="band forest">
        <div className="band-head">
          <div className="band-eyebrow">{VENTURES.length} ventures, one standard</div>
          <h2>Let&apos;s change the way businesses have been run to the way they should be run.</h2>
          <p>
            Know of a problem? <Link href="/ventures#suggest">Suggest one</Link> — or simply see
            examples below.
          </p>
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
          <h2>{peopleHeadline}</h2>
        </div>
        <div className="story-row">
          {members.map((m) => (
            <div className="story-ring" key={m.key}>
              <div className="ring">
                <div className="avatar-initials" style={{ background: colorForName(m.name) }}>
                  {initialsFromName(m.name)}
                </div>
              </div>
              <div className="label">{m.name}</div>
            </div>
          ))}
          {overflow > 0 ? (
            <div className="story-ring">
              <div className="ring placeholder">
                <div className="avatar-initials">+{overflow}</div>
              </div>
              <div className="label">and more</div>
            </div>
          ) : (
            <div className="story-ring">
              <div className="ring placeholder">
                <div className="avatar-initials">?</div>
              </div>
              <div className="label">You?</div>
            </div>
          )}
        </div>
      </section>

      <section className="band coral">
        <div className="band-head">
          <div className="band-eyebrow">What actually changes</div>
          <h2>Not better ads or marketing. A promise to be fair and just.</h2>
        </div>
        <div className="compare">
          <div className="old">
            <h4>The industry standard</h4>
            <ul>
              <li>Actual customer costs and profits are obscured</li>
              <li>Executive pay is a multiple no one at the company can see</li>
              <li>&quot;Values&quot; live on the About page, not the P&amp;L</li>
              <li>Layoffs fund the buyback, not the other way around</li>
            </ul>
          </div>
          <div className="new">
            <h4>TransparentChanges</h4>
            <ul>
              <li>Every sale, every cost, every dollar is listed and published</li>
              <li>Manager pay is capped at 2× their lowest-paid direct report</li>
              <li>First Steps is the values page — updated every 6 months</li>
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
            <div className="tstat">92%</div>
            <div className="tbody">
              New homeowners who ran into at least one major repair issue within their first year
              in the home.
            </div>
            <div className="tsrc">American Home Shield survey, 2024</div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Help build a better future.</h2>
          <Link href="/founding-circle" className="btn">
            Join the Founding Circle
          </Link>
        </div>
      </section>
    </>
  );
}
