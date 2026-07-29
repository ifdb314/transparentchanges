"use client";

import { useState } from "react";
import {
  isUsLocation,
  positionFromId,
  REVEAL_THRESHOLD_CENTS,
  type PledgeRow,
} from "@/lib/foundingCircle";

export function FoundingCircleDisplay({
  totalPeople,
  totalMoneyCents,
  recent,
}: {
  totalPeople: number;
  totalMoneyCents: number;
  recent: PledgeRow[];
}) {
  const [scope, setScope] = useState<"us" | "world">("us");

  const revealed = totalMoneyCents >= REVEAL_THRESHOLD_CENTS;
  const dollars = (totalMoneyCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const usEntries = recent.filter((r) => isUsLocation(r.location));
  const worldEntries = recent.filter((r) => !isUsLocation(r.location));
  const shown = scope === "us" ? usEntries : worldEntries;

  return (
    <div>
      <div className="counter-line">
        {revealed ? (
          <>
            <b>{dollars}</b> pledged by <b style={{ fontSize: "1rem" }}>{totalPeople}</b> people
          </>
        ) : (
          <>
            <b>{totalPeople}</b> {totalPeople === 1 ? "person believes" : "people believe"} in
            this so far
          </>
        )}
      </div>

      <div className="toggle-row">
        <button
          type="button"
          className="ctoggle-btn"
          aria-pressed={scope === "us"}
          onClick={() => setScope("us")}
        >
          United States
        </button>
        <button
          type="button"
          className="ctoggle-btn"
          aria-pressed={scope === "world"}
          onClick={() => setScope("world")}
        >
          World
        </button>
      </div>

      <div className="us-map-wrap">
        <svg viewBox="0 0 960 600" preserveAspectRatio="xMidYMid meet">
          <polygon
            className="us-shape"
            points="68,60 56,95 50,150 46,220 48,270 58,290 78,335 110,370 175,362 230,385 270,382 300,392 318,420 330,445 350,460 330,510 355,530 400,472 430,505 490,515 540,500 580,490 630,495 650,540 660,585 680,545 700,485 715,450 740,420 730,400 745,375 760,345 780,320 800,295 825,270 805,250 835,220 820,170 760,150 690,140 620,145 560,130 500,120 440,110 380,105 320,100 260,95 200,90 140,80"
          />
        </svg>
        {shown.map((entry) => {
          const { top, left } = positionFromId(entry.id);
          return (
            <div
              key={entry.id}
              className="star"
              style={{ top: `${top}%`, left: `${left}%` }}
              data-label={`${entry.name} — ${entry.location}`}
              tabIndex={0}
            />
          );
        })}
      </div>
      {shown.length === 0 && (
        <p style={{ marginTop: 12, fontSize: "0.82rem" }}>
          {scope === "us"
            ? "No pledges from the U.S. yet — be the first."
            : "No pledges from outside the U.S. yet — be the first."}
        </p>
      )}
      <p style={{ marginTop: 14, fontSize: "0.82rem" }}>
        Every point is the same size, no matter what was pledged. Positions are illustrative, not
        exact geography.
      </p>
    </div>
  );
}
