// scrape-logos.mjs
// Fetches the official, full-colour logo for each equipment brand we install,
// straight from the company's own website, and saves it into
// public/logos/partners/color/<slug>.<ext>.
//
// Strategy per brand (best-first, first hit wins):
//   1. Inline <svg> that sits inside the site header / a "logo" wrapper
//   2. <img> whose src / alt / class / id contains "logo"
//   3. <link rel="...icon"> with the largest declared size (square, coloured)
//   4. og:image
// All candidate URLs are resolved against the page (and any redirect) and the
// file's real content-type decides the extension. SVG is always preferred.
//
// Run:  node scrape-logos.mjs
// No dependencies — Node 18+ (global fetch, DOM-free regex parsing).

import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "public/logos/partners/color");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// Each brand: `pages` to scrape (first that yields a logo wins) OR a `direct`
// URL to download straight (for sites whose header logo is JS-injected, so it
// never appears in static HTML — we resolved these by hand). `row` drives the
// two-row carousel: A = panels + inverters, B = inverters + batteries + cables.
const BRANDS = [
  // ---- Row A: panels + inverters ----
  { slug: "jinko-solar",       name: "JinkoSolar",         row: "A", pages: ["https://www.jinkosolar.com/", "https://en.jinkosolar.com/"] },
  { slug: "longi-solar",       name: "LONGi Solar",        row: "A", pages: ["https://www.longi.com/en/", "https://www.longi.com/"] },
  { slug: "trina-solar",       name: "Trina Solar",        row: "A", direct: "https://www-cdn.trinasolar.com/wwwstorage/public/images/en-glb/header/logo.svg" },
  { slug: "canadian-solar",    name: "Canadian Solar",     row: "A", pages: ["https://www.canadiansolar.com/", "https://www.csisolar.com/"] },
  { slug: "huawei",            name: "Huawei",             row: "A", pages: ["https://solar.huawei.com/en", "https://www.huawei.com/en/"] },
  { slug: "sma",               name: "SMA",                row: "A", pages: ["https://www.sma.de/en", "https://www.sma-solar.com/"] },
  { slug: "goodwe",            name: "GoodWe",             row: "A", pages: ["https://en.goodwe.com/", "https://www.goodwe.com/"] },
  { slug: "growatt",           name: "Growatt",            row: "A", pages: ["https://en.growatt.com/", "https://www.growatt.com/"] },
  { slug: "inverex",           name: "Inverex",            row: "A", pages: ["https://www.inverex.com.pk/", "https://inverex.com.pk/"] },
  // ---- Row B: inverters + batteries + cables ----
  { slug: "solis",             name: "Solis Inverters",    row: "B", direct: "https://cmsdata.solisinverters.com/uploads/image/5bdc2304dbfda.png" },
  { slug: "knox",              name: "Knox",               row: "B", pages: ["https://knox.com.pk/"] },
  { slug: "shoto",             name: "Shoto",              row: "B", pages: ["https://www.shoto.com/", "https://www.shoto.com.cn/"] },
  { slug: "byd",               name: "BYD",                row: "B", pages: ["https://en.byd.com/", "https://www.byd.com/"] },
  { slug: "pylontech",         name: "Pylontech",          row: "B", pages: ["https://en.pylontech.com.cn/", "https://www.pylontech.com.cn/"] },
  { slug: "sunwoda",           name: "Sunwoda",            row: "B", pages: ["https://www.sunwoda.com/", "https://en.sunwoda.com/"] },
  { slug: "schneider-electric",name: "Schneider Electric", row: "B", pages: ["https://www.se.com/ww/en/", "https://www.se.com/"] },
  { slug: "pakistan-cables",   name: "Pakistan Cables",    row: "B", pages: ["https://www.pakistancables.com/", "https://pakistancables.com/"] },
];

const EXT_BY_TYPE = {
  "image/svg+xml": "svg",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
  "image/avif": "avif",
};

