import { PledgeForm } from "@/components/PledgeForm";
import { FoundingCircleDisplay } from "@/components/FoundingCircleDisplay";
import { PledgeTypeProvider } from "@/components/PledgeTypeContext";
import { NoPaymentBadge } from "@/components/NoPaymentBadge";
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
          <p>
            Our mission is to build &quot;ideal&quot; companies one at a time that make working a
            pleasure, providing to the community a priority, improving our planet a must, and
            that promote honesty and transparency for all as the defacto standard.
          </p>
          <small>*Every name here is someone who said yes.</small>
        </div>
      </div>

      <PledgeTypeProvider>
        <section className="band">
          <div className="band-head">
            <NoPaymentBadge />
            <h2>Help in any way you wish.</h2>
            <small>
              It takes people, experience, money, support from the community, and more to make
              each company a success.
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
      </PledgeTypeProvider>
    </>
  );
}
