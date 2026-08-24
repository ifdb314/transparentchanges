"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackFoundingCirclePledge } from "@/components/Analytics";
import { ShareWidget } from "@/components/ShareWidget";
import { usePledgeType, type PledgeType } from "@/components/PledgeTypeContext";
import { US_STATES } from "@/lib/usStates";

const TYPE_LABELS: Record<PledgeType, string> = {
  money: "Pledge money",
  word: "Spread the word",
  volunteer: "Volunteer to help",
  employee: "Offer to be an employee",
};

export function PledgeForm() {
  const router = useRouter();
  const { pledgeType, setPledgeType } = usePledgeType();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [helpText, setHelpText] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const needsHelpText = pledgeType === "volunteer" || pledgeType === "employee";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pledgeType) return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/founding-circle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pledgeType,
          name,
          location,
          email,
          amount: pledgeType === "money" ? amount : undefined,
          helpText: needsHelpText ? helpText : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      trackFoundingCirclePledge(pledgeType);
      router.push("/founding-circle/thank-you");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <form className="fc-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pledgeType">How would you like to help?</label>
        <select
          id="pledgeType"
          required
          value={pledgeType}
          onChange={(e) => setPledgeType(e.target.value as PledgeType)}
        >
          <option value="" disabled>
            Please choose a way to help
          </option>
          {(Object.keys(TYPE_LABELS) as PledgeType[]).map((t) => (
            <option key={t} value={t}>
              {TYPE_LABELS[t]}
            </option>
          ))}
        </select>
      </div>

      {pledgeType === "" ? (
        <div className="fc-note success">
          We truly need your help… in any way you&apos;re willing to help!
        </div>
      ) : (
        <>
          <div className="fc-row-2">
            <div>
              <label htmlFor="pledgeName">Your name</label>
              <input
                id="pledgeName"
                required
                maxLength={200}
                placeholder="First name, last initial"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pledgeLocation">State</label>
              <select
                id="pledgeLocation"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" disabled>
                  Select your state
                </option>
                {US_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="pledgeEmail">Email address</label>
            <input
              id="pledgeEmail"
              required
              type="email"
              maxLength={320}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="privacy-note">
              We&apos;ll never sell, spam, or share your email — it&apos;s only used to keep you
              updated on Founding Circle status and important news.
            </p>
          </div>

          {pledgeType === "money" && (
            <div>
              <label htmlFor="pledgeAmount">Amount ($5 minimum)</label>
              <input
                id="pledgeAmount"
                required
                type="number"
                min={5}
                step="1"
                placeholder="$5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          )}

          {needsHelpText && (
            <div>
              <label htmlFor="pledgeHelp">How can you help, and what can you do?</label>
              <textarea
                id="pledgeHelp"
                required
                placeholder="Tell us your skills, trade, or the role you're picturing."
                value={helpText}
                onChange={(e) => setHelpText(e.target.value)}
              />
            </div>
          )}
        </>
      )}

      {status === "error" && <div className="fc-note error">{errorMessage}</div>}

      <button
        type="submit"
        className="btn"
        disabled={status === "submitting" || pledgeType === ""}
        style={{ justifySelf: "start" }}
      >
        {status === "submitting" ? "Joining…" : "Join our Mission"}
      </button>

      <div className="share-section">
        <div className="share-section-label">Share with others</div>
        <ShareWidget />
      </div>
    </form>
  );
}
