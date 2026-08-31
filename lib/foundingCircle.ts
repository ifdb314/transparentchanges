import { supabaseAdmin } from "@/lib/supabase";

export type PledgeRow = {
  id: string;
  name: string;
  location: string;
  pledge_type: string;
  created_at: string;
};

export type FoundingCircleData = {
  totalPeople: number;
  totalMoneyCents: number;
  recent: PledgeRow[];
};

/** Reveal rule: below $25,000 pledged, only the headcount is public. */
export const REVEAL_THRESHOLD_CENTS = 2500000;

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Offsets for `count` markers sharing one state centroid, spiraling outward (Vogel/sunflower
 * packing) so spacing between any two markers strictly grows with count — unlike a random
 * per-id jitter, two markers can never land close enough to hide one another.
 */
export function stateMarkerOffsets(count: number, spacing = 13): { dx: number; dy: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = i * GOLDEN_ANGLE;
    const dist = spacing * Math.sqrt(i);
    return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist };
  });
}

const AVATAR_COLORS = [
  "var(--accent)",
  "var(--forest)",
  "var(--gold-deep)",
  "var(--accent-deep)",
  "var(--forest-soft)",
];

/** "Maria T." -> "MT", "Justin J" -> "JJ", single word -> first letter. */
export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/** Deterministic color from the palette so the same name always gets the same bubble color. */
export function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export async function getFoundingCircleData(): Promise<FoundingCircleData> {
  const supabase = supabaseAdmin();

  const [{ count }, { data: moneyRows }, { data: recent }] = await Promise.all([
    supabase.from("founding_circle_entries").select("id", { count: "exact", head: true }),
    supabase.from("founding_circle_entries").select("amount_cents").eq("pledge_type", "money"),
    supabase
      .from("founding_circle_entries")
      .select("id, name, location, pledge_type, created_at")
      .order("created_at", { ascending: false })
      .limit(24),
  ]);

  const totalMoneyCents = (moneyRows || []).reduce(
    (sum, row) => sum + (row.amount_cents || 0),
    0
  );

  return {
    totalPeople: count || 0,
    totalMoneyCents,
    recent: recent || [],
  };
}
