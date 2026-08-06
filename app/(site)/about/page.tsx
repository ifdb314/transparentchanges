import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "A note from the founder on why this exists and why it can't be done alone.",
};

export default function AboutPage() {
  return (
    <div className="about-wrap">
      <div className="about-mark">JJ</div>
      <div className="stamp" style={{ marginBottom: 16 }}>
        A note from a founder
      </div>
      <h1>My name is Justin Jose, but who I am is less important than who we can all be together.</h1>
      <p>
        I&apos;m simply a husband, father, brother, and son who works a typical job and wants to
        make a real difference in the world — but can&apos;t do it alone.
      </p>
      <p>
        I believe that together we can force real change, one industry, one venture at a time.
        And with our work in each area, it will push other companies in that space to be better —
        to treat their employees better, treat their customers better, stop chasing the bottom
        line, and start making it about leaving a positive impact on the world and a better future
        for tomorrow.
      </p>
      <div className="about-sign">— Justin</div>
      <Link href="/founding-circle" className="btn" style={{ marginTop: 30, display: "inline-block" }}>
        Join the Founding Circle
      </Link>
      <br />
      <Link href="/personal-experiences" className="about-quiet-link">
        Read my personal experiences on why I&apos;m doing this
      </Link>
    </div>
  );
}
