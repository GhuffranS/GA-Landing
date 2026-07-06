import Image from "next/image";
import { Eyebrow } from "@/components/ds/primitives";
import { BENEFITS } from "@/lib/site";

export default function Benefits() {
  return (
    <section className="sec">
      <div className="apc-container split">
        <div className="benefit-photo" data-reveal>
          <Image
            src="/images/benefits.webp"
            alt="Elevated solar canopy installation on a Karachi rooftop"
            fill
            sizes="(max-width: 880px) 100vw, 50vw"
          />
        </div>
        <div data-reveal style={{ transitionDelay: "80ms" }}>
          <Eyebrow>Life after solar</Eyebrow>
          <h2 className="apc-h2" style={{ marginTop: 16, marginBottom: 16 }}>
            What changes the day your system goes live
          </h2>
          <p style={{ marginBottom: 32 }}>
            Hundreds of Karachi homeowners have already made the switch. Here&apos;s
            what gets better from day one.
          </p>
          <ul className="apc-check-list">
            {BENEFITS.map((b) => (
              <li key={b.title}>
                <div>
                  <span className="check-item__t">{b.title}</span>
                  <span className="check-item__d">{b.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
