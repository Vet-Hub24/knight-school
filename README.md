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
