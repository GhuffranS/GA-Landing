// Design-system primitives ported from the APC Solar Design System.
// Styling lives in globals.css (token-driven classes); these stay
// server-renderable — no client state needed for hover/focus.

export function Eyebrow({ onDark = false, className = "", children, ...rest }) {
  return (
    <div className={`apc-eyebrow ${onDark ? "apc-eyebrow--on-dark" : ""} ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function IconBadge({ name, size = "", className = "" }) {
  // Custom APC glyphs render black from the raw file — correct on the yellow badge.
  return (
    <span className={`apc-icon-badge ${size ? `apc-icon-badge--${size}` : ""} ${className}`}>
      <img src={`/icons/${name}.svg`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
    </span>
  );
}

export function ArrowRight({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function PhoneGlyph({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function WhatsAppGlyph({ size = 20, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color} aria-hidden="true" style={{ flex: "none" }}>
      <path d="M16.04 4C9.96 4 5.02 8.94 5.02 15.02c0 1.94.51 3.84 1.48 5.51L5 27l6.66-1.45a11.0 11.0 0 0 0 4.38.91h.01c6.08 0 11.02-4.94 11.02-11.02C27.06 8.94 22.12 4 16.04 4Zm0 19.84h-.01c-1.39 0-2.75-.37-3.94-1.08l-.28-.17-2.94.64.63-2.87-.18-.29a8.99 8.99 0 0 1-1.38-4.79c0-4.97 4.05-9.02 9.03-9.02 2.41 0 4.67.94 6.38 2.64a8.96 8.96 0 0 1 2.64 6.39c0 4.98-4.05 9.02-9.02 9.02Zm4.95-6.76c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.44-.46-.61-.46-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z" />
    </svg>
  );
}

export function ButtonLink({
  href,
  variant = "secondary", // primary | secondary | dark | light | whatsapp
  size = "md",           // sm | md | lg
  iconLeft = null,
  iconRight = null,
  className = "",
  children,
  ...rest
}) {
  return (
    <a
      href={href}
      className={`apc-btn apc-btn--${variant} ${size !== "md" ? `apc-btn--${size}` : ""} ${className}`}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </a>
  );
}

// The one full-saturation yellow element per zone — 56px, optional
// reassurance microcopy underneath.
export function PrimaryCTA({ href, sub = null, children, ...rest }) {
  const anchor = (
    <a href={href} className="apc-cta" {...rest}>
      {children}
    </a>
  );
  if (!sub) return anchor;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
      {anchor}
      <span className="apc-cta-sub">{sub}</span>
    </div>
  );
}

export function WhatsAppLink({ href, children = "Chat with us on WhatsApp", ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="apc-wa-link" {...rest}>
      <WhatsAppGlyph color="var(--whatsapp)" />
      {children}
    </a>
  );
}

export function WhatsAppFab({ href, label = "Chat on WhatsApp", ...rest }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="apc-wa-fab" aria-label={label} {...rest}>
      <WhatsAppGlyph size={30} />
    </a>
  );
}

export function StatBand({ stats = [], onDark = false }) {
  return (
    <div className={`stat-band ${onDark ? "stat-band--dark" : ""}`}>
      {stats.map((s) => (
        <div key={s.label}>
          <div className="stat-band__n">{s.value}</div>
          <div className="stat-band__l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function Steps({ steps = [] }) {
  return (
    <ol className="apc-steps">
      {steps.map((s, i) => (
        <li key={s.title}>
          <div className="apc-steps__disc">
            <span className="apc-steps__num">{i + 1}</span>
          </div>
          <div className="apc-steps__text">
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function FeatureCard({ icon, title, children }) {
  return (
    <div className="apc-feature-card">
      <IconBadge name={icon} />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Stars({ rating = 5, size = 16 }) {
  return (
    <div className="testi-stars" role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24"
          fill={n <= rating ? "var(--apc-yellow)" : "none"}
          stroke={n <= rating ? "var(--apc-yellow)" : "var(--border-strong)"}
          strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonial({ quote, name, location, rating = 5 }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <figure className="testi-card">
      <Stars rating={rating} />
      <blockquote>“{quote}”</blockquote>
      <figcaption>
        <span className="testi-avatar" aria-hidden="true">{initials}</span>
        <div>
          <div style={{ fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-sm)", color: "var(--text-strong)" }}>{name}</div>
          {location && <div style={{ fontSize: "var(--fs-xs)", color: "var(--text-muted)" }}>{location}</div>}
        </div>
      </figcaption>
    </figure>
  );
}
