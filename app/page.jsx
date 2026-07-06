import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Problems from "@/components/sections/Problems";
import Benefits from "@/components/sections/Benefits";
import WhyUs from "@/components/sections/WhyUs";
import Partners from "@/components/sections/Partners";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Coverage from "@/components/sections/Coverage";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";
import RevealObserver from "@/components/ds/RevealObserver";
import { WhatsAppFab } from "@/components/ds/primitives";
import { NAP } from "@/lib/site";

export default function Page() {
  // Scarcity line always shows next month, like the original.
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  const bookingMonth = next.toLocaleString("en-US", { month: "long" });

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Benefits />
        <WhyUs />
        <Partners />
        <Process />
        <Testimonials />
        <Coverage />
        <Faq />
        <FinalCta bookingMonth={bookingMonth} />
      </main>
      <Footer />
      <WhatsAppFab href={NAP.whatsappHref} />
      <RevealObserver />
    </>
  );
}
