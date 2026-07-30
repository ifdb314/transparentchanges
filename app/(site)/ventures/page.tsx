import type { Metadata } from "next";
import { UpvoteButton } from "@/components/UpvoteButton";
import { SuggestForm } from "@/components/SuggestForm";
import { VENTURES } from "@/lib/ventures";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ventures",
  description: "Vote for what we build next — one vote per person, per venture.",
};

export default async function VenturesPage() {
  const supabase = supabaseAdmin();
  const [{ data: ventureVotes }, { data: suggestions }] = await Promise.all([
    supabase.from("ventures").select("slug, votes").order("votes", { ascending: false }),
    supabase
      .from("industry_suggestions")
      .select("id, industry, name, location, votes")
      .order("votes", { ascending: false })
      .limit(6),
  ]);

  const voteMap = new Map((ventureVotes || []).map((v) => [v.slug, v.votes]));
  const sortedVentures = [...VENTURES].sort(
    (a, b) => (voteMap.get(b.slug) || 0) - (voteMap.get(a.slug) || 0)
  );

  return (
    <>
      <div
        className="photo-band"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(16,40,31,0.1), rgba(16,40,31,0.8)), url('/images/produce.jpg')",
        }}
      >
        <div className="photo-band-text">
          <p>Vote for what we build next.</p>
        </div>
      </div>

      <section className="band">
        <div className="band-head">
          <div className="band-eyebrow">One vote per person, per venture</div>
          <h2>Every industry here started as a vote.</h2>
        </div>
        <div className="vote-grid-site">
          {sortedVentures.map((v) => (
            <div className="vote-card-site" key={v.slug}>
              <div className="vote-photo" style={{ backgroundImage: `url('${v.photo}')` }} />
              <div className="vote-body">
                <h3>{v.name}</h3>
                <p>{v.cardDescription}</p>
                <UpvoteButton slug={v.slug} initialVotes={voteMap.get(v.slug) || 0} />
              </div>
            </div>
          ))}

          {(suggestions || []).map((s) => (
            <div className="vote-card-site submitted" key={s.id}>
              <div className="vote-body">
                <div className="tag-submitted-site">Community submitted</div>
                <h3>{s.industry}</h3>
                <p>
                  Submitted by {s.name} — {s.location}
                </p>
                <UpvoteButton slug={s.id} initialVotes={s.votes} />
              </div>
            </div>
          ))}
        </div>

        <SuggestForm />
      </section>
    </>
  );
}
