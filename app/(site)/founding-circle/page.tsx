import type { Metadata } from "next";
import { PledgeForm } from "@/components/PledgeForm";
import { FoundingCircleDisplay } from "@/components/FoundingCircleDisplay";
import { getFoundingCircleData } from "@/lib/foundingCircle";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Founding Circle",
  description: "Add your name to the Founding Circle — money, your voice, or your labor. $0 required.",
};

export default async function FoundingCirclePage() {
  const data = await getFoundingCircleData();

  return (
    <>
      <div
        className="photo-band"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(16,40,31,0.1), rgba(16,40,31,0.8)), url('/images/volunteers.jpg')",
        }}
      >
        <div className="photo-band-text">
          <p>Every name here is someone who said yes.</p>
        </div>
      </div>

      <section className="band">
        <div className="band-head">
          <div className="band-eyebrow">No card required</div>
          <h2>Help in any way you wish.</h2>
          <small>
            It takes people, experience, money, employees and moral support to make each company
            a success.
          </small>
        </div>
        <div className="fc-grid">
          <PledgeForm />
          <FoundingCircleDisplay
            totalPeople={data.totalPeople}
            totalMoneyCents={data.totalMoneyCents}
            recent={data.recent}
          />
        </div>
      </section>
    </>
  );
}
