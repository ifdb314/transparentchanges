import { PledgeForm } from "@/components/PledgeForm";
import { FoundingCircleDisplay } from "@/components/FoundingCircleDisplay";
import { getFoundingCircleData } from "@/lib/foundingCircle";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Founding Circle",
  description: "Add your name to the Founding Circle — money, your voice, or your labor. $0 required.",
  path: "/founding-circle",
  image: "/images/volunteers.jpg",
});

export default async function FoundingCirclePage() {
  const data = await getFoundingCircleData();

  return (
    <>
      <div className="photo-band">
        <img
          src="/images/volunteers.jpg"
          alt="Volunteers working together"
          className="photo-band-bg"
        />
        <div
          className="photo-band-overlay"
          style={{ backgroundImage: "linear-gradient(180deg, rgba(16,40,31,0.1), rgba(16,40,31,0.8))" }}
        />
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
