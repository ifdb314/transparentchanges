import { supabaseAdmin } from "@/lib/supabase";

const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
]);

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

/** Reveal rule: below $5,000 pledged, only the headcount is public. */
export const REVEAL_THRESHOLD_CENTS = 500000;

export function isUsLocation(location: string): boolean {
  return US_STATES.has(location.trim().toUpperCase());
}

/** Deterministic pseudo-random position (10%-90%) derived from a row's id, so placement is stable across renders. */
export function positionFromId(id: string): { top: number; left: number } {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const top = 12 + (hash % 76); // 12–88
  const left = 12 + ((hash >> 8) % 76); // 12–88
  return { top, left };
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
