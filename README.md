# Motion Digital Studio

**Websites that move business forward.**

The studio's own website: a single-page, mobile-first site built with Vite, React 19, Tailwind CSS v4 and Motion (Framer Motion).

## Creative concept: the motion line

The site uses one visual idea throughout: a ribbon of light that echoes the flowing "M" in the logo.

- **Hero:** the ribbon draws itself across the screen while a website stack floats in 3D and tilts with the cursor. A pulse of light travels forward along it.
- **Scroll progress:** a hairline at the top of the page fills as you read.
- **Design → Performance → Results:** the three objectives sit on one line that fills as you scroll.
- **Portfolio:** the projects are stacked, sticky panels. Each new project slides over the last one, which recedes into depth.
- **Process:** a timeline that lights up each step as you reach it.
- **Global:** arcs leave Thailand and travel around the globe.
- **Final CTA:** the ribbon returns for the closing moment.

All effects respect `prefers-reduced-motion`. On touch devices the cursor effects are swapped for lighter automatic motion.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
```

## Before launch: edit `src/config.js`

| Setting     | What to put                                                  |
| ----------- | ------------------------------------------------------------ |
| `whatsapp`  | WhatsApp number, digits only, international format (e.g. `66812345678`) |
| `email`     | Studio email address                                         |
| `social`    | Instagram, Facebook and TikTok profile URLs                  |
| `url`       | Final domain (also update `index.html`, `public/robots.txt` and `public/sitemap.xml`) |

All copy is in `src/data/content.js`: packages (with their "best for" lines), projects, process steps, payment and delivery terms, FAQ and industries. If you edit the FAQ, update the matching `FAQPage` block in `index.html` as well, so that search engines see the same answers.

**Testimonials:** the "Real businesses. Real websites." section lists the live client sites. Add *verified* client quotes to `TESTIMONIALS` in `src/data/content.js`, and they will appear under the list automatically. Nothing appears while the list is empty.

### Portfolio screenshots

Each project currently shows a hand-built HTML/CSS mockup, so there are no images to download. To show a real screenshot instead, put a tall full-page capture in `public/work/` and add `image: '/work/your-file.webp'` to that project in `src/data/content.js`. The frame scrolls through it on hover or tap.

## Logo

The official logo is used exactly as supplied. `scripts/logo-source.png` is the master file. `npm run assets` only resizes and re-encodes it (AVIF, WebP and JPEG, plus the social share image and icons) into `public/brand/`. The artwork is never cropped, recoloured or redrawn.

## Deploy to Netlify

Import this repository into Netlify. The settings are:

- **Base directory:** (leave empty)
- **Build command:** `npm run build`
- **Publish directory:** `dist`

`netlify.toml` already sets the build command, the Node version and the cache headers.

## Performance notes

- The hero renders first. The rest of the page renders as an interruptible React transition, so no single long task blocks the main thread.
- Device mockups use `content-visibility: auto`, so the browser skips their layout while they are off-screen.
- The particle canvas starts only when the browser is idle, pauses when it is off-screen or the tab is hidden, and uses fewer particles on mobile.
- Cursor tilt, magnetic buttons and spotlights run only on fine pointers, and they write to motion values or CSS variables instead of re-rendering React.
- The Montserrat variable font is self-hosted, and only the Latin subset downloads.
