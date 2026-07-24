MOUNT — static site (publish-ready)
====================================

This folder is a fully static website. No build step required.
Drop the entire folder onto any static host and it runs.

How to deploy
-------------
Option A — drag & drop:
  Netlify Drop   → https://app.netlify.com/drop
  Vercel         → https://vercel.com/new (import as "Other")
  Cloudflare Pages → https://pages.cloudflare.com
  Surge.sh       → npm i -g surge && surge .
  GitHub Pages   → push this folder to a repo's main branch, enable Pages

Option B — serve locally to preview:
  python3 -m http.server 8000
  then open http://localhost:8000

Contents
--------
  index.html       — the page (CSS inlined, JS loaded from /js/mount.js)
  css/mount.css    — design system (kept as a separate file too)
  js/mount.js      — all interactions
  images/          — 22 on-brand SVG placeholders (see below)
  video/           — mount-hero.mp4 (8s hero placeholder)
  robots.txt, sitemap.xml

Replacing the placeholder media
-------------------------------
The images in /images/ are on-brand SVG placeholders (topographic contours
in the MOUNT palette). Replace them with real photography using the SAME
filenames and the site updates automatically. Recommended:
  hero-dawn.png, exterior-day.png, exterior-bluehour.png
  material-stone.png, material-oak.png
  room-valley.png, room-ridge.png, room-stonehouse.png, room-panorama.png
  room-bedroom.png, room-bathroom.png
  restaurant.png, dish-detail.png
  pool.png, spa.png, hiking.png
  season-winter.png, season-spring.png, season-summer.png, season-autumn.png
  reading.png, walking-mist.png
Hero video → video/mount-hero.mp4 (8-12s, muted, looped).
Keep all architecture as ONE building for visual consistency.

Notes
-----
- Concept project: fictional brand, demo booking (no real reservation),
  conceptual review placeholders, indicative transfer info.
- Fonts (Google) and GSAP load from CDNs — an internet connection is needed
  for first paint. To go fully offline, self-host Instrument Serif + Inter
  Tight and the two gsap .min.js files locally.
