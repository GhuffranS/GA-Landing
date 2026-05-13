import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

// Auto-increment filename
let n = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${n}${label ? '-' + label : ''}.png`))) n++;
const filename = `screenshot-${n}${label ? '-' + label : ''}.png`;
const outPath = path.join(screenshotDir, filename);

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
const mobile = process.argv[5] === 'mobile';
await page.setViewport({ width: mobile ? 390 : 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Force all animated elements visible for screenshot
await page.evaluate(async () => {
  document.querySelectorAll('.fi').forEach(el => el.classList.add('v'));
  await new Promise(r => setTimeout(r, 500));
});

const scrollY = parseInt(process.argv[4] || '0');
const fullPage = scrollY === 999999;
if (fullPage) {
  await page.screenshot({ path: outPath, fullPage: true });
} else {
  await page.evaluate(y => window.scrollTo(0, y), scrollY);
  await new Promise(r => setTimeout(r, 200));
  await page.screenshot({ path: outPath, fullPage: false });
}
await browser.close();

console.log(`Screenshot saved: temporary screenshots/${filename}`);
