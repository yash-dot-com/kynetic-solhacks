in a new film kynetic-hackathon, create an ultramarine isometric product film, grounded in a1–a5 and Kynetic’s existing navy/blue palette:

1. 0–3s: reveal the Kynetic wordmark. “Pay for model improvement. Not just more data.” use m1’s opening reveal rhythm.
2. 3–6.3s: a challenge and funded escrow appear; official Solana mark stays intact. a2’s grouping and a3’s solid parts.
3. 6.3–10s: targeted dataset slabs travel toward an AI model.
4. 10–14s: the blue slab grows into a benchmark column: 61% → 79%, +18 percentage points, labelled illustrative. use m2’s coarse-to-resolved transformation as inspiration for the turn.
5. 14–18s: reveal Solana settlement: escrow, contributor rewards, returned stakes. a4’s reading order.
6. 18–20s: Kynetic wordmark, “Better data. Measurable impact.” end with official Solana mark and “Built on Solana”; m3’s end-brand emphasis, a5’s sparse close.

1920×1080, 24fps, 20s; original instrumental pulse, no voiceover.

refs:
- a1 ../../.context/refs/kynetic-film/a1.png: overall look, large type and single blue accent; user-supplied Socratica reference. Palette adapted to existing Kynetic navy/ultramarine.
- a2 ../../.context/refs/kynetic-film/a2.png: grouping, paired visual + short explanation in beats 2–3; user-supplied Socratica reference.
- a3 ../../.context/refs/kynetic-film/a3.png: material, flat solids with clear extruded sides in beats 2–4; user-supplied Socratica reference.
- a4 ../../.context/refs/kynetic-film/a4.png: reading order, visible labels with details subordinate in beat 5; user-supplied Socratica reference.
- a5 ../../.context/refs/kynetic-film/a5.png: detail, spare final brand/CTA composition in beat 6; user-supplied Socratica reference.
- m1 ../../.context/refs/kynetic-film/motion/m1.gif: beat 1, 0.64–1.28s reveal rhythm as loose timing reference, subject swapped; https://www.are.na/block/21872071, channel mo-graph-1uxjlkjqqhc.
- m2 ../../.context/refs/kynetic-film/motion/m2.gif: beat 4 (the turn), 0.89–4.47s coarse-to-resolved transformation, loose mechanism inspiration rather than a literal copy; https://www.are.na/block/36920100, channel mo-graph-1uxjlkjqqhc.
- m3 ../../.context/refs/kynetic-film/motion/m3.gif: beat 6, 0–0.63s large type and end-brand emphasis, loose timing reference rather than copied camera; https://www.are.na/block/13678134, channel mo-graph-1uxjlkjqqhc.

assets:
- ../../.context/refs/kynetic-film/assets/solana-mark.png and .svg: official unaltered Solana mark, downloaded from https://solana.org/pages/branding/logomark/logomark.png and logomark.svg; brand source https://solana.org/branding.
- ../../.context/refs/kynetic-film/assets/kynetic-wordmark.svg: typographic wordmark based on the existing Kynetic app identity. The film renders the same Kynetic text using Inter.
- ../../.context/refs/kynetic-film/assets/Inter.ttf: Inter font, Google Fonts upstream: https://github.com/google/fonts/tree/main/ofl/inter.
- music.wav: original instrumental created for this video; no third-party music.

fill-ins:
- look: Kynetic ultramarine on navy, with isometric geometry; alternative: white/blue editorial.
- audio: instrumental with on-screen explanation; alternative: a narrated cut.
- example: reflective-object detection with illustrative scores; alternative: a task-specific language model.

render:
- swift media/kynetic-hackathon/render.swift
- ffmpeg -framerate 24 -i media/kynetic-hackathon/frames/%04d.png -i media/kynetic-hackathon/music.wav -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -t 20 -movflags +faststart media/kynetic-hackathon/kynetic-20s.mp4

The video is an animated product concept, not a recording of live funded challenges or measured project results.
