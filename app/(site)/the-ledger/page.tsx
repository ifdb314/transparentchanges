import type { Metadata } from "next";
import { LedgerBar, LedgerLegend } from "@/components/LedgerBar";

export const metadata: Metadata = {
  title: "The Ledger",
  description: "Where every dollar goes — updated every quarter, down to the management pay ratio.",
};

export default function LedgerPage() {
  return (
    <>
      <div
        className="photo-band"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(19,14,10,0.1), rgba(19,14,10,0.8)), url('/images/team.jpg')",
        }}
      >
        <div className="photo-band-text">
          <p>Every number here is a paycheck, a benefit, a family&apos;s rent.</p>
        </div>
      </div>

      <section className="band" style={{ paddingBottom: 0 }}>
        <div className="band-head">
          <div className="band-eyebrow">Updated every quarter</div>
          <h2>Where every dollar goes.</h2>
          <p>Nothing here is rounded for effect. Click any category to open it.</p>
        </div>
        <div className="ledger-sales">
          <span className="num">$4.2M</span>
          <span className="lbl">in venture sales this quarter</span>
        </div>
        <LedgerBar height={44} />
        <LedgerLegend />
      </section>

      <section className="band" style={{ paddingTop: 36, maxWidth: 820 }}>
        <details className="ledger-cat" open>
          <summary>
            <span>Wages by group</span>
            <span className="pct">38%</span>
            <span className="amt">$1.60M</span>
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
          <div className="ledger-note">
            Management pay cap: no manager earns more than 2× the lowest-paid employee they
            directly supervise. Current ratio: 1.7×.
          </div>
        </details>

        <details className="ledger-cat">
          <summary>
            <span>Founder &amp; leadership pay</span>
            <span className="pct">4%</span>
            <span className="amt">$0.17M</span>
          </summary>
          <div className="ledger-sub">
            <span>Wages</span>
            <span className="pct">3%</span>
            <span className="amt">$0.13M</span>
          </div>
          <div className="ledger-sub">
            <span>Benefits</span>
            <span className="pct">1%</span>
            <span className="amt">$0.04M</span>
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
          earmarked first for research, then employee benefits, then giving back to the
          community, then a rainy-day reserve, then lower prices for customers. In that order,
          every quarter.
        </div>
      </section>
    </>
  );
}
