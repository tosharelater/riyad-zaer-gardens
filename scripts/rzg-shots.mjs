import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const BASE = 'http://127.0.0.1:4321/riyad-zaer-gardens/';
const OUT = '/workspace/riyad-zaer-gardens/screenshots';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900'],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
await page.evaluateOnNewDocument(() => {
  const style = document.createElement('style');
  style.textContent = `
    html.rzg-splash-pending .rzg-splash { display:none!important; }
    html.rzg-splash-pending, html.rzg-splash-pending body { overflow:auto!important; }
  `;
  document.documentElement.appendChild(style);
});

await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 60000 });
await page.evaluate(() => {
  document.documentElement.classList.remove('rzg-splash-pending');
  document.documentElement.classList.add('rzg-splash-done');
  document.getElementById('rzg-splash')?.remove();
  document.body.classList.remove('rzg-splash-open');
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
});
await new Promise((r) => setTimeout(r, 250));

async function scrubBeat(index, progress = 0.62) {
  await page.evaluate(
    (i, prog) => {
      const beats = [...document.querySelectorAll('[data-story-beat]')];
      const beat = beats[i];
      if (!beat) throw new Error('no beat ' + i);
      const top = beat.getBoundingClientRect().top + window.scrollY;
      const y = top + Math.max(0, beat.offsetHeight - window.innerHeight) * prog;
      window.scrollTo({ top: y, left: 0, behavior: 'instant' });
      window.dispatchEvent(new Event('scroll'));
    },
    index,
    progress
  );
  await new Promise((r) => setTimeout(r, 450));
}

await scrubBeat(0, 0.65);
await page.screenshot({ path: `${OUT}/home-cadre-fullscreen.png`, fullPage: false });
console.log('cadre', await page.evaluate(() => ({
  h3: document.querySelector('[data-story-beat].is-active h3, [data-story-beat] h3')?.textContent,
  y: Math.round(window.scrollY),
})));

// Explore — scroll past sticky traps using offsetTop
const exploreInfo = await page.evaluate(() => {
  const el = document.getElementById('explore');
  if (!el) return null;
  const y = el.offsetTop - 56;
  window.scrollTo({ top: y, left: 0, behavior: 'instant' });
  return {
    y: Math.round(window.scrollY),
    offsetTop: el.offsetTop,
    h2: el.querySelector('h2')?.textContent?.trim(),
    hasCompact: el.classList.contains('explore--compact'),
    planH: el.querySelector('.choose-plan')?.getBoundingClientRect().height,
  };
});
console.log('exploreInfo', exploreInfo);
await new Promise((r) => setTimeout(r, 400));
const exploreEl = await page.$('#explore');
await exploreEl.screenshot({ path: `${OUT}/home-explore-compact.png` });
// also viewport shot centered on explore
await page.evaluate(() => {
  const el = document.getElementById('explore');
  const y = el.offsetTop - 56;
  window.scrollTo({ top: y, left: 0, behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 200));
await page.screenshot({ path: `${OUT}/home-explore.png`, fullPage: false });

// FAQ
await page.evaluate(() => {
  const el = document.getElementById('faq');
  window.scrollTo({ top: el.offsetTop - 24, left: 0, behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 300));
await page.click('#faq [data-faq-trigger]');
await new Promise((r) => setTimeout(r, 450));
await page.screenshot({ path: `${OUT}/home-faq-prominent.png`, fullPage: false });
console.log('faq y', await page.evaluate(() => Math.round(window.scrollY)));

await browser.close();
console.log('done');
