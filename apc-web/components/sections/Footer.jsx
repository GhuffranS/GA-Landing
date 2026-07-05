import Image from "next/image";
import { NAP } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="apc-container">
        <div className="site-footer__grid">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, background: "#fff", borderRadius: "var(--radius-sm)" }}>
              <Image src="/logos/apc-logo.svg" alt="" width={28} height={28} />
            </span>
            <span className="site-footer__wordmark">APC Solar</span>
          </div>
          <address style={{ fontStyle: "normal", fontSize: "var(--fs-xs)", color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: "none" }}>
            {NAP.address}
          </address>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <a href={`mailto:${NAP.email}`} style={{ fontSize: "var(--fs-sm)" }}>{NAP.email}</a>
            <a href={NAP.phoneHref} style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)" }}>{NAP.phoneIntl}</a>
          </div>
        </div>
        <div className="site-footer__legal">
          © {year} APC Solar. Karachi, Pakistan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
