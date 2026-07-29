import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = supabaseAdmin();

  // Try the official ventures table first, then fall back to a
  // community-submitted suggestion (matched by its row id passed as slug).
  const { data: venture, error: fetchError } = await supabase
    .from("ventures")
    .select("slug, votes")
    .eq("slug", slug)
    .maybeSingle();

  if (fetchError) {
    console.error("upvote lookup failed", fetchError);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  if (venture) {
    const { data, error } = await supabase
      .from("ventures")
      .update({ votes: venture.votes + 1 })
      .eq("slug", slug)
      .select("votes")
      .single();

    if (error) {
      console.error("venture upvote failed", error);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
    return NextResponse.json({ ok: true, votes: data.votes });
  }

  const { data: suggestion, error: suggestionFetchError } = await supabase
    .from("industry_suggestions")
    .select("id, votes")
    .eq("id", slug)
    .maybeSingle();

  if (suggestionFetchError || !suggestion) {
    return NextResponse.json({ error: "Venture not found." }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("industry_suggestions")
    .update({ votes: suggestion.votes + 1 })
    .eq("id", slug)
    .select("votes")
    .single();

  if (error) {
    console.error("suggestion upvote failed", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, votes: data.votes });
}
