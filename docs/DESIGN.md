# ABC Kingdom - Design & Build Log

**Date:** 2026-07-17
**Author:** Or Manor + Claude
**Status:** Built, verified, committed (2 commits on `main`). Not yet pushed to GitHub.

This document preserves the original design brief and the decisions behind it, so the reasoning survives independently of any chat history or external plan file.

---

## Context

Or wanted a new kids' game website that teaches the English ABC, built on the proven design of [`multiplication-kingdom`](../../multiplication-kingdom) (sibling project in `D:\An Konami APP`). Same look, same flow (welcome → profile pick/create → main screen), same shared systems (multi-profile localStorage, champions table, language selector, sound toggle, reset, help modal, mystery animal collection, crown/prestige). The game core is replaced: instead of conquering a multiplication grid, kids work through the 26 letters, each with 3 sequential levels.

## Decisions confirmed with Or before building

| Question | Decision |
|---|---|
| Where do Level 1 pictures come from? | **Emoji** - no image assets to source or host |
| When is a mystery animal awarded? | **Per completed level** (up to 3 per letter, one per first-time level clear) |
| Keep the trilingual UI? | **Yes** - he/en/de UI (RTL for Hebrew); the ABC content itself is always English |
| Repo structure | **New folder, new fresh git repo** - completely separate from multiplication-kingdom, no shared history |
| What happens when a player finishes the whole alphabet? | Same reward mechanic as multiplication-kingdom's 100%-board prestige: crown ceremony, then optional restart |

## Scaffold

