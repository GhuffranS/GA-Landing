import { Eyebrow } from "@/components/ds/primitives";
import Accordion from "@/components/ds/Accordion";
import { FAQS } from "@/lib/site";

export default function Faq() {
  return (
    <section className="sec sec--alt">
      <div className="apc-container">
        <div className="section-head" data-reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="apc-h2">Questions you&apos;ll want answered</h2>
        </div>
        <div style={{ maxWidth: 720, marginInline: "auto" }} data-reveal>
          <Accordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
