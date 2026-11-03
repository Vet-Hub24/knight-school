# Knight School — PR #2 QA report

Tested November 2, 2026 (America/New_York). Branch: `development/video-academy`.
Starting head: `1a3febbf3c720bab412917c4bc9a4a15ee59d479`.
Main remains `2c2c7e777fd563d8b24229e2e7f79b761973da76`. No merge, deployment, or live data changes were performed.

## Result

Core application checks passed. External video playback/access and physical iPhone installation remain **unverified**; this is not an unconditional release sign-off. Keep the draft PR pending the owner's review.

| Feature | Result | Evidence / scope |
| --- | --- | --- |
| Updated menu | PASS after fix | All four new entries present. Added scrolling because expanded navigation exceeded short-screen height; retested the mobile menu and all four pages. |
| Guided Lessons | PASS | Exactly 40 cards. Individually opened and advanced every study in Chromium; every one displayed a teaching panel, move explanation, and White/Black plans. Automated checks validate every move and authored note. |
| Existing opening reference | PASS | All 3,865 original lines validate legally; original IDs and files preserved. |
| Chess.com PGN | PASS | Imported synthetic exported-format PGN with headers and castling; eight half-moves replayed, including forward/back/final controls. This tests format compatibility, not account integration. |
| Lichess PGN | PASS | Imported synthetic exported-format PGN with headers, clock comment and variation; eight half-moves loaded and replayed. |
| Invalid PGN | PASS | Invalid move text produced an import error and retained the prior board and teaching interface. |
| Actual Stockfish | PASS | Browser Worker/WASM returned three candidates, depth and evaluations. Reviewed a prior move with before/after searches. After fixes, Lucena analysis returned depth 27 and candidate Kg6. |
| Move-quality feedback | PASS | Real review showed “Close to the earlier estimate” and estimated loss 0.09; mistake test produced a negative grade. Automated checks cover mover-relative grades and positive mate handling. Estimates can change with search depth. |
| Mistake Notebook | PASS | Loaded `6k1/8/8/3q4/8/8/8/3R2K1 w - - 0 1`, played Kh2, reviewed with Stockfish. Saved record showed Rxd5 as earlier candidate. Persisted after reload; retry Rxd5 incremented successful recalls to 1. |
| Staunton pieces | PASS | Twelve distinct licensed SVGs validated. Board rendered all piece types, solid White and Black pawns, common sizing; promotion uses the shared renderer. |
| Moves and captures | PASS | Browser legal pawn, knight and rook moves; illegal e2-e5 rejected; Rxd5 captured the queen. Mobile e2-e4 worked. |
| Castling / en passant | PASS | Browser White O-O moved king to g1 and rook to f1; undo worked. En passant e5-d6 removed the d5 pawn. |
| Promotion | PASS | Four-choice dialog appeared; knight underpromotion rendered correctly on a8. |
| Flip / themes | PASS | Flip changed first board square to h1; Walnut, Tournament and Slate selected successfully. |
| Teaching panel | PASS | Preserved on lesson, game-review and practice boards. Beside board on desktop, below it in 390px/820px frames. No removal or restructuring of workspace markup. |
| Free Coach | PASS | Rule-based response displayed; hanging queen candidate explained. Question submission advanced immediately, focused current question near viewport top; Back, Restart and collapsible history retained. Free text answers are saved, not automatically graded. |
| White / Black opening drills | PASS | Completed Italian line separately as White and Black. Again scheduled 10 minutes; Black Easy scheduled 4 days. Refresh retained completion and two sessions. |
| Spaced repetition | PASS | Separate side keys verified in exported backup. Automated tests cover intervals, due sorting and independent side schedules. |
| Backup / restore | PASS | Actual complete JSON download read successfully. Malformed JSON disabled merge. Exported backup validated and merged through browser UI; counters stayed at 12/12 and two sessions. Automated coverage includes legacy import, duplicate merge prevention and quota rollback. |
| Ask ChatGPT | PASS in Chromium | Preview included exact question, FEN, move history and available analysis state; question edit changed copied prompt. Ask/Copy did not open an external tab. Saved QA project destination survived reload. Mobile modal fit 375px content width and Copy succeeded. No message was sent to ChatGPT. Physical Safari clipboard/popup behavior remains unverified. |
| Master games | PASS | All 16 listed; Opera autoplay advanced to 5/33 steps, paused and stepped backward. |
| Tactics / advanced endgames | PASS | Black Nf2 fork drill completed; Lucena line reveal, explanation and actual Stockfish analysis worked. Automated tests validate all 28 strategy and 21 endgame lines. |
| Desktop / tablet / phone-width layout | PASS within scope | Actual Chromium pages and 390px/820px iframe viewports. Content widths 375/805px due to scrollbar. All four new pages had no horizontal overflow; mobile Coach focus and modal tested. This is responsive browser testing, not physical iPhone testing. |
| JavaScript errors | PASS observed scope | No application-origin console errors in checked test tab. Some browser extension metadata errors and automation/CDP timeouts occurred; excluded from app errors. Timed-out actions were inspected and retried when necessary. |
| PWA configuration / cache logic | PASS automated | Manifest project scope, icons, dependencies and service-worker install/fetch/activation simulated and checked, including offline WASM/CSS/navigation and isolation from other projects. HTTP preview correctly explains HTTPS is needed. |
| Physical iPhone install / real offline session | NOT TESTED | No physical iPhone available; local preview uses HTTP, so no browser-level offline or installed Safari session is claimed. |
| Video Academy page | PASS | All six category cards and both return-to-practice links render; external links use separate tabs and noopener/noreferrer. No paid API or hosting dependency added. |
| Every category / video plays publicly | BLOCKED / NOT VERIFIED | Beginner and Sicilian category URLs returned HTTP 200 with video links. Four tagged category URLs returned 403. Browser showed Lichess Cloudflare security verification. No CAPTCHA bypass attempted. Could not distinguish client access restriction from a bad destination for the four categories or play every underlying video. No individual-video catalog exists in this PR. |

