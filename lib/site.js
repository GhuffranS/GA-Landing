// Single source of truth for the APC Solar homepage.
// Content mirrors the original index.html; NAP stays identical everywhere.

export const NAP = {
  phoneDisplay: "0322 2749224",
  phoneIntl: "+92 322 2749224",
  phoneHref: "tel:+923222749224",
  whatsappNumber: "923222749224",
  whatsappHref: "https://wa.me/923222749224",
  email: "sales@apcsolar.pk",
  address: "R206, Sharjah Trade Center, New Chaali, Saddar, Karachi",
  hours: "9 am–9 pm, 7 days a week",
  googleReviewsUrl: "https://share.google/wp9fF8dadhfBDIBZw",
};

export const SITE = {
  url: "https://ga.apcsolar.pk",
  name: "APC Solar",
  title: "Solar Installation Company in Karachi | APC Solar",
  description:
    "APC Solar is a trusted solar installation company in Karachi. Hybrid solar and BESS battery storage, Tier-1 components, 2+ MW installed across Karachi. Free consultation.",
};

export const HERO_STATS = [
  { value: "90%", label: "Bill reduction possible" },
  { value: "25 yr", label: "Panel performance warranty" },
  { value: "2+ MW", label: "Installed across Karachi" },
];

// The Problem — three frustrations every Karachi homeowner knows.
export const PROBLEMS = [
  {
    icon: "rising-bills",
    title: "Bills that never stop rising",
    body: "Fuel surcharges, tariff hikes, and taxes make every bill a new shock. Your electricity costs more each year while reliability stays the same.",
  },
  {
    icon: "load-shedding",
    title: "Load shedding disrupts everything",
    body: "Hours without power in Karachi's heat. Work stops. Children can't study. AC shuts off. K-Electric's reliability hasn't improved in years.",
  },
  {
    icon: "unreliable-installers",
    title: "Installers who vanish after the sale",
    body: "Karachi is full of solar sellers who disappear once they have your money. Wrong sizing, cheap parts, no one to call when something breaks. One bad choice costs more than it ever saved.",
  },
];

// Life after solar — what changes from day one.
export const BENEFITS = [
  {
    title: "Bills drop 60–90% from day one",
    body: "Real money back in your pocket every single month, for decades.",
  },
  {
    title: "Reliable power during load shedding",
    body: "Your AC, lights, and appliances stay on regardless of K-Electric.",
  },
  {
    title: "25-year panel performance warranty",
    body: "Tier-1 panels certified to perform for decades. One smart investment.",
  },
  {
    title: "Live monitoring on your phone",
    body: "Track production, savings, and system health in real time from anywhere.",
  },
  {
    title: "Higher property value",
    body: "A solar-powered home is a more attractive, more valuable property in Karachi's market.",
  },
];

// Why APC — the difference that shows up after the sale.
export const WHY = [
  {
    title: "Proper system sizing",
    body: "We analyse your actual bills before designing. No guessing, no overselling.",
  },
  {
    title: "No-compromise components, right down to the wiring",
    body: "Down to the breakers, fuses, and cables. Fire risk starts with the parts nobody sees, so we never cut corners there.",
  },
  {
    title: "Experienced installation team",
    body: "Clean, professional workmanship. Your home treated with care, no shortcuts.",
  },
  {
    title: "Responsive after-sales support",
    body: "Real people answer. We don't disappear after installation day.",
  },
];

// Equipment brands we install (trust strip — equipment only, never a DISCO/bank).
// Full-colour logos scraped from each manufacturer's own site (see scrape-logos.mjs).
// `row` splits the two-row carousel; `iw`/`ih` are the logo's intrinsic content
// dimensions, used by the optically-even sizing in components/sections/Partners.jsx.
//   Row A — panels + inverters   ·   Row B — inverters + batteries + cables
export const PARTNERS = [
  { row: "A", src: "/logos/partners/color/jinko-solar.png", alt: "JinkoSolar", iw: 146, ih: 49 },
  { row: "A", src: "/logos/partners/color/longi-solar.png", alt: "LONGi Solar", iw: 593, ih: 230 },
  { row: "A", src: "/logos/partners/color/trina-solar.svg", alt: "Trina Solar", iw: 122, ih: 60 },
  { row: "A", src: "/logos/partners/color/canadian-solar.png", alt: "Canadian Solar", iw: 618, ih: 94 },
  { row: "A", src: "/logos/partners/color/huawei.png", alt: "Huawei", iw: 266, ih: 58 },
  { row: "A", src: "/logos/partners/color/sma.svg", alt: "SMA", iw: 88, ih: 55 },
  { row: "A", src: "/logos/partners/color/goodwe.svg", alt: "GoodWe", iw: 767, ih: 114 },
  { row: "A", src: "/logos/partners/color/growatt.png", alt: "Growatt", iw: 182, ih: 31 },
  { row: "A", src: "/logos/partners/color/inverex.png", alt: "Inverex", iw: 96, ih: 40 },
  { row: "B", src: "/logos/partners/color/solis.png", alt: "Solis", iw: 166, ih: 60 },
  { row: "B", src: "/logos/partners/color/knox.png", alt: "Knox", iw: 192, ih: 46 },
  { row: "B", src: "/logos/partners/color/shoto.png", alt: "Shoto", iw: 115, ih: 34 },
  { row: "B", src: "/logos/partners/color/byd.png", alt: "BYD", iw: 142, ih: 86 },
  { row: "B", src: "/logos/partners/color/pylontech.svg", alt: "Pylontech", iw: 219, ih: 44 },
  { row: "B", src: "/logos/partners/color/sunwoda.png", alt: "Sunwoda", iw: 141, ih: 40 },
  { row: "B", src: "/logos/partners/color/schneider-electric.svg", alt: "Schneider Electric", iw: 218, ih: 64 },
  { row: "B", src: "/logos/partners/color/pakistan-cables.png", alt: "Pakistan Cables", iw: 63, ih: 70 },
];

