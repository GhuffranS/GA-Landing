import { NAP } from "@/lib/site";
import { Eyebrow, PrimaryCTA, ButtonLink, PhoneGlyph, WhatsAppGlyph } from "@/components/ds/primitives";

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--apc-yellow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const TRUST = ["Free consultation", "No-obligation quote", "Tier-1 equipment only", "Responsive after-sales"];

export default function FinalCta({ bookingMonth }) {
  return (
    <section className="sec sec--dark final-cta-sec">
      <div className="final-cta-sec__bg" aria-hidden="true">
        <img
          src="/images/cta-band.webp"
          alt=""
          className="final-cta-sec__img"
          loading="lazy"
          decoding="async"
        />
        <div className="final-cta-sec__scrim" />
      </div>
      <div className="apc-container final-cta" data-reveal>
        <Eyebrow onDark>Take the first step</Eyebrow>
        <h2 className="apc-h2" style={{ marginTop: 16, marginBottom: 16 }}>
          Your family deserves reliable power. Stop waiting.
        </h2>
        <p style={{ marginInline: "auto", marginBottom: "var(--space-5)", maxWidth: 520 }}>
          Electricity prices will keep rising. Load shedding won&apos;t stop on
          its own. Every month you delay is another month of overpaying. The right
          time to go solar is now.
        </p>

        <div className="final-cta__pull">
          <p>
            &ldquo;The best time to invest in solar was yesterday. The second best
            time is now.&rdquo;
          </p>
        </div>

        <p style={{ marginInline: "auto", fontSize: "var(--fs-sm)" }}>
          We take on a limited number of new installations each month to ensure
          every system meets our standard. Currently booking {bookingMonth}{" "}
          installs.
        </p>

        <div className="final-cta__trust">
          {TRUST.map((t) => (
            <span key={t}>
              <Check />
              {t}
            </span>
          ))}
        </div>

        <div className="final-cta__ctas">
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

        <p style={{ marginInline: "auto", marginTop: "var(--space-4)", fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.4)" }}>
          {NAP.phoneIntl} · Available {NAP.hours}
        </p>
      </div>
    </section>
  );
}
