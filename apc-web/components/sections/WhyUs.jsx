import Image from "next/image";
import { Eyebrow } from "@/components/ds/primitives";
import { WHY } from "@/lib/site";

export default function WhyUs() {
  return (
    <section className="sec sec--alt">
      <div className="apc-container split">
        <div data-reveal>
          <Eyebrow>Why APC Solar</Eyebrow>
          <h2 className="apc-h2" style={{ marginTop: 16, marginBottom: 16 }}>
            Not all solar companies are the same
          </h2>
          <p style={{ marginBottom: 32 }}>
            Karachi has plenty of solar companies. The difference shows up after
            the sale, and inside the wiring you never see. We build for homeowners
            who want a system that lasts, not a cheap install that brings new
            problems later.
          </p>
          <ul className="apc-check-list">
            {WHY.map((w) => (
              <li key={w.title}>
                <div>
                  <span className="check-item__t">{w.title}</span>
                  <span className="check-item__d">{w.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="photo-grid" data-reveal style={{ transitionDelay: "80ms" }}>
          <div className="photo-grid__cell photo-grid__wide">
            <Image src="/images/why-wide.webp" alt="APC Solar installation at golden hour" fill sizes="(max-width: 880px) 100vw, 50vw" />
          </div>
          <div className="photo-grid__cell photo-grid__cell--sm">
            <Image src="/images/why-array.webp" alt="Elevated solar array on a Karachi rooftop against a clear sky" fill sizes="(max-width: 880px) 50vw, 25vw" />
          </div>
          <div className="photo-grid__cell photo-grid__cell--sm">
            <Image src="/images/why-skyline.webp" alt="Rooftop solar array with the Karachi skyline behind" fill sizes="(max-width: 880px) 50vw, 25vw" />
          </div>
        </div>
      </div>
    </section>
  );
}
