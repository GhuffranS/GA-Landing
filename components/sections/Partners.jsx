import { Eyebrow } from "@/components/ds/primitives";
import { PARTNERS } from "@/lib/site";

export default function Partners() {
  const loop = [...PARTNERS, ...PARTNERS];
  return (
    <section className="sec">
      <div className="apc-container">
        <div className="section-head" data-reveal>
          <Eyebrow>Equipment we install</Eyebrow>
          <h2 className="apc-h2">Only Tier-1 brands, on every install</h2>
          <p>
            The same panels, inverters, and batteries trusted in millions of
            installations worldwide.
          </p>
        </div>
        <div className="marquee" data-reveal>
          <div className="marquee__track">
            {loop.map((p, i) => (
              <div className="logo-tile" key={`${p.alt}-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
        <p
          data-reveal
          style={{ textAlign: "center", marginTop: 32, marginInline: "auto", fontSize: "var(--fs-xs)", color: "var(--text-muted)", maxWidth: "none" }}
        >
          Every component is sourced from certified global suppliers. No
          grey-market imports, no substitutes.
        </p>
      </div>
    </section>
  );
}
