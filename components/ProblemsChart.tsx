const SEGMENTS = [
  { key: "unhappy", label: "Feel generally unhappy at work", varName: "--chart-wages" },
  { key: "underpaid", label: "Feel they aren't paid enough", varName: "--chart-materials" },
  { key: "uncared", label: "Feel their company doesn't care about them", varName: "--chart-research" },
  { key: "overpay", label: "Feel they overpay for products & services", varName: "--chart-donations" },
] as const;

const SIZE = 160;
const RADIUS = 58;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

export function ProblemsChart() {
  const segLength = CIRCUMFERENCE / SEGMENTS.length;
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width={SIZE}
      height={SIZE}
      className="problems-chart-svg"
      role="img"
      aria-label="Four reasons people are looking for something better"
    >
      <g transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
        {SEGMENTS.map((s, i) => (
          <circle
            key={s.key}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={`var(${s.varName})`}
            strokeWidth={STROKE}
            strokeDasharray={`${segLength - GAP} ${CIRCUMFERENCE - (segLength - GAP)}`}
            strokeDashoffset={-(i * segLength)}
          />
        ))}
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
          {s.label}
        </span>
      ))}
    </div>
  );
}
