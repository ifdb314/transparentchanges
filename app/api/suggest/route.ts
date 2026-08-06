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

  if (!industry || industry.length > 35) {
    return NextResponse.json(
      { error: "Industry or company idea must be 35 characters or fewer." },
      { status: 400 }
    );
  }
  if (!whyNeeded || whyNeeded.length > 200) {
    return NextResponse.json(
      { error: "Tell us why it's needed, in 200 characters or fewer." },
      { status: 400 }
    );
  }
  if (!name || !location) {
    return NextResponse.json({ error: "Your name and state are required." }, { status: 400 });
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
