import { Eyebrow, Steps } from "@/components/ds/primitives";
import { PROCESS } from "@/lib/site";

export default function Process() {
  const steps = PROCESS.map((p) => ({ title: p.title, body: p.body }));
  return (
    <section className="sec sec--alt">
      <div className="apc-container">
        <div className="section-head" data-reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="apc-h2">From first call to live system</h2>
          <p>Four straightforward steps and you&apos;re saving on electricity.</p>
        </div>
        <div data-reveal>
          <Steps steps={steps} />
        </div>
      </div>
    </section>
  );
}
