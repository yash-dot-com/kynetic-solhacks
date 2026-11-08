# Kynetic hackathon film

58 seconds · 1920 × 1080 · 30 fps · H.264/AAC

The composition is `KyneticHackathon`. Its timing and shot order live in `Film.tsx`; visual scenes are in `scenes.tsx`, charts in `graphs.tsx`, and shared data/palette in `theme.ts`.

## Preview and export

- Next.js Player: `/video` on the existing dev server.
- Remotion Studio: `npm run video:studio`.
- Export: `npm run video:render`.
- Output: `out/kynetic/kynetic-hackathon.mp4`.

For an existing macOS Chrome installation, append `-- --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"` to the export command. Otherwise Remotion manages its renderer browser.

## Approved Instrument Serif film

The current 58-second cut follows the approved twelve-frame storyboard in `storyboard.tsx`. `approved-scenes.tsx` contains the narrative motion. Instrument Serif regular and italic are bundled locally for headlines and the complete Kynetic wordmark; Inter remains on UI labels and figures. `Film.tsx` loads all three font faces before rendering.

| Time | Scene |
| --- | --- |
| 0–4 | Spiral dataset-card arrival; conversational questions |
| 4–7 | Barely moving model performance; blue “Not always” |
| 7–10 | Pay for improvement; reward data that improves the model |
| 10–13 | Meet Kynetic; complete serif wordmark |
| 13–16 | Solana coin stamp, followed by “Built on Solana” |
| 16–21 | Plain-language bounty card and single funding button |
| 21–25 | Stake SOL, dataset upload, progress, uploaded confirmation |
| 25–29 | Fine-tune, evaluate, publish results diagrams |
| 29–39 | Four synchronized benchmark curves |
| 39–45 | Gain bars and SOL rewards share one animation clock |
| 45–52 | Solana escrow, entry stakes, fast payouts |
| 52–58 | Better data → models → rewards, then centered Kynetic |

No line wipes, green blooms, white-page charts, extra outro copy, or split-initial logo animation. The video uses frame-driven text travel blur, overlapping focus transitions, a trailing spiral card path, animated mechanism diagrams, and a clean final hold. The per-frame shot key prevents Chrome filter-compositing artifacts during export.

Current exported film: `out/kynetic/kynetic-hackathon-v4.mp4` (also copied to the standard `kynetic-hackathon.mp4`). Render with `--gl=angle` and the local Chrome executable when available. Previous exports remain available as v1, v2, and v3.

Motion reference study and script history: `notes/reference-study.md`. Approved contact sheet: `out/kynetic/kynetic-storyboard-instrument-serif.png`.

## Evaluation example

All four datasets are independently evaluated with the same base model and held-out benchmark. The baseline is 61%; the endpoint scores are 79%, 73%, 67%, and 61%. Positive gains are 18, 12, 6, and 0 percentage points. The sample challenge distributes 12 SOL proportionally: 6, 4, 2, and 0 SOL. Every participant receives the separate 0.1 SOL entry stake back. These are illustrative results, not a recording of a live challenge or on-chain settlement.

## Assets and component changes

- Official unaltered Solana mark: https://solana.org/pages/branding/logomark/logomark.svg (brand source: https://solana.org/branding).
- Kynetic uses the project's complete typographic wordmark in bundled Inter. No separately animated initial is used.
- Inter: https://github.com/google/fonts/tree/main/ofl/inter (SIL Open Font License).
- Instrument Serif regular and italic: https://github.com/google/fonts/tree/main/ofl/instrumentserif (SIL Open Font License; bundled license: `public/video/fonts/InstrumentSerif-OFL.txt`).
- Reflective-object photograph: existing project asset, `public/reflective-robotics.png`.
- Pale cyan data texture: user-supplied reference image.
- Dataset tiles, sky, instrumental music, transition sweeps, and UI sounds are created locally by `prepare-assets.py`.
- SnapCN scene sources are installed in `components/snap-cn/`. Font loaders use local Inter to prevent export-time network/font drift. The installed Gather Lockup, Sky Lockup, Orb Swarm, Card Rail, and Word Gather sources remain available; the revised sequence replaces their earlier showcase shots with custom reference-led motion.

The website hero and landing-page styles are unchanged by this film implementation.


## Version 5 — requested opener and lockup

The 0–4s opener uses the installed SnapCN Roster Grant with three dataset rows and a centred Buy datasets action. The last three seconds use Gather Lockup’s unmodified seven-tile wall, four-image row, and four swap slots (15 source images), populated with official Solana logo coins. Coin count is independent of the seven letters in Kynetic. An empty symbol path renders the complete Instrument Serif wordmark together. Other approved shots and the 58-second runtime are retained. Fonts and coin assets are local for reproducible export.

## Version 6 — explain the Solana role

The 45–52s Why Solana shot names the actors and use of each transaction: companies fund bounty escrow, curators stake to enter and reduce spam, and measured gains set reward shares paid in SOL. A short footer distinguishes off-chain model training/evaluation from on-chain funding/settlement. No zero-knowledge verification claim is introduced. The four-coin lockup row is enlarged 45% around its existing tile centres to match the 250px serif wordmark’s visible height; contained square images stay circular and their wrappers allow the larger diameter without clipping.