// How it works — four steps, first call to live system.
export const PROCESS = [
  {
    title: "Free consultation",
    body: "Call or WhatsApp us. We discuss your bills and energy needs with no obligation and no pressure.",
  },
  {
    title: "Custom system design",
    body: "We design a system sized precisely for your home: right capacity, right components, right budget.",
  },
  {
    title: "Professional installation",
    body: "Our trained team completes most homes in 1–3 days. Clean work, zero mess left behind.",
  },
  {
    title: "Ongoing support",
    body: "We handle the K-Electric paperwork and stay available for all after-sales needs, always.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Provided great and speedy service, showed up on Sunday on short notice, always very helpful. Competitive pricing, system was up and running within a few days. Excellent work, no complaints.",
    name: "Minhaj Haider",
    location: "Gulistan-e-Johar, Karachi · Local Guide",
  },
  {
    quote:
      "Mr. Arshad Saleem and the APC Solar team were extremely professional throughout. Installed our 15 kW system in two days, coordinated all the K-Electric approvals themselves. Highly recommend.",
    name: "Tariq H.",
    location: "Clifton, Karachi",
  },
  {
    quote:
      "I had an excellent experience with APC Solar. From the initial consultation to the final installation, everything was handled professionally and efficiently. The team was knowledgeable, punctual, and took the time to explain the entire process clearly. Highly recommended for anyone considering switching to solar.",
    name: "Farrukh Kamran",
    location: "Gulberg, Karachi",
  },
];

export const DISTRICTS = [
  "DHA Phase IV", "DHA Phase VI", "Clifton", "PECHS", "Gulshan-e-Iqbal",
  "North Nazimabad", "Bahadurabad", "Saddar", "Korangi", "Malir",
  "Scheme 33", "Bahria Town",
];

export const FAQS = [
  {
    question: "How much can I save on my electricity bill?",
    answer:
      "Most APC Solar customers reduce their monthly bill by 60–90%. A homeowner paying Rs 50,000/month can realistically bring that down to Rs 3,000–8,000/month. The exact savings depend on your consumption and the system we recommend for your home.",
  },
  {
    question: "What happens during K-Electric load shedding?",
    answer:
      "With a hybrid system, your home keeps running on solar power during outages without any interruption. Basic grid-tied systems without batteries must shut off during outages due to NEPRA safety rules. We'll recommend the right setup for your needs during the free consultation.",
  },
  {
    question: "How long does the installation take?",
    answer:
      "Most residential installations are completed in 1 to 3 days. We work efficiently and cleanly. Our team respects your home, and once installed, your system begins generating energy immediately.",
  },
  {
    question: "What is the payback period for a solar system?",
    answer:
      "Most homeowners in Karachi recover their investment in around 3.5 years. After that, the system generates essentially free electricity for another 18+ years. With electricity prices rising every year, that payback period keeps getting shorter.",
  },
  {
    question: "What happens after installation? How do I get support?",
    answer:
      "We don't disappear after installation day. Our after-sales team is reachable by WhatsApp and phone, 9 am to 9 pm, seven days a week. For any fault or performance question, we respond the same day and dispatch a technician within 72 hours for on-site issues. Your system also includes live remote monitoring, so in most cases we spot and resolve problems before you even notice them.",
  },
  {
    question: "Do I need to do anything to maintain the system?",
    answer:
      "The main thing a solar system needs is regular panel cleaning to keep efficiency high. Dust builds up on panels and reduces output, so cleaning them periodically, especially during dry months, makes a real difference to your savings. Beyond that, the system runs on its own with no moving parts and no ongoing fuel costs.",
  },
];
