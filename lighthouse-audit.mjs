import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:3000';
const blockGtm = process.argv[3] === 'nogtm';
const runs = parseInt(process.argv[4] || '3');
const chromePath = puppeteer.executablePath();

const blocked = blockGtm ? [
  '*googletagmanager.com*',
  '*google-analytics.com*',
  '*analytics.google.com*',
  '*doubleclick.net*',
  '*googleadservices.com*',
  '*clarity.ms*',
  '*googleads*',
] : [];

const scores = [];
let lastLhr = null;

for (let i = 0; i < runs; i++) {
  const chrome = await launch({
    chromePath,
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  });
  const result = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance'],
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
    blockedUrlPatterns: blocked,
  });
  lastLhr = result.lhr;
  scores.push(Math.round(lastLhr.categories.performance.score * 100));
  try { await chrome.kill(); } catch {}
}

scores.sort((a, b) => a - b);
const median = scores[Math.floor(scores.length / 2)];
console.log('MODE:', blockGtm ? 'GTM BLOCKED (controllable ceiling)' : 'FULL (with GTM)');
console.log('SCORES:', scores.join(', '), '=> MEDIAN:', median);
const m = lastLhr.audits;
const metric = (id) => (m[id] ? m[id].displayValue : 'n/a');
console.log('FCP :', metric('first-contentful-paint'));
console.log('LCP :', metric('largest-contentful-paint'));
console.log('TBT :', metric('total-blocking-time'));
console.log('CLS :', metric('cumulative-layout-shift'));
console.log('SI  :', metric('speed-index'));
process.exit(0);
