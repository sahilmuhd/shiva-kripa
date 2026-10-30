# Shiva Kripa — Housewarming Invitation

Static website (HTML5 + CSS3 + vanilla JS). No build step, no backend.

## Run locally
Open `index.html` in a browser, or serve the folder:
`python3 -m http.server 8000` then visit http://localhost:8000

## Deploy (Hostinger / GitHub Pages / any static host)
Upload the contents of this folder (`index.html`, `css/`, `js/`, `assets/`) to the web root (`public_html` on Hostinger).
Google Fonts (Cormorant Garamond, Jost) load from the internet; the page falls back to Georgia/Arial if offline.

## Before sharing on WhatsApp — 2 edits in `index.html`
1. Replace every `https://YOUR-DOMAIN.com` (og:url, og:image, twitter:image) with the real domain. `og:image` must stay an absolute URL: `https://your-domain/assets/og-image.jpg` (1200 x 630).
2. Directions button (`id="directions"`, Location section): currently a Google Maps address search. Replace its `href` with the exact Google Maps share link once available.
WhatsApp caches previews; if it shows an old one, re-share with `?v=2` added to the URL.

## Details
- Countdown target: 13 Dec 2026, 9:34 AM IST (`js/script.js`, `MUHURTHAM_START`); shows a completed message after it begins, and a thank-you after 10:20 AM.
- Nav: Home, Invitation, Ceremony, Location (auto-hides on scroll down, returns on scroll up).
- Respects `prefers-reduced-motion`.
- `assets/originals/` keeps your supplied images untouched; the site uses optimized copies (`house.jpg` is the original photo with stray screenshot edges trimmed and smoothly upscaled 2x; the building is unchanged).