## Fixes made only on development

1. `.sidebar` now scrolls vertically and its sections do not shrink. The expanded menu exceeded the available height on short screens. Retested desktop menu, mobile navigation and all four pages at phone/tablet widths.
2. Bumped authored module imports, stylesheet/index references and service-worker cache from release 6 to release 7 using the existing version script. This avoids reusing the production asset graph/cache after a future approved release. Runtime coaching and chess logic are unchanged.

`npm test`: **11 tests, 11 passed, 0 failed** before changes and again after the fixes; final run completed in 4.9 seconds. `git diff --check`, `node --check app.js` and `node --check sw.js` also passed.

## Suggested video follow-up (not implemented)

- Keep category links as fallback; add a small curated list of individually verified videos with title, creator, topic, duration and practice lesson.
- Use creator-enabled, click-to-load privacy-enhanced embeds. Do not autoplay or load a third-party player until the learner clicks.
- Retain an external “Open original video” link for disabled embeds, sign-in restrictions or browser failures.
- Verify real playback, captions, public/free access and mobile fullscreen for every selected video before marking video QA complete. Category-page HTTP 200 alone does not prove every underlying video plays.
- Videos require internet and should not be precached; core lessons and Stockfish stay free and local.

## Screenshot evidence

Delivered separately: Guided Lessons with updated left menu, Game Analysis, Mistake Notebook with successful recall, Video Academy, desktop board with teaching panel, and a three-view 390px mobile review (board, teaching panel, scrollable menu). Responsive review fixtures are local QA aids and are not part of the branch or production site.

## Teach Me follow-up (development only)

Added ten practical opening courses (Italian, Ruy Lopez, Sicilian, French, Caro-Kann, Queen’s Gambit, Slav, King’s Indian, London, English). Each reuses its original legal line and exact per-move notes, with a new overview, deeper structure/plans, terminology, a legal alternative board comparison and return, Continue walkthrough, and a final multiple-choice check. Four transfer chapters add explanation around existing development, fork, opposition and Lucena exercises. Quiz answers are session-local; existing drill completion and spaced practice retain their normal persistence.

Mistake cards no longer reveal the best move before retry. The retry panel labels the original move, task, optional candidate and explanation in order. No stored mistake records were migrated or deleted.

