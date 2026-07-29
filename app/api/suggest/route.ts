import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const industry = String(body.industry || "").trim();
  const whyNeeded = String(body.whyNeeded || "").trim();
  const name = String(body.name || "").trim();
  const location = String(body.location || "").trim();

  if (!industry || industry.length > 200) {
    return NextResponse.json({ error: "Tell us the industry or company idea." }, { status: 400 });
  }
  if (!whyNeeded || whyNeeded.length > 2000) {
    return NextResponse.json({ error: "Tell us why it's needed." }, { status: 400 });
  }
  if (!name || !location) {
    return NextResponse.json({ error: "Your name and state/country are required." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { error } = await supabase.from("industry_suggestions").insert({
    industry,
    why_needed: whyNeeded,
    name,
    location,
  });

  if (error) {
    console.error("industry_suggestions insert failed", error);
    return NextResponse.json(
      { error: "Something went wrong submitting your idea. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
