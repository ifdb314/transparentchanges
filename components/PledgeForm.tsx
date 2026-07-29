"use client";

import { useState } from "react";
import { trackFoundingCirclePledge } from "@/components/Analytics";

type PledgeType = "money" | "word" | "volunteer" | "employee";

const TYPE_LABELS: Record<PledgeType, string> = {
  money: "Pledge money",
  word: "Spread the word",
  volunteer: "Volunteer to help",
  employee: "Offer to be an employee",
};

export function PledgeForm() {
  const [pledgeType, setPledgeType] = useState<PledgeType>("money");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [helpText, setHelpText] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const needsHelpText = pledgeType === "volunteer" || pledgeType === "employee";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      setStatus("success");
      setName("");
      setLocation("");
      setAmount("");
      setHelpText("");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="fc-note success">
        You&apos;re in. Thank you — we&apos;ll be in touch as the Founding Circle grows.
      </div>
    );
  }

  return (
    <form className="fc-form" onSubmit={handleSubmit}>
      <div className="fc-type-row" role="group" aria-label="Pledge type">
        {(Object.keys(TYPE_LABELS) as PledgeType[]).map((t) => (
          <button
            type="button"
            key={t}
            className="fc-type-btn"
            aria-pressed={pledgeType === t}
            onClick={() => setPledgeType(t)}
          >
            {TYPE_LABELS[t]}
          </button>
        ))}
      </div>

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
          <label htmlFor="pledgeLocation">State / country</label>
          <input
            id="pledgeLocation"
            required
            maxLength={200}
            placeholder="e.g. CO"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
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

      {status === "error" && <div className="fc-note error">{errorMessage}</div>}

      <button type="submit" className="btn" disabled={status === "submitting"} style={{ justifySelf: "start" }}>
        {status === "submitting" ? "Joining…" : "Join the Founding Circle"}
      </button>
    </form>
  );
}
