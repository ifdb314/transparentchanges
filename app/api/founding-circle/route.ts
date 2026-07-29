import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const VALID_TYPES = ["money", "word", "volunteer", "employee"] as const;
type PledgeType = (typeof VALID_TYPES)[number];

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const pledgeType = String(body.pledgeType || "");
  const name = String(body.name || "").trim();
  const location = String(body.location || "").trim();
  const amount = body.amount != null ? Number(body.amount) : null;
  const helpText = body.helpText ? String(body.helpText).trim().slice(0, 2000) : null;

  if (!VALID_TYPES.includes(pledgeType as PledgeType)) {
    return NextResponse.json({ error: "Pick a valid pledge type." }, { status: 400 });
  }
  if (!name || name.length > 200) {
    return NextResponse.json({ error: "Your name is required." }, { status: 400 });
  }
  if (!location || location.length > 200) {
    return NextResponse.json({ error: "State or country is required." }, { status: 400 });
  }
  if (pledgeType === "money") {
    if (!amount || Number.isNaN(amount) || amount < 5) {
      return NextResponse.json(
        { error: "Pledges start at $5." },
        { status: 400 }
      );
    }
  }
  if ((pledgeType === "volunteer" || pledgeType === "employee") && !helpText) {
    return NextResponse.json(
      { error: "Tell us how you can help and what you can do." },
      { status: 400 }
    );
  }

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("founding_circle_entries").insert({
    pledge_type: pledgeType,
    name,
    location,
    amount_cents: pledgeType === "money" && amount ? Math.round(amount * 100) : null,
    help_text: helpText,
    source_page: request.headers.get("referer") || null,
    user_agent: request.headers.get("user-agent") || null,
  });

  if (error) {
    console.error("founding_circle_entries insert failed", error);
    return NextResponse.json(
      { error: "Something went wrong saving your pledge. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
