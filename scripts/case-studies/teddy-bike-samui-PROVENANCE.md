# Teddy Bike Samui case study — image provenance

Every image on `/projects/teddy-bike-samui/` is a resized copy of an original capture supplied by
the founder. None is generated, retouched or composited. The original files are **not** in this
repository and are not published.

## Source archive

`teddy-bike-portfolio-captures` — 15 PNG captures, `MANIFEST.md` and `_capture-log-first-pass.json`,
supplied in two parts:

| Part | SHA-256 |
|---|---|
| `teddy-bike-portfolio-part-01.zip` (8 files) | `5d67f1df9feb4b8850deadb2bb83700c33a10d5bf0352e1654ea8662544e7dcf` |
| `teddy-bike-portfolio-part-02.zip` (9 files) | `664bf566df75ea13f1a94b2fbb2f4ace4ced38e458718a5b996270f33f07b9db` |

All 15 PNG files matched `MANIFEST.md` (dimensions and SHA-256) when this case study was built.

## What the captures show (from `MANIFEST.md`, checked against the Teddy Bike Samui repository)

- **Before** — the original website: the production files recovered from Netlify Drop
  (`site/` in `SWAPUSM/teddy-bike-samui-website`, files dated 14 July 2026; `docs/import/site.sha256`
  10/10 OK). The same design appears in Motion's own iPhone and tablet captures of
  teddybikesamui.com from 24 September 2026 (`scripts/work-masters/teddy-bike-*`).
- **After** — the evolved website: production package `teddybikesamui-production-d12579f`
  (approved 3 October 2026; ZIP SHA-256 `48f6a9fc…de58`), described in that repository as the version
  live now. Not checked against the live domain.
- Captured 23 October 2026 with Chromium (Playwright), in English. Desktop: 1440 × 900 CSS px at 2×.
  Mobile: 390 × 844 CSS px at 3×, with mobile and touch emulation. No CSS injected and no element
  added or removed.

## Images used

| Published name (`public/projects/teddy-bike-samui/`) | Master | Master SHA-256 | Treatment |
|---|---|---|---|
| `before-desktop-hero-{800,1280,1920}` | `before-desktop-hero.png` (2880 × 1800) | `206a8380…2ae4` | resize |
| `after-desktop-hero-{800,1280,1920}` | `after-desktop-hero.png` (2880 × 1800) | `e9f6ad2c…0949` | resize |
| `before-mobile-hero-{390,780}` | `before-mobile-hero.png` (1170 × 2532) | `19dae25b…d6cc` | resize |
| `after-mobile-hero-{390,780}` | `after-mobile-hero.png` (1170 × 2532) | `9f0ab971…6507` | resize |
| `before-mobile-choose-your-ride-{390,780}` | `before-mobile-full.png` (1170 × 28584) | `658cc3f4…acdd` | crop x 0, y 6000, 1170 × 3678 — the whole “Choose your ride” section on a phone, cut at its own background edges — then resize |
| `after-desktop-showroom-{800,1280,1920}` | `after-desktop-showroom.png` (2880 × 1800) | `34058943…ab96` | resize |
| `after-mobile-showroom-{390,780}` | `after-mobile-showroom.png` (1170 × 2532) | `f192e86a…37f3` | resize |
| `after-mobile-menu-{390,780}` | `after-mobile-menu.png` (1170 × 2532) | `c01ba6fd…2511` | resize |
| `after-desktop-booking-{800,1600}` | `after-desktop-booking.png` (2880 × 1800) | `8a4338fc…8507` | resize |
| `after-desktop-full-{800,1280}` | `after-desktop-full.png` (2880 × 13348) | `a5def4b9…56f1` | resize (shown in a scrollable frame) |
| `after-desktop-contact-{800,1600}` | `after-desktop-contact.png` (2880 × 1800) | `8856b30e…ef87` | resize |
| `detail-header-logo-{300,600}` | `after-desktop-hero.png` | `e9f6ad2c…0949` | crop x 0, y 0, 600 × 136 (header: menu button, logo, wordmark), then resize |
| `detail-header-controls-{220,440}` | `after-desktop-hero.png` | `e9f6ad2c…0949` | crop x 2420, y 12, 440 × 112 (EN/FR switch, Book now), then resize |
| `detail-whatsapp-button-{235,470}` | `after-desktop-hero.png` | `e9f6ad2c…0949` | crop x 390, y 716, 470 × 140 (Book on WhatsApp), then resize |
| `detail-typography-{490,980}` | `after-desktop-hero.png` | `e9f6ad2c…0949` | crop x 380, y 260, 980 × 430 (eyebrow, title, subtitle, introduction), then resize |
| `detail-vehicle-panel-{202,404}` | `after-desktop-showroom.png` | `34058943…ab96` | crop x 1806, y 740, 404 × 590 (vehicle panel), then resize |
| `mobile-home-rental-{390,780}` | `after-mobile-full.png` (1170 × 28239) | `f64d13d7…6d48` | crop x 0, y 5343, 1170 × 1767 — “Rental without the hassle” from its top edge to the gap after its second point — then resize |
| `mobile-home-activities-{390,780}` | `after-mobile-full.png` | `f64d13d7…6d48` | crop x 0, y 8244, 1170 × 2360 — “Activities” from its top edge to the gap after the first card — then resize |
| `mobile-home-how-it-works-{390,780}` | `after-mobile-full.png` | `f64d13d7…6d48` | crop x 0, y 15183, 1170 × 2214 — “How it works” from its top edge to the gap after step 2 — then resize |
| `mobile-home-ride-waiting-{390,780}` | `after-mobile-full.png` | `f64d13d7…6d48` | crop x 0, y 24825, 1170 × 1296 — the whole “Your ride is waiting” section, cut at its own edges — then resize |
| `og-image.jpg` (1200 × 630) | `after-desktop-hero.png` | `e9f6ad2c…0949` | crop to the top 2880 × 1512 (same 1.905 ratio), then resize |

Full hashes are in `teddy-bike-samui.json`. Each size exists as AVIF (quality 55) and WebP
(quality 78), the same settings as the homepage portfolio images.

Not used: `before-desktop-full.png`, `*-vehicle-xmax.png` (before and after show no visible difference); the two
mobile full pages only through the crops above. Section edges were found from the background colour of the
captures; partial crops end in the empty gap between two blocks.

The palette and typefaces shown on the page are the exact values of the site's stylesheet
(`--navy #1C3350`, `--navy-deep #142639`, `--gold #5E7A96`, `--cream #FAFAF7`, `--sage #E9EDE9`,
`--whatsapp #25D366`, `--red #C8362E`; Playfair Display and Outfit), identical in `site/` and in
production package `d12579f`.

## Rebuilding

```sh
npm run case-assets -- /path/to/teddy-bike-portfolio-captures
```

The script stops if any master differs from the SHA-256 listed in `teddy-bike-samui.json`.