Validation: 12/12 automated tests passed, including every new alternative sequence. Chromium checked all ten course/alternative/return flows; completed Italian walkthrough and wrong/right quiz feedback; actual Stockfish returned depth 19 candidates; all four transfer chapter panels opened. At 390px frame width London Continue and comparison/return worked with no horizontal overflow (375px content). Startup initialization error found and fixed before saving. The previous physical-iPhone and external-video limitations still apply. No new paid services or video dependency. Release asset version 8 includes teach-me.js in offline cache.

## Board teaching markers (development only)

Added non-interactive SVG overlays shared by all boards: green lesson-move arrows, gold Stockfish top-candidate arrows/stars, red reviewed mistake/blunder crosses and amber inaccuracy marks. Captions state source, side to move and short-search limitations. Markers require matching analysis FEN, validate candidate legality, rotate with board flipping and hide during drills/engine games. Toggle and text legend retain access without relying on color alone. Earlier-position preview shows the player's earlier candidate separately from the opponent's current reply and restores the played position on return.

Validation: 13 automated tests pass, including marker evidence freshness, illegal candidates, side, hidden mode and flipped coordinates. Actual Chromium mistake test: Kh2 got ×, Black Qxd1 got ★; earlier view showed White Rxd5 and restored Kh2 on return. Lesson arrows, flip/hide, drill suppression and 390px frame (375px content, no overflow, pointer-events none) verified. Screenshot captured next to the engine explanations. Version 9 caches board-guidance.js. No deployment performed.

## Next-move theory teaching correction

Supersedes the previous green last-move overlay: opening arrows now point from the current piece to the NEXT taught move. Teach Me displays that move's exact authored reason before the learner acts, with expandable pawn-structure tradeoffs and both sides' long-term theory. Playing a course move advances one half-move and shows a check; a legal deviation restores the original position and shows a red retry cross at the attempted destination. Caption explicitly separates course recall from engine-proven mistake grading. Existing engine review remains available separately.

Validation: 14/14 automated tests pass. Chromium tested retry and correct first-move feedback in all ten courses, including Black's next e5 theory after e4. Phone-width (390px frame / 375px content) retry/correct flow has no horizontal overflow. Legal alternative and analysis modes are excluded from forced course input. Source research: Chess.com lesson/practice-challenge and coach documentation; ChessTempo training manual; ChessBase repertoire trainer documentation. These informed interaction patterns; original course wording and interface retained. Main not modified; no merge or deployment.

## Learn/Test and common-response branches

Added explicit Learn (arrows/theory) and Test (recall, with optional hint) modes, plus White/Black/Both controls. Test hides the learning-extras panel and authored introductory copy; ordinary recall feedback and hints remain. Completing a branch drill uses the existing independent line/side scheduling and backup record format.

Ten original response lessons added alongside the ten main courses: Italian Two Knights, Ruy Lopez Exchange, Sicilian Alapin, French Advance, Caro-Kann Exchange, Queen’s Gambit Accepted, Slav Exchange, King’s Indian Sämisch setup, London against ...c5, Symmetrical English. Every half-move has a note; reused prefixes are checked against the original line and branches have their own quiz. These are introductory illustrative branches, not exhaustive repertoires.

Browser checks: all ten branches opened, branch quizzes appeared, Test hid arrows, and switching back restored Learn. Completed the Italian response as White with one hint and verified a spaced-review result (0 errors / 1 hint). Phone-width French branch/Black Test showed no overflow or arrows; Learn restored normally. Screenshot records the Two Knights branch at ...Nf6 with its specific explanation. Automated suite now contains 15 tests; all branch sequences and prefix/note coverage are tested. No production publication.

## Reliable course navigation

Same-section sidebar links now rerun routing and return to the landing page. Added All courses and Restart this line beside Learn/Test; restarting preserves selected line and mode, and repeated Test presses begin a fresh round. Tested same-section Teach Me return (10 cards), All courses, Learn reset (0/12), repeated Test reset, Restart during Test, and phone-width All courses/restart. Automated suite 15/15 passed; asset version 12. No main merge or deployment.
