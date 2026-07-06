import { NAP } from "@/lib/site";
import { ButtonLink, PhoneGlyph } from "@/components/ds/primitives";

function MailGlyph({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,6.5 12,13.5 22,6.5" />
    </svg>
  );
}

function PinGlyph({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="apc-container topbar__inner">
          <a className="topbar__link" href={`mailto:${NAP.email}`}>
            <MailGlyph />
            {NAP.email}
          </a>
          <span className="topbar__sep" />
          <a className="topbar__link" href={NAP.phoneHref}>
            <PhoneGlyph size={12} />
            {NAP.phoneIntl}
          </a>
          <span className="topbar__sep topbar__addr" />
          <span className="topbar__link topbar__addr" style={{ cursor: "default" }}>
            <PinGlyph />
            {NAP.address}
          </span>
        </div>
      </div>
      <div className="apc-container site-header__inner">
        <a href="#top" className="site-header__lockup" aria-label="APC Solar home">
          {/* Plain <img>, lazy: the SVG is already vector, so next/image added
              nothing but a high-priority preload that competed with the LCP
              hero. lazy suppresses that auto-preload; the logo still paints fast
              because it's in the initial viewport. alt="" — the wordmark beside
              it carries the brand name. */}
          <img src="/logos/apc-logo.svg" alt="" width="44" height="44" loading="lazy" decoding="async" />
          <span>
            <span className="site-header__wordmark">APC Solar</span>
            <span className="site-header__tag">Karachi&apos;s solar experts</span>
          </span>
        </a>
        <div className="site-header__actions">
          <ButtonLink href={NAP.phoneHref} variant="dark" iconLeft={<PhoneGlyph size={16} />} data-track="call_click">
            {NAP.phoneDisplay}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
