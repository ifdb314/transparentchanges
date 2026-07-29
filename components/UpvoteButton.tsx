"use client";

import { useState } from "react";

export function UpvoteButton({ slug, initialVotes }: { slug: string; initialVotes: number }) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(false);
  const [pending, setPending] = useState(false);
  const storageKey = `tc-upvoted-${slug}`;

  // Reflect prior votes from this browser without needing an account.
  useState(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(storageKey)) {
      setVoted(true);
    }
  });

  async function handleClick() {
    if (voted || pending) return;
    setPending(true);
    try {
      const res = await fetch(`/api/ventures/${slug}/upvote`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setVotes(data.votes);
        setVoted(true);
        window.localStorage.setItem(storageKey, "1");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="vfoot-site">
      <button
        type="button"
        className="upvote-btn-site"
        onClick={handleClick}
        disabled={voted || pending}
      >
        <span className="arrow">▲</span> {voted ? "Upvoted" : "Upvote"}
      </button>
      <span className="upvote-count-site">{votes} votes</span>
    </div>
  );
}
