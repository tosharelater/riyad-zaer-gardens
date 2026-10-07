// Rewrites root-absolute URLs in the built site so it can live under a sub-path,
// e.g. GitHub Pages project sites: node tools/prefix-base.mjs /riyad-zaer-gardens
// The source keeps clean root paths; only dist/ is touched.
import fs from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] || '').replace(/\/+$/, '');
if (!base.startsWith('/')) {
  console.error('Usage: node tools/prefix-base.mjs /sub-path');
  process.exit(1);
}
const dist = path.resolve('dist');
const seg = base.slice(1);

// "/x" but not "//x" and not already "/<base>/…"
const local = `/(?!/)(?!${seg}(?:/|"|'|\\)|$))`;
const attr = new RegExp(`(\\s(?:href|src|action|poster|data-src)=["'])${local}`, 'g');
const cssUrl = new RegExp(`(url\\(\\s*["']?)${local}`, 'g');
const jsImport = new RegExp(`((?:import|from)\\s*\\(?\\s*["'])${local}(?=_astro/)`, 'g');

let files = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(html|css|js)$/.test(entry.name)) {
      const src = fs.readFileSync(p, 'utf8');
      let out = src.replace(cssUrl, `$1${base}/`);
      if (p.endsWith('.html')) out = out.replace(attr, `$1${base}/`);
      if (p.endsWith('.js')) out = out.replace(jsImport, `$1${base}/`);
      if (out !== src) {
        fs.writeFileSync(p, out);
        files++;
      }
    }
  }
};
walk(dist);
// GitHub Pages runs Jekyll by default, which hides folders starting with "_" (like _astro).
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log(`prefix-base: ${base} applied to ${files} files`);
