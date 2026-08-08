import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "My Personal Experiences",
  description: "A founder's note on the experiences that led to TransparentChanges.",
  path: "/personal-experiences",
  index: false,
  follow: false,
});

export default function PersonalExperiencesPage() {
  return (
    <div className="pe-wrap">
      <h1>My Personal Experiences</h1>
      <p className="pe-intro">
        A few of the experiences that shaped why I started this. These are personal — I&apos;m
        sharing them because I think they&apos;re more common than most of us admit out loud.
      </p>

      <div className="pe-story">
        <div className="pe-story-num">Story One</div>
        <p>
          On my first job for the government, I finished the work three weeks ahead of schedule — I&apos;d
          preordered materials and had the remote site prepped and staged so I could start working
          the moment I arrived, saving on per diem and other travel costs that were ultimately
          funded by taxpayers.
        </p>
        <p>
          I came back early expecting to be praised for doing the job faster and more efficiently.
          Instead, my boss pulled me into his office and yelled at me for an hour about how I&apos;d
          screwed up his budget — if he didn&apos;t spend that money, he wouldn&apos;t get it again
          next year, and he wanted me to spend what he&apos;d planned, not save costs or time.
        </p>
        <p>
          I quit that week. I couldn&apos;t be part of something that looked down on efficiency,
          cost savings, and doing the work better.
        </p>
      </div>

      <div className="pe-story">
        <div className="pe-story-num">Story Two</div>
        <p>
          A friend and I started our own company and built a real-time scheduling system for
          automotive service centers — this was back in the early 2000s. It dynamically learned
          employee behavior and throughput, and estimated wait times based on which employee would
          actually be doing the work, so shops could get more done and customers didn&apos;t have to
          wait so long for repairs.
        </p>
        <p>
          We didn&apos;t know how to sell it, so we went store to store. Eventually a company in
          California heard about us and called, interested in buying us out. They loved the
          software — it was ahead of anything they&apos;d built in-house — but once they found out
          we were two recent college grads living in an apartment, they changed their mind. Within
          a month, they&apos;d sent reps to nearly every service center within driving distance of
          us, handing out free swag and talking themselves up, so that by the time we walked into a
          shop, people would ask if we were &quot;the same group.&quot; It tanked our sales.
        </p>
        <p>
          It was a good strategy on their part, if a bit dirty. We stopped the business after
          visiting nearly every store we could reach and hearing the same story each time. What I
          realized much later is that we never should have stopped — we should have found a
          different way to proceed.
        </p>
      </div>

      <div className="pe-story">
        <div className="pe-story-num">Story Three</div>
        <p>
          I went to work for a major airline — my dream job. Free travel, a great company,
          genuinely kind people who cared about the place. I was on a high-performing team that met
          or exceeded every deadline, until, after a year, an executive decided to buy a solution
          instead of letting us keep building one in-house. That wasn&apos;t our call. What was
          strange was what came next: instead of keeping a team that worked well together, they
          broke us up and scattered us across other teams — a management blunder, in my view. You
          don&apos;t split up a team that&apos;s playing well together any more than you&apos;d
          break up a winning sports team.
        </p>
        <p>
          A friend and I ended up on the same new team, brought in to improve the scan rate of a
          system that tracked mail moving through the airline&apos;s network. That mail had to be
          scanned at a required accuracy rate to be paid by USPS — tens of millions of dollars a
          year rode on it. The system had been built by a consulting firm whose head was brought in
          as the airline&apos;s CIO shortly after the purchase. The airline had paid millions for
          it, and its scan rate was far below the requirement. USPS was giving every underperforming
          carrier an extra year to hit the number before losing the contract.
        </p>
        <p>
          My friend and I nearly doubled the scan rate, but it still wasn&apos;t enough — the
          system&apos;s design and hardware were fundamentally too complicated, and required far
          more training than baggage handlers could reasonably absorb on top of their regular work.
          We realized it would never get there, so on our own time and our own dime, we got
          certified in RFID, and I designed and built a system that pinpointed packages through
          triangulation scanning, automatically, and it hit the required rate almost entirely on its
          own.
        </p>
        <p>
          We shared the results with our direct manager, who thought it was great. Then with the
          stakeholder in operations, who agreed. Word reached the CIO and our manager&apos;s
          manager, and they called a meeting. When we said all we wanted was to lead the team that
          would build it out — and that we&apos;d hand over everything we&apos;d built on our own
          time, since it belonged to us, not the airline — there was silence for a few days. Then
          the CIO, a former lawyer, had us served with legal documents claiming we&apos;d violated
          company intellectual property and privacy policy, that everything we&apos;d built belonged
          to the company, and that we needed to cease and desist or be fired.
        </p>
        <p>
          The same CIO, as head of the consulting firm, had sold the airline the original system
          for millions — and was the one telling the company that USPS was paying for 100% of the
          mail. That was technically true, but not because we were hitting the required scan rate;
          it was because USPS had granted a grace period to improve it. That distinction was being
          quietly left out.
        </p>
        <p>
          Their lawyer called us. We spoke, and the lawyer admitted they had no case — we&apos;d
          built technology that didn&apos;t exist anywhere else at the airline, so it couldn&apos;t
          be IP infringement, and it wasn&apos;t built for or patterned after anything the airline
          already had. The suit was dropped, and they couldn&apos;t fire us. We asked our manager for
          help; he was afraid, since his boss was friends with the CIO. We asked to meet with the
          CEO, who agreed — then cancelled the day before, saying that since our issue was with the
          CIO, we&apos;d need to resolve it with the CIO ourselves. Two employees being pushed out by
          a CIO, and HR wanted no part of it either. Same answer, every time: work it out with the
          CIO.
        </p>
        <p>
          We believe the CIO split us up after that. My friend, already a manager, was reassigned to
          report to someone he used to manage. I was moved to a team that barely touched software,
          under a manager with no technical background. My friend quit immediately. I stayed,
          stubbornly, for a few months, even though everyone told me the CIO was trying to force me
          out because he couldn&apos;t fire me any other way, and that he&apos;d never let anything
          good happen for me there. Eventually I handed in a 30-day notice. The CIO offered to pay
          it out if I left that same day. I did.
        </p>
        <p>
          The title gave him the power, and the company did nothing to protect us. Ironically, they
          lost the mail contract — and the revenue that came with it — not long after.
        </p>
      </div>

      <div className="pe-reflection">
        <div className="pe-story-num">One more thing</div>
        <p>
          There are many more stories like these — mine, and ones I know other people have lived
          through. We&apos;ve largely accepted them as &quot;well, what can you do about it,&quot;
          and just lived with it.
        </p>
        <p>
          We hear that AI won&apos;t replace human jobs, while layoffs keep happening because of it.
          We&apos;ve accepted that we have no way to change our future. I don&apos;t believe that. I
          hope you don&apos;t either.
        </p>
        <p>
          I started this because I can&apos;t do this alone — not even close. That&apos;s the
          greatest lesson every one of these experiences taught me: to actually succeed, you have to
          work together, with people who share the same goals and mindset, and you have to be
          willing to work through the hard parts, supporting each other the whole way.
        </p>
      </div>
    </div>
  );
}
