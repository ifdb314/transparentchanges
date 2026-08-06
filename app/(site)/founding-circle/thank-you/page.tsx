import type { Metadata } from "next";
import Link from "next/link";
import { FoundingCircleDisplay } from "@/components/FoundingCircleDisplay";
import { ShareWidget } from "@/components/ShareWidget";
import { getFoundingCircleData } from "@/lib/foundingCircle";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for joining the Founding Circle.",
  robots: { index: false, follow: true },
};

export default async function FoundingCircleThankYouPage() {
  const data = await getFoundingCircleData();

  return (
    <section className="band">
      <div className="band-head">
        <div className="band-eyebrow">You&apos;re in</div>
        <h2>Thank you for helping.</h2>
      </div>
      <div className="fc-grid">
        <div>
          <div className="fc-note success">
            Together we can make a difference, together we are strong. We&apos;ll be in touch
            shortly and as the Founding Circle grows. Meanwhile please try and help us spread the
            word as much as possible.
          </div>
          <div className="share-section">
            <div className="share-section-label">Share with others</div>
            <ShareWidget />
          </div>
          <Link href="/founding-circle" className="about-quiet-link" style={{ marginTop: 20 }}>
            ← Back to the Founding Circle
          </Link>
        </div>
        <FoundingCircleDisplay
          totalPeople={data.totalPeople}
          totalMoneyCents={data.totalMoneyCents}
          recent={data.recent}
        />
      </div>
    </section>
  );
}
