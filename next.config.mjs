import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Parent folder has its own package-lock — pin tracing to this app
  outputFileTracingRoot: __dirname,
  experimental: {
    // Inline the (~7 KB gzip) CSS into the HTML instead of shipping a
    // render-blocking <link>. Removes one critical-path round-trip, so first
    // paint — and the H1 that is the LCP element — lands sooner.
    inlineCss: true,
  },
};

export default nextConfig;
