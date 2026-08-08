"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "What you do makes a difference, and you have to decide what kind of difference you want to make.",
    author: "Jane Goodall",
  },
  {
    text: "The best way to predict your future is to create it.",
    author: "Abraham Lincoln",
  },
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "Tomorrow is created by what you do today, not tomorrow.",
    author: "Robert Kiyosaki",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
];

export function QuoteCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="quote-carousel">
      <div className="quote-slides">
        {QUOTES.map((q, i) => (
          <blockquote key={q.author} className={`quote-slide${i === index ? " active" : ""}`}>
            <p>&ldquo;{q.text}&rdquo;</p>
            <cite>— {q.author}</cite>
          </blockquote>
        ))}
      </div>
      <div className="quote-dots">
        {QUOTES.map((q, i) => (
          <span key={q.author} className={`quote-dot${i === index ? " active" : ""}`} aria-hidden="true" />
        ))}
      </div>
    </div>
  );
}
