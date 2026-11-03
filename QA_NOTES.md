# Development review and validation

Baseline main: `40fe67aaef41227e7e6b7dae4a2c097ebbf30226`.
Branch: `development/polished-training-2026-11-02`.
No merge, Pages publish, domain change, or change to the original deployment workflow is authorized before Jake approves.

## Automated checks

Run `npm test` with Node 22+. No dependency installation, API key, or paid service is involved. Eleven checks pass:

- All original 3,865 variations, guided/exercise lines, and master games are legal.
- All 12 Staunton pieces exist, render via the shared renderer and have the expected SVG canvas/White fills.
- All 40 guided studies have legal moves, exact per-move annotations, both-side plans, structures and understanding questions.
- Manifest/start URL/scope/shortcuts/icons stay below `/knight-school/`; PNG sizes match their declarations.
- A service-worker simulation under the actual GitHub project subpath installs every offline dependency, serves cached Stockfish WASM and CSS with version queries, uses network-first code updates, and does not intercept ChatGPT or evict another project's cache.
- Spaced-review intervals are deterministic, keyed by variation and side, and schedule Again for ten minutes.
- Move-quality signs are correct for Black and White; a missed queen capture creates a reusable mistake entry; repeated analysis preserves notebook recall counts.
- Complete backups round-trip all supported histories/settings/schedules without repeated-import inflation.
- Legacy progress-only restore merges completed IDs and rejects malformed, unsupported or prototype-polluting JSON before writes.
- A simulated partial-write quota error rolls back to the original data.
- Delivering or finding checkmate gets positive grading rather than a false blunder.

## Browser checks

Performed on the local development build in Chromium. The live site was not used to create test data or modified. Each implementation stage was checked before its branch commit.

| Area | Result |
| --- | --- |
| Shared board and all 32 initial pieces | Loads correctly; White is solid white and outlined; no missing SVG assets |
| Desktop teaching layout | Board remains beside the original lesson panel; move list, explanations, practice-side selector and engine controls remain visible |
| Phone/tablet widths | Tested at 390px and 820px frames; no horizontal overflow; full teaching content remains reachable below the board |
| Board moves | Legal pawn/knight/rook moves, legal highlights and recorded changes work |
| Special moves | Queen promotion, promotion-piece chooser, undo and king-side castling tested |
| Engine | Actual bundled Stockfish analysis returns candidate lines; the computer opponent makes a legal White move and hands play to Black |
| Opening lessons | Existing London and King's Pawn studies work; new Najdorf study shows the exact ...a6 explanation and White/Black plans |
| Spaced recall | Real White-side and Black-side drills schedule independent reviews; Again and Easy ratings update the due date |
| Coach questions | Submit advances, focuses/scrolls the new question to the top and retains history; Back/Next/Restart retained |
| Tactical Coach | A real Stockfish before/after review of Kh2 missing Rxd5 explains the queen capture, grades the missed mating line and saves a notebook entry |
| Mistake recall | Reopening the original position and playing Rxd5 increments successful recall and retains the explanation |
| Progress restore | Invalid JSON disables apply; a legacy sample merges with existing test records and retains completed lessons/history |
| Master games | All 16 listed; Opera Game autoplay advances at the selected interval, pauses and steps backward |
| Strategy | Original Black knight-fork exercise completes normally |
| Endgames | Existing Lucena study retains its teaching panel and can reveal the illustrated line |
| Game review | Imported six PGN half-moves and replayed e4 successfully |
| Ask ChatGPT | Preview includes exact edited question, FEN, history and available engine result; Copy includes the new question; Ask/Copy open no tab |
| Saved ChatGPT destination | Explicit Save stores a project URL and survives a full reload; original storage key preserved |
| Install help | iPhone instructions and 180px Apple icon load; progress-backup guidance available; modal fits a narrow screen |
| Errors | No application console errors observed (browser extension messages excluded) |

## Remaining device verification

A physical iPhone/Safari installation and a real browser offline session have not been performed. This environment provides Chromium, not iOS Safari. Offline fetch behavior is tested in the service-worker simulation and actual online Stockfish is tested in Chromium. After approval and deployment, verify Safari → Share → Add to Home Screen, initial offline caching, and backup/restore between Safari and the home-screen app. Browser storage may differ; the app explains this and offers complete backup/restore.

The code is ready for review, not a claim of native App Store certification or independently calibrated coaching strength. Grades remain short-search estimates. No paid AI API is present.


## Voice and learning development update — 2026-11-03

Branch: `development/voice-and-learning`. No main modification or publication.

Added local-only speech controls (read, pause/resume, repeat, stop, voice and speed), saved Teach Me line/branch/move/side/Learn-Test-Plan state, ten opening-to-middlegame plan questions, and a six-ply Stockfish reply demonstration with exact return. Existing detailed tools remain in an expandable section; open sections survive panel updates. Session data participates in validated backup/restore. Offline cache includes all new modules (release 13).

Executed validation:
- `npm test`: 19 passed, 0 failed. Includes all existing legal content, pieces, guidance, SRS, mistakes, backups, PWA caching, plus snapshot restore/validation, all ten plan records and local-only narration sequencing/cancellation.
- Browser: actual guided e2-e4, correct next Black arrow; reload and resume at ply 1; branch/Black Test restore; plan-mode reload/restore and feedback; all 10 plan screens opened.
- Browser Stockfish: analyzed starting position (depth 19), then imported a test FEN, played Kh2 instead of Rxd5, and reviewed the move. Engine reply Qxd1 demonstrated the lost rook. Next/Back and Return restored pieces and the original depth-29 analysis. Saved mistake displayed in notebook.
- Regression smoke: 64 board squares and loaded SVG images; board flip and Slate/Walnut switching; free Coach answer advanced to question 2; Ask ChatGPT still displayed its manual preview without redirecting. Expanded engine tools remained open after analysis updated.
- Responsive browser frames: phone 390 outer / 375 content and tablet 820 outer / 805 content; no horizontal overflow. Phone teaching panel was below the board; voice button visible. Desktop board and teaching panel remained together.
- No application-origin error logs observed. Browser extension metadata errors were unrelated to the application.

Limitations: cloud Chromium has no local speech voice. Real audio was not heard; fallback and injected voice sequencing were tested. Physical iPhone Safari, home-screen installation and actual airplane-mode operation were not tested in this update. Video content unchanged. Existing exhaustive chess rule regression was covered in the earlier QA release, not all repeated manually here. New change requires user review before deployment.
