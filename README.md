# ABC Kingdom 🏰🔤

A magical alphabet adventure for kids. Learn the English ABC through pictures, words, and writing - collect rare fantasy animals and earn crowns along the way.

Sister project of [Multiplication Kingdom](../multiplication-kingdom) - same design language, same profile/collection systems, new game core.

## How the Game Works

1. **Welcome screen** - short explanation, pick a language, "Start Adventure!"
2. **Profiles** - pick an existing profile or create a new one (many kids can share one computer; each profile has its own progress, points, and animal collection)
3. **The letter board** - all 26 letters A-Z. Click a letter to play its 3 levels:

| Level | Game | Points |
|-------|------|--------|
| 1 | **Picture Hunt** - click all the emoji pictures that start with the letter | 10 |
| 2 | **Word Hunt** - click all the words that start with the letter | 20 |
| 3 | **Word Scribe** - copy 5 example words into the text box | up to 30 (6 per word) |

- Levels unlock in order (1 → 2 → 3) per letter
- Every level completed for the first time grants a **mystery fantasy animal** 🦄
- Complete **at least one level in every letter** to win a **crown** 👑 and restart the adventure

## Features

- 3 UI languages: Hebrew (default, RTL), English, German - game content is always the English ABC
- Multi-profile with champions table (leaderboard)
- Sound effects (WebAudio, toggleable), confetti celebrations
- PWA: installable, works offline (service worker cache)
- No build step, no dependencies - pure HTML/CSS/JS

## Run Locally

Just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8080
```

## Deploy

Pushed to GitHub with the included GitHub Pages workflow (`.github/workflows/static.yml`) - deploys the static site on every push to `main`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Full app - markup + all game logic |
| `letters.js` | A-Z content data (emoji items + word lists per letter) |
| `translations.js` | he/en/de UI dictionaries |
| `style.css` | Shared kingdom theme + ABC-specific styles |
| `sw.js` | Service worker (offline cache) |
| `manifest.json` | PWA manifest |

All progress is stored in `localStorage` under the key `abc_kingdom_v1` - on this computer only.

---

A KONAMI APP ☕ [Buy me a coffee](https://buymeacoffee.com/leokonami)
