# Portfolio screenshots

Generated files — don't edit by hand. Masters live in `scripts/work-masters/`:

| Master                              | What it is                                                   |
| ----------------------------------- | ------------------------------------------------------------ |
| `<slug>-desktop-master.webp`        | Desktop capture, cropped just below the browser bar, 7:4, ≥1600px wide |
| `<slug>-mobile-master.webp`         | Full iPhone screenshot (1290 × 2796 or similar), ≥780px wide |

Run `npm run work-assets` to regenerate everything in this folder:

- `<slug>-desktop-{1600,900}.{avif,webp}` and `<slug>-mobile-{780,390}.{avif,webp}`
- tiny blurred previews in `src/data/placeholders.json` (shown while images load)

Then reference the project in `src/data/content.js` with `slug: '<slug>'`, and add
`desktop: true` if it has a desktop capture. Without it, the phone is shown alone.
