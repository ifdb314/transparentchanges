const SEGMENTS = [
  { key: "pay", label: "Low Pay", icon: "💰", pct: 30, varName: "--chart-wages" },
  { key: "boss", label: "Bad Boss", icon: "😠", pct: 22, varName: "--chart-materials" },
  { key: "growth", label: "No Growth", icon: "📉", pct: 20, varName: "--chart-research" },
  { key: "balance", label: "Bad Work-Life Balance", icon: "⚖️", pct: 18, varName: "--chart-donations" },
  { key: "other", label: "Other Issues", icon: "❓", pct: 10, varName: "--chart-ops" },
] as const;

const SIZE_W = 460;
const SIZE_H = 360;
const CX = 230;
const CY = 178;
const R = 92;
const EXPLODE = 10;
const SKIRT_DEPTH = 15;
const START_ANGLE = -90;

function toXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function wrapLabel(label: string, maxChars = 13) {
  const words = label.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function wedgePath(cx: number, cy: number, r: number, start: number, end: number) {
  const p1 = toXY(cx, cy, r, start);
  const p2 = toXY(cx, cy, r, end);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;
}

export function ProblemsChart() {
  let angle = START_ANGLE;
  const wedges = SEGMENTS.map((s) => {
    const start = angle;
    const end = angle + s.pct * 3.6;
    angle = end;
    const mid = (start + end) / 2;
    const rad = (mid * Math.PI) / 180;
    const dx = EXPLODE * Math.cos(rad);
    const dy = EXPLODE * Math.sin(rad);
    const pctPoint = toXY(0, 0, R * 0.6, mid);
    const labelPoint = toXY(0, 0, R + 20, mid);
    return { ...s, start, end, dx, dy, pctPoint, labelPoint };
  });

  return (
    <svg
      viewBox={`0 0 ${SIZE_W} ${SIZE_H}`}
      width={SIZE_W}
      height={SIZE_H}
      className="problems-chart-svg"
      role="img"
      aria-label="Top reasons people are unhappy at work: low pay 30%, bad boss 22%, no growth 20%, bad work-life balance 18%, other issues 10%"
    >
      {wedges.map((w) => (
        <g key={w.key} transform={`translate(${CX + w.dx} ${CY + w.dy})`}>
          <path
            d={wedgePath(0, SKIRT_DEPTH, R, w.start, w.end)}
            fill={`var(${w.varName})`}
            style={{ filter: "brightness(0.68)" }}
          />
          <path d={wedgePath(0, 0, R, w.start, w.end)} fill={`var(${w.varName})`} stroke="rgba(0,0,0,0.08)" />
          <text
            x={w.pctPoint.x}
            y={w.pctPoint.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="chart-pct"
          >
            {w.pct}%
          </text>
        </g>
      ))}
      {wedges.map((w) => {
        const anchor = w.labelPoint.x > 8 ? "start" : w.labelPoint.x < -8 ? "end" : "middle";
        const lines = wrapLabel(w.label);
        return (
          <g
            key={`${w.key}-label`}
            transform={`translate(${CX + w.dx + w.labelPoint.x} ${CY + w.dy + w.labelPoint.y})`}
            textAnchor={anchor}
          >
            <text x={0} y={0} textAnchor={anchor} className="chart-icon">
              {w.icon}
            </text>
            {lines.map((line, i) => (
              <text
                key={line}
                x={0}
                y={20 + i * 15}
                textAnchor={anchor}
                className="chart-label"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