Brand-new folder `D:\An Konami APP\abc-kingdom\`, its own `git init` (not a fork/clone of multiplication-kingdom - files were copied and adapted by hand).

| File | Origin |
|------|--------|
| `index.html` | New, structured as a close clone of multiplication-kingdom's `index.html` (all JS inline, one IIFE) |
| `style.css` | Copied base theme from multiplication-kingdom + new letter-grid/level styles appended |
| `translations.js` | New he/en/de dictionaries, same `data-t` / `dir` mechanism, reuses the 44 animal-name translations |
| `letters.js` | **New** - the ABC content data, self-validates on load (see Gotchas) |
| `sw.js` | Copied, `CACHE_NAME = 'abc-kingdom-v1'` |
| `manifest.json` | Copied, renamed "ABC Kingdom" |
| `icon-512.png` | Copied from multiplication-kingdom as a placeholder (swap later) |
| `.github/workflows/static.yml` | Copied as-is (GitHub Pages deploy) |
| `README.md`, `CLAUDE.md` | Per Or's documentation standards |

`STORAGE_KEY = "abc_kingdom_v1"` so it never collides with the multiplication game's `localStorage`.

## Reused systems (ported nearly verbatim from multiplication-kingdom)

Welcome modal, profiles (create/select/delete), header controls (language, sound toggle, champions table, profiles, reset, help), leaderboard, help modal, the 44-animal collection system (`getNextAnimalFor`, collection sidebar, "My Kingdom" modal), success overlay + confetti, `closeModalWithAnimation`, `escapeHtml`, save/load, mobile-block screen, footer, gtag events (same GA tag `G-R72F3FHJ8B` - **stated assumption**, swap if Or wants a separate property).

Removed (not applicable to this game): operation selector (×/÷), board-size selector, bonus-answer input, streak pill.

## New game core

**Profile shape:**
```js
{
  id, name, avatar, createdAt,
  stats: { points: 0 },
  letters: { "A": { l1: true, l2: true, l3: false }, ... },
  animals: [],   // { emoji, id, key: "A:l2" }
  crowns: 0
}
```

**Main screen:** 26-tile A-Z letter grid (3 stars per tile = levels done). Progress pill = `lettersCompleted/26` (a letter counts once >=1 level is done).

**Letter modal:** big letter (e.g. "A a") + 3 level rows. Level 1 always unlocked; Level 2 unlocks after Level 1; Level 3 after Level 2. Completed levels are replayable for practice with no extra reward.

**The 3 levels:**
1. **Picture Hunt (10 pts)** - 12 emoji tiles (5 correct + 7 distractors from other letters), click all 5 that start with the letter
2. **Word Hunt (20 pts)** - same mechanic with 12 written words
3. **Word Scribe (up to 30 pts)** - 5 words shown one at a time with their emoji; type/copy each (case-insensitive), 6 pts per word

First-time completion of any level: fixed points + one mystery animal (key like `"A:l1"`) + success overlay + confetti, then back to the letter modal with the next level unlocked.

**Content data (`letters.js`):** per letter, `{ items: [{e, w}, ...], words: [...] }`. Distractors for Levels 1-2 are drawn from other letters' pools, defensively filtered so nothing accidentally starts with the target letter.

**Finishing the whole alphabet:** when all 26 letters have >=1 level done, a full-screen crown ceremony fires ("🏆 A-Z 🏆" + confetti). "Start New Adventure" grants +1 permanent crown, resets `letters` and `animals` (points are kept) so the child can play again and collect more crowns/animals. "Keep Playing" just dismisses the overlay without resetting anything.

## Gotchas worth remembering

- **Hard letters** (Q, U, X, Y, Z) have fewer than 7 curated items - X only has 3 real emoji (X-ray, X mark, Xmas tree). The level target count is `min(5, pool.length)`, so X levels need fewer picks and Level 3 awards proportionally fewer points (18 instead of 30). This is intentional - never fabricate fake "X words" to hit a quota.
- `letters.js` runs a **dev-time self-check on load**: every item/word must start with its own letter, or it `console.error`s. Keep this when editing the dataset.
- Level 3 answer matching uses `normWord()` (lowercase, strip non-alphanumerics) so "X-ray" / "xray" / "X RAY" all match.
- The English A-Z grid must stay left-to-right even when the UI is Hebrew (RTL) - see bug fix below.

## Verification (all passed live in the browser)

1. Welcome → create profile → 26-tile grid renders, letters read A→Z
2. Letter A: Level 1 (+10 pts, animal #1, word reveal on correct emoji), Level 2 (+20 pts, animal #2), Level 3 typed all 5 words including a rejected typo first (+30 pts, animal #3) - tile shows ★★★
3. Wrong clicks/typos shake and give error feedback without awarding progress
4. Replaying a completed level shows the "great practice, no extra points" message and grants nothing extra
5. Language switch he ⇄ en ⇄ de: all `data-t` strings translate, RTL/LTR flips correctly, animal names translate
6. Second profile created, progress kept fully separate; champions table ranks both correctly
7. Profile delete (with confirm) and reset progress (crowns kept) both work
8. Simulated 25/26 via localStorage edit + reload → state persisted correctly; completed the 26th letter live → crown ceremony fired, "Keep Playing" dismissed without resetting, then re-completing another level and clicking "Start New Adventure" awarded the crown and reset letters/animals while keeping points
9. Service worker registers and activates with zero console errors

## Bug found & fixed during verification

The A-Z letter grid inherited `dir: rtl` from the Hebrew UI, so tiles rendered Z→A instead of A→Z. Fixed by forcing `.letterGrid { direction: ltr; }` in `style.css` (commit `e0f9384`) - the English alphabet always reads left-to-right regardless of UI language.

## Analytics (Google Analytics 4)

Every meaningful user action sends a `gtag('event', ...)`. The full contract is documented in an HTML comment right above the `gtag` config in `index.html` (single choke point - to move to a new GA property, swap `G-R72F3FHJ8B` in the script `src` and the `config` call, nothing else).

Events: `tutorial_begin`, `sign_up`, `select_profile`, `delete_profile`, `reset_progress`, `change_language`, `select_content` (letter opened), `level_start`, `level_end` (fires on replays too via `first_time` param), `earn_virtual_currency` + `unlock_animal` (first-time clears only), `unlock_achievement` (`alphabet_complete` when all 26 done), `prestige` (restart for a crown), `view_item_list` (animal collection), `view_help`, `toggle_sound`.

Verified end-to-end on 2026-07-17: events fire into `dataLayer` **and** reach `google-analytics.com/g/collect` with correct custom params (confirmed via the network log while driving the full flow, including the finale `unlock_achievement` → `prestige` sequence).

## Open items / next step

- Repo is local-only (2 commits on `main`). Push to a new GitHub repo (under LEOkonami) to activate the GitHub Pages deploy.
- `icon-512.png` is the multiplication-kingdom icon as a placeholder - swap for a real ABC Kingdom icon whenever Or has one.
- GA tag is shared with multiplication-kingdom - split it out if Or wants separate analytics.