async function get(url, as = "text") {
  const res = await fetch(url, {
    headers: { "user-agent": UA, accept: "*/*" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const finalUrl = res.url || url;
  if (as === "buffer") {
    const type = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    const buf = Buffer.from(await res.arrayBuffer());
    return { buf, type, finalUrl };
  }
  return { body: await res.text(), finalUrl };
}

function abs(base, u) {
  try { return new URL(u, base).href; } catch { return null; }
}

// Pull the site header/nav region so we score logos that live there higher.
function headerRegion(html) {
  const m =
    html.match(/<header[\s\S]*?<\/header>/i) ||
    html.match(/<nav[\s\S]*?<\/nav>/i) ||
    html.match(/<div[^>]+class=["'][^"']*(?:header|navbar|topbar|masthead)[^"']*["'][\s\S]*?<\/div>/i);
  return m ? m[0] : "";
}

// 1) inline <svg> that looks like a logo (in header or inside a logo wrapper)
function findInlineSvg(html) {
  const header = headerRegion(html);
  const hay = header || html;
  // svg whose surrounding ~200 chars mention "logo"
  const svgRe = /<svg[\s\S]*?<\/svg>/gi;
  let m;
  while ((m = svgRe.exec(hay))) {
    const start = Math.max(0, m.index - 220);
    const ctx = hay.slice(start, m.index + m[0].length + 40).toLowerCase();
    if (ctx.includes("logo")) {
      let svg = m[0];
      if (!/xmlns=/.test(svg)) svg = svg.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"');
      // must contain an actual shape and colour, not a 1x1 spacer
      if (/(path|rect|circle|polygon|use|image)/i.test(svg) && svg.length > 120) {
        return { kind: "inline-svg", svg };
      }
    }
  }
  return null;
}

// 2) <img> with "logo" in src / alt / class / id  (prefer header, prefer svg)
function findImgLogo(html, base) {
  const header = headerRegion(html);
  const scan = (chunk, inHeader) => {
    const out = [];
    const imgRe = /<img\b[^>]*>/gi;
    let m;
    while ((m = imgRe.exec(chunk))) {
      const tag = m[0];
      const attrs = tag.toLowerCase();
      if (!attrs.includes("logo")) continue;
      // prefer data-src / srcset real URL over lazy placeholders
      const src =
        (tag.match(/\bsrc=["']([^"']+)["']/i) || [])[1] ||
        (tag.match(/\bdata-src=["']([^"']+)["']/i) || [])[1] ||
        ((tag.match(/\bsrcset=["']([^"']+)["']/i) || [])[1] || "").split(",")[0].trim().split(" ")[0];
      if (!src) continue;
      if (/^data:/i.test(src)) continue;
      const url = abs(base, src);
      if (!url) continue;
      const isSvg = /\.svg(\?|$)/i.test(url);
      out.push({ url, isSvg, inHeader });
    }
    return out;
  };
  const cands = [...scan(header, true), ...scan(html, false)];
  // rank: header first, then svg, then everything else
  cands.sort((a, b) => (b.inHeader - a.inHeader) || (b.isSvg - a.isSvg));
  return cands[0] ? { kind: "img", ...cands[0] } : null;
}

// 3) biggest declared rel="icon" (coloured, square)
function findIcon(html, base) {
  const linkRe = /<link\b[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/gi;
  let best = null, bestSize = 0;
  let m;
  while ((m = linkRe.exec(html))) {
    const tag = m[0];
    const href = (tag.match(/\bhref=["']([^"']+)["']/i) || [])[1];
    if (!href || /^data:/i.test(href)) continue;
    const sizes = (tag.match(/\bsizes=["'](\d+)/i) || [])[1];
    const size = sizes ? parseInt(sizes, 10) : (/\.svg(\?|$)/i.test(href) ? 1000 : 32);
    if (size >= bestSize) { bestSize = size; best = abs(base, href); }
  }
  return best ? { kind: "icon", url: best } : null;
}

// 4) og:image
function findOg(html, base) {
  const m = html.match(/<meta\b[^>]*property=["']og:image["'][^>]*>/i);
  if (!m) return null;
  const href = (m[0].match(/\bcontent=["']([^"']+)["']/i) || [])[1];
  const url = href && abs(base, href);
  return url ? { kind: "og", url } : null;
}

async function scrapeBrand(brand) {
  // Direct download: the header logo is JS-injected on this site, so the static
  // HTML never exposes it — we point straight at the asset we resolved by hand.
  if (brand.direct) {
    const { buf, type } = await get(brand.direct, "buffer");
    let ext = EXT_BY_TYPE[type] || (/<svg/i.test(buf.slice(0, 400).toString("utf8")) ? "svg" : "png");
    const path = resolve(OUT_DIR, `${brand.slug}.${ext}`);
    await writeFile(path, buf);
    return { ok: true, via: `${brand.direct} → direct`, file: `${brand.slug}.${ext}`, bytes: buf.length };
  }
  for (const page of brand.pages) {
    try {
      const { body, finalUrl } = await get(page, "text");

      const inline = findInlineSvg(body);
      if (inline) {
        const path = resolve(OUT_DIR, `${brand.slug}.svg`);
        await writeFile(path, inline.svg, "utf8");
        return { ok: true, via: `${page} → inline-svg`, file: `${brand.slug}.svg` };
      }

      const cand =
        findImgLogo(body, finalUrl) ||
        findIcon(body, finalUrl) ||
        findOg(body, finalUrl);

      if (cand) {
        const { buf, type } = await get(cand.url, "buffer");
        // svg-by-content even if extension lied
        let ext = EXT_BY_TYPE[type];
        if (!ext) {
          if (buf.slice(0, 5).toString("utf8").includes("<svg") || /<svg/i.test(buf.slice(0, 400).toString("utf8"))) ext = "svg";
          else ext = (cand.url.match(/\.([a-z0-9]{2,4})(\?|$)/i) || [])[1]?.toLowerCase() || "png";
        }
        if (buf.length < 200) throw new Error("candidate too small");
        const path = resolve(OUT_DIR, `${brand.slug}.${ext}`);
        await writeFile(path, buf);
        return { ok: true, via: `${page} → ${cand.kind} (${cand.url})`, file: `${brand.slug}.${ext}`, bytes: buf.length };
      }
    } catch (err) {
      // try next page
      lastErr = err.message;
      var lastErr;
    }
  }
  return { ok: false, error: "no logo found on any page" };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const results = [];
  for (const brand of BRANDS) {
    process.stdout.write(`• ${brand.name.padEnd(22)} `);
    let r;
    try { r = await scrapeBrand(brand); }
    catch (e) { r = { ok: false, error: e.message }; }
    results.push({ brand: brand.slug, ...r });
    console.log(r.ok ? `✓ ${r.file}  [${r.via}]` : `✗ ${r.error}`);
  }
  console.log("\nSummary:");
  for (const r of results) console.log(`  ${r.ok ? "✓" : "✗"} ${r.brand}${r.ok ? " → " + r.file : ": " + r.error}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
