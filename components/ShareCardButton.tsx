"use client";

import { useState } from "react";

export function ShareCardButton({ anchor }: { anchor: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard access can fail silently (permissions, insecure context) — no need to surface an error
    }
  }

  return (
    <button type="button" className="tshare tshare-btn" onClick={handleClick}>
      {copied ? "Link copied ✓" : "Share this ↗"}
    </button>
  );
}
