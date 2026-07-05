"use client";

import { useState } from "react";

function FAQItem({ question, answer, open, onToggle }) {
  return (
    <div className="faq-item" data-open={open}>
      <button type="button" className="faq-item__q" onClick={onToggle} aria-expanded={open}>
        <span style={{ textWrap: "balance" }}>{question}</span>
        <span className="apc-icon-badge apc-icon-badge--sm" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-900)" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div className="faq-item__a">
        <div className="faq-item__a-clip">
          <p className="faq-item__a-body">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <div style={{ borderTop: "1px solid var(--border-default)" }}>
      {items.map((it, i) => (
        <FAQItem
          key={it.question}
          question={it.question}
          answer={it.answer}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
