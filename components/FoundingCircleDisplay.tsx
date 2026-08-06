"use client";

import { geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import usTopology from "us-atlas/states-albers-10m.json";
import { FIPS_TO_USPS } from "@/lib/usStatesFips";
import { jitterFromId, REVEAL_THRESHOLD_CENTS, type PledgeRow } from "@/lib/foundingCircle";

// All of this is static, published geographic data — computed once at module load rather
// than per-render, and shared by every instance of the component.
const US_VIEWBOX = "-70 -5 1040 625";
const usPathGen = geoPath();
const usFeatureCollection = feature(
  usTopology as unknown as Topology,
  (usTopology as unknown as Topology).objects.states as GeometryCollection
) as unknown as GeoJSON.FeatureCollection;
const US_STATE_PATHS = usFeatureCollection.features.map((f) => ({
  id: String(f.id),
  name: (f.properties as { name: string })?.name,
  d: usPathGen(f) || "",
}));
const US_STATE_CENTROIDS: Record<string, [number, number]> = {};
for (const f of usFeatureCollection.features) {
  const usps = FIPS_TO_USPS[String(f.id)];
  if (usps) US_STATE_CENTROIDS[usps] = usPathGen.centroid(f);
}

export function FoundingCircleDisplay({
  totalPeople,
  totalMoneyCents,
  recent,
}: {
  totalPeople: number;
  totalMoneyCents: number;
  recent: PledgeRow[];
}) {
  const revealed = totalMoneyCents >= REVEAL_THRESHOLD_CENTS;
  const dollars = (totalMoneyCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return (
    <div>
      <div className="counter-line">
        {revealed ? (
          <>
            <b>{dollars}</b> pledged by <b style={{ fontSize: "1rem" }}>{totalPeople}</b>{" "}
            {totalPeople === 1 ? "person" : "people"}
          </>
        ) : (
          <>
            <b>{totalPeople}</b> {totalPeople === 1 ? "person believes" : "people believe"} in
            this so far
          </>
        )}
      </div>

      <div className="us-map-wrap">
        <svg viewBox={US_VIEWBOX} preserveAspectRatio="xMidYMid meet">
          {US_STATE_PATHS.map((s) => (
            <path key={s.id} className="state-shape" d={s.d}>
              <title>{s.name}</title>
            </path>
          ))}
        </svg>
        {recent.map((entry) => {
          const code = entry.location.trim().toUpperCase();
          const centroid = US_STATE_CENTROIDS[code];
          if (!centroid) return null;
          const { dx, dy } = jitterFromId(entry.id);
          const [cx, cy] = centroid;
          const leftPct = ((cx + dx + 70) / 1040) * 100;
          const topPct = ((cy + dy + 5) / 625) * 100;
          return (
            <div
              key={entry.id}
              className="star"
              style={{ top: `${topPct}%`, left: `${leftPct}%` }}
              data-label={`${entry.name} — ${entry.location}`}
              tabIndex={0}
            />
          );
        })}
      </div>
      {recent.length === 0 && (
        <p style={{ marginTop: 12, fontSize: "0.82rem" }}>No pledges yet — be the first.</p>
      )}
      <p style={{ marginTop: 14, fontSize: "0.82rem" }}>
        Every point is the same size, no matter what was pledged. Placed at the pledger&apos;s
        state, with a small offset so nearby names don&apos;t overlap.
      </p>
    </div>
  );
}
