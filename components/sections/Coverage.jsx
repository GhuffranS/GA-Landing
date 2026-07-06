import { Eyebrow } from "@/components/ds/primitives";
import { DISTRICTS } from "@/lib/site";
import KarachiMap from "@/components/ds/KarachiMap";

export default function Coverage() {
  return (
    <section className="sec">
      <div className="apc-container">
        <div className="section-head" data-reveal>
          <Eyebrow>Coverage</Eyebrow>
          <h2 className="apc-h2">Installed across Karachi</h2>
        </div>
        <div className="chip-row chip-row--center" data-reveal style={{ marginBottom: "var(--space-4)" }}>
          {DISTRICTS.map((d) => (
            <span className="chip" key={d}>{d}</span>
          ))}
        </div>
        <p
          data-reveal
          style={{ textAlign: "center", marginInline: "auto", color: "var(--text-muted)", fontSize: "var(--fs-sm)" }}
        >
          We&apos;ve installed over 2 MW of solar across Karachi, so chances are
          we&apos;ve already worked on a roof just like yours. Our team handles it
          all, from the site survey and K-Electric paperwork to installation and
          commissioning, so you don&apos;t have to.
        </p>
        <div data-reveal>
          <KarachiMap />
        </div>
      </div>
    </section>
  );
}
