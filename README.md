# ♞ Knight School — Personal Chess Trainer

A complete browser-based chess learning website with a free local analysis engine, chess lessons, opening reference, and guided coaching. **No OpenAI API key, server, subscription, or paid AI credits required.**

## Features

- Classic responsive chessboards with consistently scaled white and black pieces
- Stockfish 19 lite WebAssembly analysis that runs locally in your browser
- Opening study library and guided lessons
- Free chess Coach: tactical threats, hanging pieces, blunders, plans, and explanations
- Question-by-question Coach navigation, with prior answers in collapsible history
- **Ask ChatGPT**: copy the board position and analysis, then open ChatGPT and paste (no separate API charges)
- Master game study, endgames, move review, and locally saved progress

## Play online

Once GitHub Pages is enabled on the repository, the website will be at:

`https://vet-hub24.github.io/knight-school/`

## Publish to GitHub Pages

1. Create a **public** repository named `knight-school` under `Vet-Hub24`.
2. Upload the **contents** of this ZIP to the **root** of the repository (not the ZIP itself and not a nested folder). You may drag multiple files/folders into GitHub's **Add file → Upload files** page, or use Git from a computer. The `vendor` directory must contain the `.wasm` binary.
3. Under repository **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**.
4. This repository's workflow (`.github/workflows/deploy.yml`) automatically deploys on each push to `main`. Check the Actions tab for the green deployment status.
5. Visit `https://vet-hub24.github.io/knight-school/` and test a board and **Analyze**.

### Updating later

Edit any file and commit changes to `main`. The GitHub Pages workflow publishes the update automatically. GitHub retains commit history, making it possible to roll back.

## Run locally

Static files need a local web server for the opening JSON and Stockfish WebAssembly worker. From the repository root:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. Do not double-click `index.html` as `file://` may block modules, downloads and Workers.

## Data and privacy

Progress, Coach questions and chats use browser `localStorage`. The GitHub-hosted site and the original site have **different browser storage**; use the existing site's **Export your training progress** function and import if supported, rather than assuming the data transfers. Clearing browser data can erase saved progress.

Stockfish analysis and normal coaching run on your device, not through a paid API. **Ask ChatGPT** opens ChatGPT separately and copies a detailed prompt for you to paste and submit manually. ChatGPT Plus does **not** include API calls for embedding ChatGPT as a chatbot inside this site.

## Credits and third-party licenses

- [chess.js](https://github.com/jhlywa/chess.js) — BSD-2-Clause, license in `vendor/CHESS-LICENSE.txt`
- [Stockfish.js / Stockfish](https://github.com/nmrugg/stockfish.js) — GPLv3, corresponding source in `vendor/stockfish-source.tar.gz` and license in `vendor/STOCKFISH-LICENSE.txt`
- [Lichess chess openings](https://github.com/lichess-org/chess-openings) — CC0 opening data

The website includes and redistributes third-party components under their respective licenses.

## Notes

GitHub Pages is public static hosting. Anyone with the link can access it, and code in a public repository is visible. The site does not need a server backend, so there are no hosting API credentials to manage.

## Ask ChatGPT handoff (no API bill)

In the Coach, choose **Ask ChatGPT** to preview the full coaching prompt. Edit the question, click **Copy complete prompt**, and then click **Open ChatGPT**. This prevents Safari from navigating away before copying. You may paste a direct link to your own ChatGPT chess project or conversation; Knight School remembers that URL locally in your browser. Pasting and sending the prompt in ChatGPT remains a manual step. Your ChatGPT Plus subscription does not provide embedded API access.

## Development improvements (approval required)

Work is isolated on `development/polished-training-2026-11-02`. Main and the live GitHub Pages site must not be changed until Jake approves. The Pages deployment workflow remains main-only; the additional workflow runs tests and never deploys.

- Professional Colin M. L. Burnett Staunton SVG pieces, with solid white fills and dark outlines. Source and GPL-2.0-or-later attribution/license are in `assets/pieces/`.
- Walnut, Tournament and Slate board themes. The existing lesson panel, move list, controls, both-side plans and Coach remain in the same workspace structure. Phone/tablet layouts stack the same teaching content beneath the board.
- 40 guided opening lines, including 12 newly annotated studies in `extra-openings.js`. Every guided half-move has a note, both-side plans and a check-understanding question. The original 3,865 named variations and `eco-*` IDs are unchanged.
- Opening recall schedules per variation and side. Good recall starts at one day, then three days and gradually longer intervals. Again returns in ten minutes; Hard and Easy adjust the interval. Mistakes and hints affect the suggested grade, which the learner can change after completing the drill. These rules support recall; they are not a scientifically calibrated prediction of memory.
- A local mistake notebook saves Stockfish-reviewed inaccuracies, mistakes, blunders and missed mates. Review an entry from its original position and try the earlier candidate. Short engine searches can change their assessment; grades are estimates rather than Elo ratings or proof of a forced result.
- Complete JSON backup/restore covers the original progress, Coach questions/conversations, schedules, notebook, board theme, and saved ChatGPT project URL. Restore accepts the old progress-only JSON too. It validates before writing, downloads a safety backup, merges records, uses maximum counters to avoid repeated-import inflation, and preserves this device’s existing theme/destination. A quota failure attempts to roll back all writes.
- A free home-screen web app: manifest, Apple touch icon, standalone display, and a scope-qualified offline cache. In iPhone Safari choose Share → Add to Home Screen, leave Open as Web App on if offered, and add it. No App Store membership is involved. Back up first: browser and home-screen storage may differ. Restore the backup if needed. Physical Safari/home-screen installation must still be checked after approved publication.
- Stockfish, rules-based coaching and all lessons stay local and free. Ask ChatGPT remains an explicit preview → copy → open flow. Its saved destination key is preserved, edits require a new copy, clipboard failure has a manual-copy confirmation, and no chess prompt is sent automatically.

### Tests and local preview

`npm test` uses only Node's built-in test runner; there are no npm runtime dependencies or install steps. Serve the repository using `python -m http.server 8000`. The tests cover all original lines, all 40 guided annotations, SVG assets, both-color grading, spaced intervals, complete/legacy restore, storage rollback, manifest/icon paths and offline Stockfish/dependency delivery under `/knight-school/`.

For a future approved release, run `node scripts/version-assets.mjs 7` (use a new version each time). This gives all authored ES-module imports the same version, updates the HTML asset links and changes the offline cache version. Code/CSS/data use network-first fetching and offline fallback. A waiting service-worker update is offered through the install panel rather than interrupting a study session. Other GitHub Pages project caches are not touched.

The app icon uses the same Cburnett knight artwork and license as the board set. The SVG is retained as editable source. Installation guidance: https://support.apple.com/guide/iphone/iphea86e5236/ios . PWA manifest guidance: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable .
