# ♞ Knight School — Personal Chess Trainer

A personal chess-learning website with guided lessons, openings, endgame practice, Stockfish analysis, and a free chess coach. Built as a responsive static site, designed for desktop and iPhone.

## Features
- ♟️ Interactive chessboards and opening study
- 🧠 **Stockfish 19 Lite** analysis in your browser — no cloud engine billing
- 🎯 Free coaching for tactics, threats, and mistakes
- 💬 **Ask ChatGPT**: review and copy a complete position/question prompt, then explicitly open a saved ChatGPT conversation or project
- 📚 Guided lessons, endgames, master games, and training progress

## Live website
Once the site files have been uploaded and GitHub Pages deployment enabled:

**https://vet-hub24.github.io/knight-school/**

## Setup
The full website (including `vendor/stockfish-19-lite-single.wasm`) must be committed to the repository root. Upload **the extracted contents** of the supplied `Knight_School_GitHub_Repository_Updated.zip`, not the ZIP itself. Preserve its `vendor` directory and `.github/workflows/deploy.yml` file.

In the GitHub repository go to **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml` publishes pushes to `main`.

## Run locally
Run `python -m http.server 8000` in the project directory and open `http://localhost:8000/`. A local HTTP server is needed for the chess-engine worker and opening data.

## Privacy and cost
No OpenAI API key or paid AI credits are necessary for Stockfish or the free Coach. The Ask ChatGPT feature copies a prompt and opens ChatGPT only after you choose to; it does not embed the ChatGPT API. Training progress is saved in browser storage and does not automatically sync between the original website and GitHub Pages.

## Project status
Repository initialized. **The website files and bundled WebAssembly engine still need to be uploaded for GitHub Pages to serve the functional chess trainer.**
