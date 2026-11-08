# Kynetic revision — reference study, copy, and motion plan

Written before implementation. Reference: `/Users/yash/Downloads/WhatsApp Video 2026-11-02 at 3.46.55 AM.mp4`.

## Inspection record

1920×1080, 30 fps, 840 video frames (28 seconds). Extracted every frame, inspected all fourteen consecutive 60-frame contact sheets, plus four larger half-second overview sheets. Sheets and all 840 thumbnails: `out/kynetic/reference/`. Time ranges below are visual observations, not extracted authoring keyframes. The source's blur is subtle at contact-sheet resolution; the requested Kynetic revision deliberately makes velocity blur more visible.

## What the reference actually does

| Frames / time | Observation | Adaptation |
| --- | --- | --- |
| 0–59 / 0–2s | “now”, “your”, “stables” arrive into a centered sentence. Then individual words move to separate vertical positions and regroup into the next sentence. Background stays still. | Start with a few centered words; animate words independently, with a stable final reading baseline. No slide-sized headings and footers competing. |
| 60–119 / 2–4s | Previous words leave individually. “introducing” stays while a small mark appears beside it and the brand arrives as a unit. | “Introducing” yields to the COMPLETE Kynetic wordmark. Do not construct K + ynetic. |
| 120–179 / 4–6s | Coin replaces a noun in the sentence, cycles, then becomes the sole focus. | SOL symbol moves out of “Built on Solana” into the funding action; preserve official mark geometry. |
| 180–239 / 6–8s | Dark UI panel rises from below, briefly grows past resting size, then settles smaller. Later the panel departs upward as new words appear below. | Funded challenge panel rises with damped overshoot; it is a product object, not a whole website screenshot. |
| 240–299 / 8–10s | “stables” becomes “USDC”; the remaining words drop away. A compact transaction panel rises into that same visual center. | Keep the coin/amount as the anchor when escrow becomes a funded challenge. |
| 300–419 / 10–14s | Same compact panel changes height as fields/slider/details appear. The camera and center stay stable. Button becomes the main surviving object. | Submission uses the retained dataset UI. Training is a single panel changing state, not three unrelated screens. |
| 420–479 / 14–16s | Green button lingers as surrounding words arrive; it shrinks away into the sentence. A soft green wash accompanies confirmation. | Confirmation bloom is a brief soft color field behind an object; blur peaks during travel and clears on settlement. |
| 480–599 / 16–20s | Tiny rising and falling charts replace a word. One line traces, a coin follows the endpoint, then that drawing collapses into the following phrase. | Animate meaningful benchmark curves; maintain dataset colors across graph and leaderboard. |
| 600–659 / 20–22s | Payment icon replaces “paid”; sentence breaks apart and reorganizes into funding copy. | Reward coins leave the leaderboard and settle beside participant names. |
| 660–719 / 22–24s | “in one click” contracts into one dot; brand returns. There is an actual visual transformation, not an overlay wipe. | End: participant coins gather into the Solana mark area; complete Kynetic wordmark arrives beside it. |
| 720–839 / 24–28s | Calm brand hold, then short address. No stack of badges, caveats, and redundant brand lockups. | One Kynetic × Solana lockup, one product promise, and a clean hold. |

## Motion rules for this implementation

- Subject motion creates transitions. Delete all right-to-left full-frame line wipes.
- 30 fps. Word offsets settle in roughly 18–26 frames; stagger 3–5 frames. Fast part first; long deceleration. No perpetual bobbing or elastic text wobble.
- Words can occupy different y positions before gathering onto one baseline. Keep a complete phrase readable for at least one second.
- Entrance: 8–16px blur during rapid word/panel motion, then 0px at rest. Exit: 10–20px blur over a short acceleration. Keep chart text and data sharp while reading.
- Panel motion: restrained depth, perspective only during entry, one small overshoot, low broad contact shadow. Final state is flat/readable.
- Scale change belongs to a reveal: UI arrives large and settles, dataset becomes input, training result becomes graph. No arbitrary zoom on every beat.
- One plain continuous light-blue ground for narrative shots; retained paper charts and dataset interface. Soft cross-focus at boundaries, not a colored line crossing the screen.
- All logo text is one text node. Never split the initial from the rest of Kynetic. Official Solana mark is used as-is.
- Remove on-screen “illustrative”, “example reward rule”, and similar warnings. Keep the draft provenance in source documentation. This is an explanatory film, not a live transaction recording.
- Retain the dataset upload frame and same-model performance graph; shorten surrounding text and smooth their entry/exit. Retain the legible contribution table.

## Revised on-screen script / storyboard (58s)

| Time | Copy | Visual / transition |
| --- | --- | --- |
| 0–4 | More data. / More spending. | Words gather; dataset cards move behind and settle away. Volume count recedes as headline becomes question. |
| 4–7 | Better models? / Not always. | Small performance trace stays almost flat; question separates into next statement. |
| 7–10 | Pay for improvement. | “improvement” arrives last, in blue; whole sentence settles then clears with velocity blur. |
| 10–13 | Introducing Kynetic / A marketplace for model improvement. | Whole Kynetic wordmark enters and settles; no initial-letter morph. |
| 13–17 | Built on Solana / Funded escrow. Transparent payouts. | Official mark centered with restrained coin choreography; coin moves toward next panel. |
| 17–21 | Fund a model weakness. / 12 SOL escrowed | One challenge panel rises, button confirms, amount remains the focus. |
| 21–26 | Stake SOL. Submit targeted data. | Retained dataset + Cursor Track interaction; 0.1 SOL refundable stake. |
| 26–30 | Fine-tune. / Evaluate. / Measure the gain. | Dataset tiles gather into model panel; score resolves 61% → 79%. |
| 30–41 | Same model. Different datasets. | Retained chart: four separate runs from 61%; 79%,73%,67%,61%. Same creator colors. |
| 41–48 | Rewards follow impact. | Table: Maya 6 SOL, Ishan 4, Noor 2, Alex 0. Gain bars grow then payouts appear. |
| 48–53 | Every entry stake comes back. | Four SOL coins travel from central escrow to four participants; all 0.1 SOL returned. |
| 53–58 | Kynetic × Solana / Better data. Better models. | Whole brand and official mark. Crowd-curated training data; robotics, vision, LLMs. Hold cleanly. |

## Edit brief

In KyneticHackathon, use the reference's continuous light-blue ground and word-to-object choreography.
1. Words gather, separate, and yield to the next phrase; blur only during fast travel.
2. Reveal Kynetic as one word; official Solana coins lead into funded challenge UI.
3. Keep dataset submission and benchmark curves; UI settles from depth, then gives way to measured results.
4. Scores become rewards; return every stake; settle into one Kynetic × Solana outro.
Delete line wipes and on-screen example warnings. Keep 58s, 16:9.

## Revision 3 — user-requested scope

Remove every soft bloom. Keep the other narrative scenes. Replace 21–30s with one dataset-to-button flow: Upload → Uploading → Uploaded → Testing → Evaluate → Evaluation complete. All of it sits on the existing blue ground. The graph at 30–41s uses a single checkpoint clock for all four contributors, smooth cubic curves, moving endpoint markers, and a separate four-row label rail. At 41–48s replace the table with gain bars and SOL reward figures on the same blue ground. No formula or long table copy.
