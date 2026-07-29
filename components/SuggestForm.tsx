"use client";

import { useState } from "react";

export function SuggestForm() {
  const [industry, setIndustry] = useState("");
  const [whyNeeded, setWhyNeeded] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, whyNeeded, name, location }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setIndustry("");
      setWhyNeeded("");
      setName("");
      setLocation("");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div id="suggest" className="suggest-box">
        <div className="fc-note success">
          Thanks — your idea is in. It&apos;ll show up on the venture list once we refresh it.
        </div>
      </div>
    );
  }

  return (
    <form id="suggest" className="suggest-box" onSubmit={handleSubmit}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.76rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-faint)" }}>
        Suggest an industry
      </div>
      <div>
        <label htmlFor="sugIndustry">Industry or company idea</label>
        <input
          id="sugIndustry"
          required
          maxLength={200}
          placeholder="e.g. Cell phone plans"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="sugWhy">Why does it need this?</label>
        <textarea
          id="sugWhy"
          required
          placeholder="Two sentences on the problem and who it hurts most."
          value={whyNeeded}
          onChange={(e) => setWhyNeeded(e.target.value)}
        />
      </div>
      <div className="fc-row-2">
        <div>
          <label htmlFor="sugName">Your name</label>
          <input
            id="sugName"
            required
            maxLength={200}
            placeholder="First name, last initial"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sugLocation">State / country</label>
          <input
            id="sugLocation"
            required
            maxLength={200}
            placeholder="e.g. CO"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      {status === "error" && <div className="fc-note error">{errorMessage}</div>}
      <button type="submit" className="btn" disabled={status === "submitting"} style={{ justifySelf: "start" }}>
        {status === "submitting" ? "Submitting…" : "Submit idea"}
      </button>
    </form>
  );
}
