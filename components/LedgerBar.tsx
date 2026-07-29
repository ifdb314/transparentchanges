const SEGMENTS = [
  { key: "wages", label: "Wages", pct: 38, varName: "--chart-wages" },
  { key: "lead", label: "Leadership", pct: 4, varName: "--chart-lead" },
  { key: "materials", label: "Materials", pct: 34, varName: "--chart-materials" },
  { key: "ops", label: "Ops", pct: 14, varName: "--chart-ops" },
  { key: "research", label: "Research", pct: 4, varName: "--chart-research" },
  { key: "donations", label: "Donations", pct: 2, varName: "--chart-donations" },
  { key: "profit", label: "Profit", pct: 4, varName: "--chart-profit" },
] as const;

export function LedgerBar({ height = 34 }: { height?: number }) {
  return (
    <div className="ledger-bar" style={{ height }}>
      {SEGMENTS.map((s) => (
        <div
          key={s.key}
          className="seg"
          style={{ width: `${s.pct}%`, background: `var(${s.varName})` }}
        />
      ))}
    </div>
  );
}

export function LedgerLegend() {
  return (
    <div className="ledger-legend">
      {SEGMENTS.map((s) => (
        <span className="li" key={s.key}>
          <span className="sw" style={{ background: `var(${s.varName})` }} />
          {s.label} <b>{s.pct}%</b>
        </span>
      ))}
    </div>
  );
}
