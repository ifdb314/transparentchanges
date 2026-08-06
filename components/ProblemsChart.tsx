const SEGMENTS = [
  { key: "pay", label: "Low pay", pct: 30, varName: "--chart-wages" },
  { key: "boss", label: "Bad boss", pct: 22, varName: "--chart-materials" },
  { key: "growth", label: "No growth", pct: 20, varName: "--chart-research" },
  { key: "balance", label: "Bad work-life balance", pct: 18, varName: "--chart-donations" },
  { key: "other", label: "Other issues", pct: 10, varName: "--chart-ops" },
] as const;

const SIZE = 160;
const RADIUS = 58;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

export function ProblemsChart() {
  let offset = 0;
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
      className="problems-chart-svg"
      role="img"
      aria-label="Top reasons people are unhappy at work: low pay, bad boss, no growth, bad work-life balance, and other issues"
    >
      <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
        {SEGMENTS.map((s) => {
          const segLength = (s.pct / 100) * CIRCUMFERENCE;
          const dash = (
            <circle
              key={s.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={`var(${s.varName})`}
              strokeWidth={STROKE}
              strokeDasharray={`${segLength - GAP} ${CIRCUMFERENCE - (segLength - GAP)}`}
              strokeDashoffset={-offset}
            />
          );
          offset += segLength;
          return dash;
        })}
      </g>
    </svg>
  );
}

export function ProblemsLegend() {
  return (
    <div className="ledger-legend">
      {SEGMENTS.map((s) => (
        <span className="li" key={s.key}>
          <span className="sw" style={{ background: `var(${s.varName})` }} />
          {s.label} ({s.pct}%)
        </span>
      ))}
    </div>
  );
}
