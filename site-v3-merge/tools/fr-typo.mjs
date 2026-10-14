// French typography for the built FR pages: a no-break space before : ; ? ! and inside « »,
// so punctuation never starts a line. Text nodes only; skips <script>, <style> and /ar/.
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const NBSP = '\u00a0';
const NNBSP = '\u202f';
let files = 0;

const fixText = (t) =>
  t
    .replace(/[ \u00a0](?=[;?!])/g, NNBSP)
    .replace(/[ \u00a0]:(?=\s|$|<)/g, NBSP + ':')
    .replace(/«[ \u00a0]?/g, '«' + NBSP)
    .replace(/[ \u00a0]?»/g, NBSP + '»')
    .replace(/(\d) (?=(DH|m²|m2|min|km)\b)/g, '$1' + NBSP);

const fixHtml = (html) => {
  const out = [];
  const re = /(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>)/gi;
  let last = 0;
  let m;
  while ((m = re.exec(html))) {
    out.push(fixText(html.slice(last, m.index)), m[0]);
    last = re.lastIndex;
  }
  out.push(fixText(html.slice(last)));
  return out.join('');
};

const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (path.relative(dist, p) === 'ar') continue;
      walk(p);
    } else if (e.name.endsWith('.html')) {
      const src = fs.readFileSync(p, 'utf8');
      const out = fixHtml(src);
      if (out !== src) { fs.writeFileSync(p, out); files++; }
    }
  }
};
walk(dist);
console.log(`fr-typo: ${files} files`);
