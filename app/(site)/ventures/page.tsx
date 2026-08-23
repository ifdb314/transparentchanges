import Link from "next/link";
import { UpvoteButton } from "@/components/UpvoteButton";
import { SuggestForm } from "@/components/SuggestForm";
import { VENTURES } from "@/lib/ventures";
import { supabaseAdmin } from "@/lib/supabase";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Ventures",
  description: "Vote for what we change next — one vote per person, per venture.",
  path: "/ventures",
  image: "/images/produce.jpg",
});

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
      <div className="photo-band">
        <img src="/images/produce.jpg" alt="Fresh produce, representing the industries TransparentChanges ventures into" className="photo-band-bg" />
        <div
          className="photo-band-overlay"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(16,40,31,0.1), rgba(16,40,31,0.8))" }}
        />
        <div className="photo-band-text">
          <p>Tell us what needs to change so that we can fix the most in-demand areas first.</p>
          <small>Every venture starts with demand.</small>
        </div>
      </div>

      <section className="band">
        <div className="band-head">
          <div className="band-eyebrow">One vote per person, per venture</div>
          <h2>Vote for what we change next.</h2>
          <p>
            See problem industries people have suggested, or suggest a new one.
          </p>
          <p>
            Once we&apos;ve gathered enough people and resources behind us, the industries with
            the most votes are what we&apos;ll look to build the right way, first. So after you
            vote, make sure to help{" "}
            <Link href="/founding-circle" style={{ color: "var(--accent)" }}>
              support the mission
            </Link>{" "}
            — that&apos;s what actually brings these ventures to life.
          </p>
        </div>
        <div className="vote-grid-site">
          {sortedVentures.map((v) => (
            <div className="vote-card-site" key={v.slug}>
              <img src={v.photo} alt={`${v.name} venture`} className="vote-photo" />
              <div className="vote-body">
                <h3>{v.name}</h3>
                <p>{v.cardDescription}</p>
                <UpvoteButton slug={v.slug} initialVotes={voteMap.get(v.slug) || 0} />
              </div>
            </div>
          ))}

          {(suggestions || []).map((s) => (
            <div className="vote-card-site submitted" key={s.id}>
              <div className="vote-photo-placeholder">
                <span className="name">{s.name}</span>
                <span className="state">{s.location}</span>
              </div>
              <div className="vote-body">
                <div className="tag-submitted-site">Community submitted</div>
                <h3>{s.industry}</h3>
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
