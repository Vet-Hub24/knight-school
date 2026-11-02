# Knight School: architecture and preservation plan

Baseline: main at `40fe67aaef41227e7e6b7dae4a2c097ebbf30226`.
Development only: `development/polished-training-2026-11-02`.
Do not merge or deploy without Jake's approval.

## Existing architecture, inspected before editing

The site is static HTML/CSS and native ES modules. GitHub Pages deploys only pushes to main via `.github/workflows/deploy.yml`. No build, server, paid API, database service or package dependency is required for the application.

`app.js` owns navigation, browser-local state, one shared `workspace()` / `renderBoard()` / `renderPanel()` implementation, drills, imports, master playback and the ChatGPT handoff. Every board uses `pieces.js`. `chess.js` validates moves and PGN. `engine.js` launches a local Stockfish 19 lite Worker, bundled with WASM and corresponding source. `coach.js`, `free-coach.js` and `coach-questions.js` supply authored explanations, legal/tactical observations, before/after engine estimates and contextual questions.

Existing content: 3,865 named variations, 28 guided openings, 28 strategy lessons, 21 endgame lessons, and 16 master games. Openings support White/Black/both-side recall and continuation branches. Coach questions auto-advance and retain explanations. The ChatGPT prompt is previewed, copied and opened separately, with a saved destination.

Existing persistence: `knight-school-v1` holds completed/saved/weak lessons, attempts, correct moves and training days. Separate `knight-school-chats-v2` and `knight-school-questions-v1` keys hold chats/questions; `knight-school-chatgpt-destination` holds the user's project URL. Existing progress export includes only the main progress object. There is no restore, spaced-repetition scheduler, install manifest, service worker, or durable mistake notebook in this baseline.

## Incremental preservation rules

1. Replace only the shared piece renderer and add CSS/control polish. Retain `.workspace`, `.board-panel`, `.lesson-panel`, `.study-layout` and `#learningExtras` rather than rebuilding their hierarchy.
2. Add isolated browser-only training modules, preserving existing storage keys and lesson IDs. Validate backups before applying a merge; offer a pre-restore backup and never silently clear records.
3. Add a scoped PWA manifest, app icons and service worker for GitHub project paths. Installation is a user action; Safari uses Share → Add to Home Screen. Keep online-first updates and avoid a stale lesson/JS cache.
4. Expand guided content without reindexing or replacing the 3,865 `eco-*` IDs. Preserve the original guided IDs.

All work stays in the development branch. The existing main-only Pages workflow is preserved.
