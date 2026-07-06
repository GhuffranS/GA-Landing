import { NAP, HERO_STATS } from "@/lib/site";
import { Eyebrow, PrimaryCTA, ButtonLink, PhoneGlyph, WhatsAppGlyph } from "@/components/ds/primitives";

export default function Hero() {
  return (
    <section className="hero-bleed" id="top">
      <div className="hero-bleed__bg">
        {/* Art-directed hero photo: portrait on mobile, wide on desktop */}
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/hero-portrait.webp" />
          <img
            src="/images/hero.webp"
            alt="APC Solar hybrid solar installation in Karachi"
            className="hero-bleed__img"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-bleed__scrim" />
      </div>
      <div className="apc-container hero-bleed__content">
        <div className="hero-bleed__max">
          <Eyebrow onDark>Solar installation company in Karachi</Eyebrow>
          <h1 className="apc-display" style={{ marginTop: 24, marginBottom: 24 }}>
            Stop overpaying {"K‑Electric."}
            <br />
            <span className="hero-accent">Go solar.</span>
          </h1>
          <p className="apc-lead" style={{ maxWidth: 480, marginBottom: 32 }}>
            We design and install hybrid solar and battery systems for Karachi
            homes. Built right, so they cut your bill for years and keep the power
            on through load shedding.
          </p>
          <div className="hero__ctas">
            <PrimaryCTA href={NAP.phoneHref} data-track="call_click">
              <PhoneGlyph />
              Call now
            </PrimaryCTA>
            <ButtonLink
              href={NAP.whatsappHref}
              variant="light"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              iconLeft={<WhatsAppGlyph size={18} />}
              data-track="whatsapp_click"
            >
              WhatsApp now
            </ButtonLink>
          </div>
          <p className="hero-bleed__sub">Free consultation · No obligation · {NAP.hours}</p>
          <div className="hero__stats">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div className="hero__stat-n">{s.value}</div>
                <div className="hero__stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
