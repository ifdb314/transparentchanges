import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const PLEDGE_LABELS: Record<string, string> = {
  money: "Money",
  word: "Spread the word",
  volunteer: "Volunteer",
  employee: "Employee",
};

function formatCents(cents: number | null) {
  if (cents == null) return "—";
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  const supabase = supabaseAdmin();

  const [
    { data: entries },
    { count: totalEntries },
    { data: moneyRows },
    { data: suggestions },
    { data: ventures },
  ] = await Promise.all([
    supabase
      .from("founding_circle_entries")
      .select("id, created_at, pledge_type, name, location, amount_cents, help_text")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase.from("founding_circle_entries").select("id", { count: "exact", head: true }),
    supabase.from("founding_circle_entries").select("amount_cents").eq("pledge_type", "money"),
    supabase
      .from("industry_suggestions")
      .select("id, created_at, industry, why_needed, name, location, votes")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase.from("ventures").select("slug, name, votes").order("votes", { ascending: false }),
  ]);

  const totalMoneyCents = (moneyRows || []).reduce((sum, r) => sum + (r.amount_cents || 0), 0);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <div className="admin-wrap">
      <h1 style={{ marginBottom: 6 }}>Admin dashboard</h1>
      <p style={{ marginBottom: 28 }}>
        Founding Circle entries, industry suggestions, and venture votes — live from Supabase.
        For traffic, visits, and visitor analytics, use{" "}
        {gaId ? (
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--accent)" }}
          >
            Google Analytics
          </a>
        ) : (
          "Google Analytics (not yet configured — see SETUP.md)"
        )}
        {" "}— that&apos;s the right tool for that job, not this page.
      </p>

      <div className="admin-stat-row">
        <div className="admin-stat">
          <div className="n">{totalEntries ?? 0}</div>
          <div className="l">Founding Circle entries</div>
        </div>
        <div className="admin-stat">
          <div className="n">{formatCents(totalMoneyCents)}</div>
          <div className="l">Total pledged</div>
        </div>
        <div className="admin-stat">
          <div className="n">{(suggestions || []).length}</div>
          <div className="l">Industry suggestions</div>
        </div>
      </div>

      <h2 style={{ fontSize: "1.2rem", marginBottom: 14 }}>Founding Circle entries</h2>
      <div className="admin-table-wrap" style={{ marginBottom: 40 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Type</th>
              <th>Name</th>
              <th>Location</th>
              <th>Amount</th>
              <th>How they can help</th>
            </tr>
          </thead>
          <tbody>
            {(entries || []).map((e) => (
              <tr key={e.id}>
                <td>{formatDate(e.created_at)}</td>
                <td>
                  <span className="pill">{PLEDGE_LABELS[e.pledge_type] || e.pledge_type}</span>
                </td>
                <td>{e.name}</td>
                <td>{e.location}</td>
                <td>{formatCents(e.amount_cents)}</td>
                <td>{e.help_text || "—"}</td>
              </tr>
            ))}
            {(!entries || entries.length === 0) && (
              <tr>
                <td colSpan={6}>No entries yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: "1.2rem", marginBottom: 14 }}>Venture votes</h2>
      <div className="admin-table-wrap" style={{ marginBottom: 40 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Venture</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {(ventures || []).map((v) => (
              <tr key={v.slug}>
                <td>{v.name}</td>
                <td>{v.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: "1.2rem", marginBottom: 14 }}>Industry suggestions</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>When</th>
              <th>Industry</th>
              <th>Why</th>
              <th>Name</th>
              <th>Location</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {(suggestions || []).map((s) => (
              <tr key={s.id}>
                <td>{formatDate(s.created_at)}</td>
                <td>{s.industry}</td>
                <td>{s.why_needed}</td>
                <td>{s.name}</td>
                <td>{s.location}</td>
                <td>{s.votes}</td>
              </tr>
            ))}
            {(!suggestions || suggestions.length === 0) && (
              <tr>
                <td colSpan={6}>No suggestions yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
