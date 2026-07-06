import { Eyebrow, IconBadge } from "@/components/ds/primitives";
import { PROBLEMS } from "@/lib/site";

export default function Problems() {
  return (
    <section className="sec sec--alt">
      <div className="apc-container">
        <div className="section-head" data-reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="apc-h2">Three frustrations every Karachi homeowner knows</h2>
        </div>
        <div className="grid-3">
          {PROBLEMS.map((p, i) => (
            <div className="apc-feature-card" key={p.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <IconBadge name={p.icon} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
