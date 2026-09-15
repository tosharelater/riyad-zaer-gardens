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

async function prep() {
  await page.evaluate(() => {
    document.documentElement.classList.remove('rzg-splash-pending');
    document.documentElement.classList.add('rzg-splash-done');
    document.getElementById('rzg-splash')?.remove();
    document.body.classList.remove('rzg-splash-open');
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  });
  await new Promise((r) => setTimeout(r, 200));
}

await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 90000 });
await prep();

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
await page.screenshot({ path: `${OUT}/home-cadre.png`, fullPage: false });
console.log('cadre ok');

await page.evaluate(() => {
  const el = document.getElementById('explore');
  window.scrollTo({ top: el.offsetTop - 56, left: 0, behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${OUT}/home-explore.png`, fullPage: false });
console.log('explore ok');

await page.goto(`${BASE}services/`, { waitUntil: 'networkidle0', timeout: 90000 });
await prep();
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
await new Promise((r) => setTimeout(r, 250));
await page.screenshot({ path: `${OUT}/services.png`, fullPage: false });
console.log('services ok');

await page.goto(`${BASE}about/`, { waitUntil: 'networkidle0', timeout: 90000 });
await prep();
await page.screenshot({ path: `${OUT}/about.png`, fullPage: false });
console.log('about ok');

await page.goto(`${BASE}blog/`, { waitUntil: 'networkidle0', timeout: 90000 });
await prep();
await page.screenshot({ path: `${OUT}/blog.png`, fullPage: false });
console.log('blog ok');

await browser.close();
console.log('done');
