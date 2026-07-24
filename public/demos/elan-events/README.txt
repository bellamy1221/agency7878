ÉLAN EVENTS — WEBSITE PACKAGE
=============================

Contents
--------
index.html      — the complete website (all CSS & JS inline, no build step needed)
assets/         — all 24 photographs, optimized (max 2048px, progressive JPEG)

The only external dependency is Google Fonts (Fraunces, Manrope, Mrs Saint
Delafield), loaded via <link> in index.html — standard for production sites.

How to publish
--------------
The site is 100% static. Any of these work as-is:

1. Netlify   — drag & drop this folder at https://app.netlify.com/drop
2. Vercel    — `npx vercel` inside this folder, or import via dashboard
3. GitHub Pages — push the folder to a repo, enable Pages in Settings
4. Any hosting/FTP — upload index.html and the assets/ folder to the web root

No server, database or build tools required.

Editing
-------
All content is in index.html: copy is plain HTML, colors and spacing are CSS
variables in the first <style> block (:root section), interaction logic is the
single <script> at the end of the file.

Forms
-----
The inquiry form is front-end only (demo success state). To receive real
submissions, point the form at a service like Formspree/Basin, or wire the
submit handler to your endpoint (see the 'Inquiry form' block in the script).
