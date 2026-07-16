# CLAUDE.md - ABC Kingdom

## Project Overview

Kids' web game that teaches the English ABC. Fork-by-design of `../multiplication-kingdom` (same visual theme, profile system, animal collection, crown/prestige) with a new game core: 26 letters, each with 3 sequential levels (Picture Hunt / Word Hunt / Word Scribe).

## Stack

- Pure static site: HTML + CSS + vanilla JS, no build step, no framework
- All game logic lives inline in `index.html` inside one IIFE
- PWA (service worker + manifest), deployed via GitHub Pages workflow

## Run / Dev

```bash
python -m http.server 8080   # or npx serve .
```

Open http://localhost:8080. No server restart needed - just refresh. Note: `sw.js` caches aggressively; bump `CACHE_NAME` in `sw.js` on every release, or use DevTools > Application > "Update on reload" during dev.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | All markup + game logic (IIFE at the bottom) |
| `letters.js` | `LETTERS_DATA`: per-letter `items` ({e: emoji, w: word}) and `words` arrays. Self-validates on load (console error if a word doesn't start with its letter) |
| `translations.js` | `translations` object: he (RTL, default) / en / de. UI strings + 44 animal names |
| `style.css` | Base theme copied from multiplication-kingdom + ABC additions at the bottom (letterGrid, pickTile, typeBox...) |
| `sw.js` | Offline cache. **Bump `CACHE_NAME` when shipping changes** |
| `manifest.json` | PWA manifest |

## Architecture / Data Model

- `localStorage` key: `abc_kingdom_v1` (plus `abc_kingdom_v1_skipWelcome`)
- Profile shape: `{ id, name, avatar, createdAt, stats: {points}, letters: { A: {l1,l2,l3} }, animals: [{emoji,id,key:"A:l1"}], crowns }`
- Level rules: L1=10pts, L2=20pts, L3=6pts/word (5 words). Levels unlock sequentially per letter. Rewards (points + 1 mystery animal) only on FIRST completion; replays allowed with no rewards
- A letter counts as "completed" with >=1 level done. All 26 completed => crown ceremony => optional restart (crowns kept, letters+animals reset, points kept)
- i18n: `data-t` attributes + `t(key, params)`; Hebrew is RTL - English game content is wrapped in `.ltrText`

## Constraints / Gotchas

- Content letters/words are ALWAYS English regardless of UI language
- Hard letters (Q, U, X, Z) have fewer than 7 items - level target count is `min(5, pool.length)`, so X only needs 3 picks and awards 18 pts in Level 3. This is intentional
- Level 3 comparison uses `normWord()` (lowercase, strip non-alphanumerics) so "X-ray"/"xray"/"X RAY" all match
- Distractor pools filter out anything starting with the target letter (defensive; data is per-letter anyway)
- Mobile (<500px) is blocked by `#mobileBlock` - desktop/tablet only, same as multiplication-kingdom
- GA tag `G-R72F3FHJ8B` is shared with multiplication-kingdom (assumption - swap if Or creates a new property)
- User-generated content (profile names) must go through `escapeHtml()` before any innerHTML

## Deploy

Push to `main` on GitHub => `.github/workflows/static.yml` publishes to GitHub Pages. Remember to bump `CACHE_NAME` in `sw.js` so players get the new version.

## Never Commit

`.env`, credentials, tokens (none are used today - keep it that way; this is a fully client-side app).
