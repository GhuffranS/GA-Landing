import { Eyebrow } from "@/components/ds/primitives";
import { PARTNERS } from "@/lib/site";

// Optically-even sizing (from the Brands Carousel design): a wide wordmark's
// display height is dampened by √aspect so it never towers over a square mark,
// then the result is capped in both axes. Two caps — one per breakpoint.
function sized(iw, ih, maxW, maxH, base) {
  const aspect = iw / ih;
  let h = Math.min(maxH, base / Math.sqrt(aspect));
  let w = h * aspect;
  if (w > maxW) {
    w = maxW;
    h = w / aspect;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

// Per-tile sizing: desktop (--w/--h) and mobile (--wm/--hm) logo box. The
// desktop box also seeds the img's width/height attributes so the browser
// reserves space before the logo loads (no layout shift, no pop-in).
function tileSizing(b) {
  const d = sized(b.iw, b.ih, 132, 60, 62);
  const m = sized(b.iw, b.ih, 102, 48, 50);
  return {
    w: d.w,
    h: d.h,
    vars: { "--w": `${d.w}px`, "--h": `${d.h}px`, "--wm": `${m.w}px`, "--hm": `${m.h}px` },
  };
}

// One row, duplicated once so the −50% translate loops seamlessly. The second
// copy is hidden from assistive tech to avoid reading every brand twice.
function BrandRow({ brands, variant }) {
  const loop = [...brands, ...brands];
  return (
    <div className={`brand-row brand-row--${variant}`}>
      {loop.map((b, i) => {
        const dupe = i >= brands.length;
        const s = tileSizing(b);
        return (
          <div className="brand-tile" key={`${b.alt}-${i}`} style={s.vars} title={b.alt}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={b.src}
              alt={dupe ? "" : b.alt}
              aria-hidden={dupe ? "true" : undefined}
              width={s.w}
              height={s.h}
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      })}
    </div>
  );
}

export default function Partners() {
  const rowA = PARTNERS.filter((p) => p.row === "A");
  const rowB = PARTNERS.filter((p) => p.row === "B");
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
        <div className="brand-carousel" data-reveal aria-label="Equipment brands we install">
          <BrandRow brands={rowA} variant="a" />
          <BrandRow brands={rowB} variant="b" />
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
