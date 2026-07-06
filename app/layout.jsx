import Script from "next/script";
import { Poppins, Jost, Geist } from "next/font/google";
import { SITE, NAP, FAQS } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jost",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const GTM_ID = "GTM-NBKF39NJ";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords:
    "solar installation Karachi, hybrid solar system Karachi, BESS battery storage Karachi, solar panels Karachi, solar company Karachi, DHA solar, Clifton solar",
  // Faithful to the live original, which is intentionally noindex for now.
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE.title,
    description:
      "Cut your K-Electric bill by up to 90%. Hybrid solar and BESS systems. 2+ MW installed across Karachi. Free consultation.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_PK",
    type: "website",
    images: [{ url: "/images/hero.webp", width: 2000, height: 1500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    images: ["/images/hero.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: SITE.name,
  description:
    "Quality solar installation company in Karachi specialising in hybrid solar systems and BESS battery energy storage for residential homeowners.",
  url: `${SITE.url}/`,
  telephone: NAP.phoneIntl.replace(/ /g, "-"),
  email: NAP.email,
  image: `${SITE.url}/images/hero.webp`,
  logo: `${SITE.url}/logos/apc-logo.png`,
  priceRange: "Rs.",
  currenciesAccepted: "PKR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R206, Sharjah Trade Center, New Chaali, Saddar",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "74200",
    addressCountry: "PK",
  },
  geo: { "@type": "GeoCoordinates", latitude: 24.8584, longitude: 67.0104 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
  areaServed: { "@type": "City", name: "Karachi" },
  sameAs: [NAP.googleReviewsUrl],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jost.variable} ${geist.variable}`}>
      <head>
        {/* Preload the LCP hero image (art-directed: portrait on mobile, wide on desktop) */}
        <link rel="preload" as="image" href="/images/hero-portrait.webp" media="(max-width: 640px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/hero.webp" media="(min-width: 641px)" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        {/* No-JS fallback: reveal elements stay visible without the observer */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* Google Tag Manager. lazyOnload keeps GTM/GA4/Ads/Clarity fully working
            but moves its main-thread work to browser idle (off the critical path),
            so it no longer inflates TBT. Tracking is preserved: dataLayer is
            initialized early below and the CTAs (tel:/wa.me _blank) never unload
            the page, so queued events flush once GTM loads. */}
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Conversion click events: any element with data-track pushes to dataLayer.
            afterInteractive so the listener is attached early and clicks are queued
            in dataLayer even before the GTM container finishes loading. */}
        <Script id="cta-tracking" strategy="afterInteractive">
          {`document.addEventListener('click',function(e){
var el=e.target.closest('[data-track]');
if(el){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:el.getAttribute('data-track')});}
});`}
        </Script>
      </body>
    </html>
  );
}
