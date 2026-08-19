import Link from "next/link";
import { LedgerBar, LedgerLegend } from "@/components/LedgerBar";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "First Steps",
  description: "Where every dollar goes — updated every 6 months, down to the management pay ratio.",
  path: "/first-steps",
  image: "/images/team.jpg",
});

export default function FirstStepsPage() {
  return (
    <>
      <div className="photo-band">
        <img src="/images/team.jpg" alt="The team behind TransparentChanges" className="photo-band-bg" />
        <div
          className="photo-band-overlay"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(16,40,31,0.1), rgba(16,40,31,0.8))" }}
        />
        <div className="photo-band-text">
          <p>Are you tired of hoping for change? Let&apos;s stop wishing and start doing.</p>
          <small>Doing something — that&apos;s what&apos;s next.</small>
        </div>
      </div>

      <section className="band">
        <div className="band-head">
          <div className="band-eyebrow">The process</div>
          <h2>Here&apos;s what&apos;s coming next.</h2>
        </div>
        <div className="process-list">
          <div className="process-step">
            <div className="process-num">1</div>
            <div className="process-body">
              <h3>Gather a vast pool of people and resources to make a difference.</h3>
              <p>Spread the word — the more people there are, the easier and more successful this will be.</p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-num">2</div>
            <div className="process-body">
              <h3>Choose a venture or a company to build and improve.</h3>
              <p>Put thoughts and planning into actions and deeds.</p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-num">3</div>
            <div className="process-body">
              <h3>Start the venture with the right team, the right people, the right way — from the ground up, following the Ideal Company playbook.</h3>
              <p>Take the hardest step: making the effort against an industry set in old ways.</p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-num">4</div>
            <div className="process-body">
              <h3>Put the ideals into practice.</h3>
              <p>
                Profits to employees, savings to customers, happiness to both, and a positive
                impact on the community and the world around it. Success is a company everyone
                wants to work for, customers want to buy from, and that makes the world a little
                better with each passing day.
              </p>
            </div>
          </div>
          <div className="process-step">
            <div className="process-num">5</div>
            <div className="process-body">
              <h3>Use successes to change other industries and spread the positive change.</h3>
              <p>Create a change that spreads — that heals the broken world we&apos;ve all just accepted.</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 32 }}>
          <Link href="/founding-circle" className="btn">
            Join our Mission
          </Link>
        </div>
      </section>

      <section className="band">
        <div className="band-head">
          <div className="band-eyebrow">The reasoning</div>
          <h2>Why would this work?</h2>
        </div>
        <div className="why-list">
          <div className="why-row">
            <h3>Shared, not siloed, support functions</h3>
            <div className="why-split">
              <div className="why-problem">
                <span className="why-label">The traditional way</span>
                <p>
                  Companies build out separate departments — HR, Marketing, IT, Legal, and more —
                  that aren&apos;t actually part of their core business. Those departments get
                  poor managers, thin staffing, and rarely see investment, because leadership
                  doesn&apos;t see them as essential. The cost-to-value ratio stops making sense.
                </p>
              </div>
              <div className="why-fix">
                <span className="why-label">The TransparentChanges way</span>
                <p>
                  That functionality is necessary — just not core to any one venture — so
                  it&apos;s shared across ventures instead. Shared teams can be staffed and
                  supported by the best, ROI on employee productivity goes up, and the people
                  doing the work feel a real sense of purpose and value.
                </p>
              </div>
            </div>
          </div>

          <div className="why-row">
            <h3>Pay tied to performance, not politics</h3>
            <div className="why-split">
              <div className="why-problem">
                <span className="why-label">The traditional way</span>
                <p>
                  Hidden salaries, unpublished promotion criteria, and departmental costs no one
                  can see push employees toward politics and building alliances instead of doing
                  what&apos;s actually best for the business.
                </p>
              </div>
              <div className="why-fix">
                <span className="why-label">The TransparentChanges way</span>
                <p>
                  Pay is tied directly to contribution and performance — not relationships with
                  the people above you. Everyone knows how and why they&apos;re valued and how to
                  move up, and combined with company-wide profit transparency, people can hold
                  themselves accountable for where they stand. Less resentment, more clarity,
                  happier and more productive people.
                </p>
              </div>
            </div>
          </div>

          <div className="why-row">
            <h3>No reward for empire-building</h3>
            <div className="why-split">
              <div className="why-problem">
                <span className="why-label">The traditional way</span>
                <p>
                  Managers are conditioned to see more headcount as more power, so they hire for
                  size, not efficiency — and often pick agreeable hires over people willing to
                  push back or think differently.
                </p>
              </div>
              <div className="why-fix">
                <span className="why-label">The TransparentChanges way</span>
                <p>
                  Manager pay is capped as a function of their lowest-paid employee&apos;s salary,
                  so adding headcount doesn&apos;t grow their own pay. And every department&apos;s
                  cost-to-ROI is public across the company — no slide deck can oversell a
                  department when the actual numbers are there for everyone to see.
                </p>
              </div>
            </div>
          </div>

          <div className="why-row">
            <h3>Everyone gets to drive change — and gets paid for it</h3>
            <div className="why-split">
              <div className="why-problem">
                <span className="why-label">The traditional way</span>
                <p>
                  Change is usually left to a handful of executives, while the rest of the
                  workforce is expected to keep their heads down and stick with the status quo.
                  That makes businesses slow to adapt — people get comfortable, and suggesting
                  change feels risky.
                </p>
              </div>
              <div className="why-fix">
                <span className="why-label">The TransparentChanges way</span>
                <p>
                  A dedicated team of entrepreneurial, disruptive thinkers works full-time on
                  improving every venture, inside and out. And every employee is encouraged to
                  improve the business themselves — with a real share of the savings or revenue
                  their idea generates, for an appropriate stretch of its impact.
                </p>
              </div>
            </div>
          </div>

          <div className="why-row">
            <h3>Recognition goes to the people who did the work</h3>
            <div className="why-split">
              <div className="why-problem">
                <span className="why-label">The traditional way</span>
                <p>
                  Managers get celebrated, executives get praised — but the baseline employees who
                  did most of the actual work rarely get called out by name. That takes a real
                  toll on morale and self-worth.
                </p>
              </div>
              <div className="why-fix">
                <span className="why-label">The TransparentChanges way</span>
                <p>
                  The people at the baseline get celebrated first when things go well. Managers
                  and execs get a shout-out, not the majority of the credit — the real
                  boots-on-the-ground work gets recognized, so people feel the impact of what they
                  did.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="why-tagline">
          These aren&apos;t revolutionary ideas. They&apos;re fundamental ideas that should have
          been in place for every company from the beginning.
        </p>
      </section>

      <section className="band" style={{ paddingBottom: 0 }}>
        <div className="band-head">
          <h2>Change starts with truth.</h2>
          <p>
            To do this right and make change, it starts with transparency — making costs
            transparent, making pricing transparent, making profits transparent, so employees,
            customers, and the public know and believe in the company. The biggest piece missing
            from most — if not every — industry today is accounting transparency. So
            that&apos;s the first thing.
          </p>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="band-head">
          <div className="band-eyebrow">Updated every 6 months</div>
          <h2>Where every dollar goes.</h2>
          <p>Every venture will publish a ledger like this publicly. Click any category to open it.</p>
        </div>
        <div className="ledger-sales">
          <span className="num">$4.2M</span>
          <span className="lbl">in venture sales this period</span>
        </div>
        <LedgerBar height={44} />
        <LedgerLegend />
      </section>

      <section className="band" style={{ paddingTop: 36, maxWidth: 820 }}>
        <details className="ledger-cat" open>
          <summary>
            <span>Wages by group</span>
            <span className="pct">42%</span>
            <span className="amt">$1.77M</span>
          </summary>
          <div className="ledger-sub">
            <span>Frontline &amp; hourly staff</span>
            <span className="pct">22%</span>
            <span className="amt">$0.92M</span>
          </div>
          <div className="ledger-sub">
            <span>Specialist &amp; field staff</span>
            <span className="pct">9%</span>
            <span className="amt">$0.38M</span>
          </div>
          <div className="ledger-sub">
            <span>Support &amp; admin</span>
            <span className="pct">5%</span>
            <span className="amt">$0.21M</span>
          </div>
          <div className="ledger-sub">
            <span>Management</span>
            <span className="pct">2%</span>
            <span className="amt">$0.08M</span>
          </div>
          <div className="ledger-sub">
            <span>Founder &amp; leadership</span>
            <span className="pct">4%</span>
            <span className="amt">$0.17M</span>
          </div>
          <div className="ledger-note">
            Management pay cap: no manager earns more than 2× the lowest-paid employee they
            directly supervise. Current ratio: 1.7×.
          </div>
        </details>

        <details className="ledger-cat">
          <summary>
            <span>Materials &amp; cost of goods</span>
            <span className="pct">34%</span>
            <span className="amt">$1.43M</span>
          </summary>
          <div className="ledger-sub">
            <span>Inventory &amp; raw goods</span>
            <span className="pct">26%</span>
            <span className="amt">$1.09M</span>
          </div>
          <div className="ledger-sub">
            <span>Sourcing &amp; logistics</span>
            <span className="pct">8%</span>
            <span className="amt">$0.34M</span>
          </div>
        </details>

        <details className="ledger-cat">
          <summary>
            <span>Operations &amp; overhead</span>
            <span className="pct">14%</span>
            <span className="amt">$0.59M</span>
          </summary>
          <div className="ledger-sub">
            <span>Facilities &amp; equipment</span>
            <span className="pct">7%</span>
            <span className="amt">$0.29M</span>
          </div>
          <div className="ledger-sub">
            <span>Technology &amp; admin systems</span>
            <span className="pct">4%</span>
            <span className="amt">$0.17M</span>
          </div>
          <div className="ledger-sub">
            <span>Insurance &amp; compliance</span>
            <span className="pct">3%</span>
            <span className="amt">$0.13M</span>
          </div>
        </details>

        <details className="ledger-cat">
          <summary>
            <span>Research</span>
            <span className="pct">4%</span>
            <span className="amt">$0.17M</span>
          </summary>
          <div className="ledger-sub">
            <span>Product &amp; process R&amp;D</span>
            <span className="pct">3%</span>
            <span className="amt">$0.13M</span>
          </div>
          <div className="ledger-sub">
            <span>Pilot programs</span>
            <span className="pct">1%</span>
            <span className="amt">$0.04M</span>
          </div>
        </details>

        <details className="ledger-cat">
          <summary>
            <span>Community donations</span>
            <span className="pct">2%</span>
            <span className="amt">$0.08M</span>
          </summary>
          <div className="ledger-sub">
            <span>Local nonprofit partners</span>
            <span className="pct">1.5%</span>
            <span className="amt">$0.06M</span>
          </div>
          <div className="ledger-sub">
            <span>Employee emergency assistance fund</span>
            <span className="pct">0.5%</span>
            <span className="amt">$0.02M</span>
          </div>
        </details>

        <div className="ledger-total">
          <span>Retained profit</span>
          <span className="amt">4% · $0.17M</span>
        </div>
        <div className="ledger-profit-note">
          Retained profit isn&apos;t the goal — it&apos;s a queue. When it grows, it&apos;s
          earmarked first for a rainy-day reserve, then employee benefits, then research, then
          giving back to the community, then lower prices for customers. In that order, every
          period — with exactly where every dollar of profit goes published, so employees know,
          the community knows, and our customers know.
        </div>
        <p className="band-closing">
          Accounting transparency is the first step, not the last one. From there, we move
          toward the <Link href="/ideal-company">Ideal Company</Link>.
        </p>
      </section>
    </>
  );
}
