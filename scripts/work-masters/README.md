# Portfolio screenshots

Masters for the portfolio images in `public/work/` (generated files there — don't edit by hand):

| Master | What it is |
|---|---|
| `<slug>-tablet-master.webp` | Tablet capture of the live site, browser bar cropped off (1536 × 876) |
| `<slug>-mobile-master.webp` | iPhone capture of the live site, status bar and Safari toolbar cropped off (1290 × 2323) |

Run `npm run work-assets` to regenerate everything in `public/work/`:

- `<slug>-tablet-{1536,1152,768}.{avif,webp}` and `<slug>-mobile-{780,520,260}.{avif,webp}`
- tiny blurred previews in `src/data/placeholders.json` (shown while images load)

The site shows them in a tablet frame and a phone frame (`TabletFrame`, `PhoneFrame screen=…`
in `src/components/Devices.jsx`, images via `src/components/WorkShot.jsx`). The tablet
captures are deliberately not shown as desktop browser windows.

## Provenance (updated 2026-10-29)

All six masters come from screenshots of the **live websites**, supplied by the founder on
29 October 2026 and described as the definitive references. Each master is an exact crop of
the original file, saved losslessly: no resizing, retouching, compositing or generated content.

| Master | Original file (SHA-256) | Crop (x, y, w × h) |
|---|---|---|
| `teddy-bike-tablet` | teddybikesamui.com, tablet, JPEG 1536 × 1009 (`f12e6ea0…ed17`) | 0, 133, 1536 × 876 — below the browser's tab bar (row 132 is its bottom edge) |
| `samui-property-360-tablet` | samuiproperty360.com, tablet, JPEG 1536 × 1009 (`bce24f87…73a7`) | 0, 133, 1536 × 876 |
| `valerie-dart-don-tablet` | valeriedartdon.com, tablet, JPEG 1536 × 1009 (`7d9f5b5a…47d6`) | 0, 133, 1536 × 876 |
| `teddy-bike-mobile` | teddybikesamui.com, iPhone, PNG 1290 × 2796 (`0d63e4d6…fe18`) | 0, 177, 1290 × 2323 — between the iOS status bar (rows 0–176) and Safari's floating toolbar (from row ~2510) |
| `samui-property-360-mobile` | samuiproperty360.com, iPhone, PNG 1290 × 2796 (`489b1932…6783`) | 0, 177, 1290 × 2323 |
| `valerie-dart-don-mobile` | valeriedartdon.com, iPhone, PNG 1290 × 2796 (`3c07847c…88c0`) | 0, 177, 1290 × 2323 |

Full hashes: `f12e6ea0d81cb9c82246a1b88aea2a009f9d838379d3eebe30d6d36c3670ed17`,
`bce24f877e9e70ae33b1d1b9c8e3f665e3920a10d51fd1144333fa634fcd73a7`,
`7d9f5b5a2e7dddd8514bad7705e50d37f51ddf30133c73516b4c47bd799347d6`,
`0d63e4d651fa9af4c74a0aef74248249f580a6bea933eb67b3afca470327fe18`,
`489b193254c34d3ab9584cbc0738d0d87f25f65153095d9209e3a9df0f6d6783`,
`3c07847c6d61046420a2dc89563b4ed9d9abd2b5d22c5ed0da98089eded788c0`.

The original screenshots are not in this repository. The floating WhatsApp button on Teddy
Bike Samui and the "Hallway" hotspot on Samui Property 360 are part of those live pages and
were left as captured. Earlier masters (desktop renders, September captures) are in git history.
