import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Parent folder has its own package-lock — pin tracing to this app
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
