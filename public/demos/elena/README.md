# ELENA ORLOVA — “Skin is living light”

Award-level single-page personal website for an independent aesthetic
cosmetologist. Fictional brand; production-ready structure.

## Concept

The identity is built on the relationship between natural skin texture, soft
daylight, water and translucent biological form. Warm porcelain/bone scenes
alternate with deep graphite/plum scenes; one muted rose-copper accent; an
editorial serif (Fraunces) against a neutral grotesk (Inter) with sparse
technical mono labels (IBM Plex Mono).

## Files

```
elena/
├── index.html          # complete semantic one-pager (6 scenes + footer)
├── styles.css          # full design system, themes, responsive, reduced-motion
├── main.js             # GSAP/ScrollTrigger choreography, membrane, form logic
├── config.js           # ← ALL replaceable brand data lives here
├── assets/
│   ├── hero.mp4        # 7 s seamless macro loop, muted, 1080p (generated)
│   ├── poster.webp     # hero poster frame (extracted from the loop)
│   ├── portrait.webp   # Elena — editorial portrait (generated)
│   ├── skin.webp       # natural skin close-up (generated)
│   ├── room.webp       # treatment room (generated)
│   ├── hands.webp      # precise non-invasive treatment (generated)
│   ├── macro.webp      # abstract skin + water macro (generated)
│   ├── profile.webp    # portrait detail, same model (generated)
│   ├── og.jpg          # 1200×630 social sharing image
│   └── membrane.glb    # procedural translucent membrane (10 242 verts, ~360 KB)
├── tools/              # regeneration scripts (membrane, media pipeline, dist build)
└── dist/               # single-file build with absolute published asset URLs
```

## Replace before real publication

1. **`config.js`** — phone, email, address, hours, social URLs, `booking.endpoint`, canonical URL.
2. **`index.html`** — `<link rel="canonical">`, `og:url`, JSON-LD `[REPLACE]` values.
3. **Credentials** (section “The specialist”) — every entry is a marked placeholder; replace with verified, documented qualifications only.
4. **Legal** — privacy notice + consent policy pages (footer + form consent line).
5. **Portrait imagery** — generated placeholders; replace with a real photoshoot of the actual specialist.
6. Remove the “demonstration website” note in the footer once all of the above is done.

## Booking endpoint contract

`POST` JSON to `config.booking.endpoint`:

```json
{ "name": "...", "contact": "...", "concern": "...", "format": "In studio|Online",
  "consent": true, "requestId": "uuid", "source": "elena-orlova-site", "sentAt": "ISO" }
```

Any 2xx = success. While the endpoint is empty the form **never fakes
success** — it shows direct contact details instead. Duplicate submissions are
blocked (pending flag + stable `requestId`), plus a honeypot field for bots.

## Behavior notes

- Content is fully readable with JavaScript disabled (no CSS-hidden content;
  accordion panels open, section themes fall back per-section).
- `prefers-reduced-motion`: no smoothing, no pinning, no autoplaying video,
  static membrane fallback image.
- The 3D membrane renders only on ≥900 px pointers with WebGL; otherwise an
  art-directed image fallback is shown. If the GLB or CDN fails, the fallback
  stays — no broken UI.
- CDN dependencies: GSAP 3.12 + ScrollTrigger, Lenis 1.1, three 0.160 (ES modules).

## Deploy

Static hosting of the folder as-is (relative paths). `dist/index_published.html`
is a self-contained single-file variant whose media point at published URLs.
