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


## Opponent-deviation and practice follow-up — 2026-11-04

Incremental work on `development/voice-and-learning` / draft PR #3. Main and production were not changed.

- Eleven original decision exercises cover all ten practical courses, including an extra early-queen scenario. Each has three legal response choices, specific reasoning, and an illustrative continuation. Playable alternatives are explicitly distinguished from tradeoffs; only Stockfish grades actual practice mistakes.
- Choices work through buttons or the board. Next/Back, Retry, course return, and saved exercise/choice/cursor restore preserve the teaching interface. Arrows remain hidden until a response is chosen, then show the next illustrative move.
- Opening and plan lessons can launch free Stockfish practice from the exact displayed FEN, with starting plans for both sides and return to the course.
- Finish & review analyzes up to six recent moves for the selected side using local Stockfish. It chooses one estimated mistake (or a useful moment if none was identified), explains it, saves eligible mistakes, and supports retry without losing the practice-game board/history. The sample size is stated; this is not exhaustive game analysis.

Validation executed: all 23 automated tests passed, including exact SAN legality at every step of all 33 choices, the early-queen rook-capture illustration, backup/restore of decision state, player-specific practice sampling and mistake selection. Existing content, pieces, SRS, backup and PWA tests remained green. Syntax and diff-whitespace checks passed.

Browser validation: opened all ten exercise pages, chose all 30 main-course responses and stepped through a reply; no application-origin error logs and every board retained 64 squares. Early-queen choice by button and board worked; reload resumed the choice/cursor and returned to the correct original course ply. Actual engine practice as Black after Qh5, g6, and the engine reply produced a blunder estimate; the short review recommended Nc6. The retry accepted Nc6, incremented notebook recall once, and restored the exact practice board. Notebook showed the saved g6 record with one successful recall. Learn/Test switching, normal e2-e4 guidance and the manual Ask ChatGPT preview remained functional. Phone 390 / content 375 and tablet 820 / content 805 had no horizontal overflow; phone panel remained below the board.

Limits: physical iPhone/Safari audio and installation remain device checks; browser tests use Chromium at responsive frame widths. Illustrative lines are original teaching examples, not frequency rankings or forced best continuations. Reviews use short searches and may change with deeper analysis. Video links and hosting are unchanged.


## Speech failure follow-up — 2026-11-04

The cloud browser listed no local speech voices. The previous local-only gate blocked speech before attempting the browser default, while the initial UI misleadingly said it was ready. Added an explicitly labeled Browser default option, Test voice and Refresh voices, clear availability text, a strong active-utterance reference, actual onstart-based status, a six-second startup timeout, and speech error-specific recovery. Browser default may use the browser speech service; speech still requires an explicit tap and no paid AI API is involved. Confirmed local voices remain preferred, with no implicit selection of an enumerated remote voice.

Actual browser test: Test voice with Browser default returned `synthesis-failed` while no local voices were listed. This environment still could not produce verified audible speech. The UI reports the missing working voice; it must not claim audio passed. Physical Safari/iPhone testing remains outstanding. Automated coverage verifies fallback opt-in, onstart status, silence timeout, error handling, cancellation and local-only behavior; full suite: 24 tests.
