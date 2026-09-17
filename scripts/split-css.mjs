import fs from 'node:fs';

const src = fs.readFileSync('src/styles/global.css', 'utf8');
const baseStart = src.indexOf('@layer base {');
const compStart = src.indexOf('@layer components {');

if (baseStart === -1 || compStart === -1) {
  console.error('Could not find layer markers — is global.css already split?');
  process.exit(1);
}

const base = src.slice(baseStart, compStart).trim();
const components = src.slice(compStart).trim();

fs.mkdirSync('src/styles/partials', { recursive: true });
// tokens.css is hand-maintained (Audrey @font-face + @theme) — never overwrite from global.css
if (!fs.existsSync('src/styles/partials/tokens.css')) {
  fs.writeFileSync('src/styles/partials/tokens.css', src.slice(0, baseStart).trim());
}
fs.writeFileSync('src/styles/partials/base.css', base);
fs.writeFileSync('src/styles/partials/components.css', components);
fs.writeFileSync(
  'src/styles/global.css',
  `@import "tailwindcss";
@import "./partials/tokens.css";
@import "./partials/base.css";
@import "./partials/components.css";
@import "./premium.css";
`
);

console.log('Split complete (tokens + base + components)');
console.warn('Note: tokens.css is hand-maintained (Audrey @font-face). Re-run only updates base + components.');
