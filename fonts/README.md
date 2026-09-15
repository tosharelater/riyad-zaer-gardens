# Audrey (display)

Licensed Audrey files belong here. The site loads them via `@font-face` and never falls back to Bodoni.

Expected filenames (`.woff2` preferred; `.otf` accepted):

| File | Weight / style |
| --- | --- |
| `Audrey-Regular.woff2` or `Audrey-Regular.otf` | 400–500, roman |
| `Audrey-Medium.woff2` or `Audrey-Medium.otf` | 500–600, roman |
| `Audrey-Italic.woff2` or `Audrey-Italic.otf` | 400–500, italic |

Until files are present, headlines still request `font-family: "Audrey"` and degrade to generic `serif` (Georgia / Times) — not Bodoni Moda, not another webfont.
