import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { CardRail } from "@/components/snap-cn/card-rail";
import { WordGather } from "@/components/snap-cn/word-gather";
import { GatherLockup } from "@/components/snap-cn/gather-lockup";
import { SkyLockup } from "@/components/snap-cn/sky-lockup";
import { OrbSwarm } from "@/components/snap-cn/orb-swarm";
import { ButtonPress } from "@/components/snap-cn/button-press";
import { CursorTrack } from "@/components/snap-cn/cursor-track";
import { C, DATASETS, FILM_THEME, FONT, K_MARK } from "./theme";
import {
  Check,
  Coin,
  FooterNote,
  Frame,
  Heading,
  SolanaBadge,
  Wordmark,
  clamp,
  inStyle,
  progress,
} from "./primitives";

const pictures = Array.from({ length: 7 }, (_, i) =>
  staticFile(`video/datasets/${i}.svg`)
);

export function VolumeRail() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <CardRail
        cards={pictures.map((image) => ({ image }))}
        heading="We keep buying more data."
        flicks={3}
        every={30}
        from={2}
        backdrop={`${C.paper}|${C.paper}`}
        theme={{ ...FILM_THEME, background: "#ffffff00" }}
        mode="light"
        fontFamily={FONT}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px 90px",
          background: C.ink,
          color: "white",
          fontFamily: FONT,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontSize: 30,
        }}
      >
        <span>Data volume</span>
        <span
          style={{
            fontSize: 44,
            letterSpacing: "-.04em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.round(
            interpolate(f, [0, 110], [12000, 98000], clamp)
          ).toLocaleString("en-US")}{" "}
          examples
        </span>
      </div>
    </AbsoluteFill>
  );
}

export function Promise() {
  return (
    <AbsoluteFill>
      <WordGather
        text="Pay for the improvement."
        accent={C.blue}
        maxWidth={540}
        fontWeight={600}
        fontFamily={FONT}
        theme={FILM_THEME}
        mode="light"
        speed={0.9}
      />
    </AbsoluteFill>
  );
}

export function Introduction() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <GatherLockup
        images={Array.from({ length: 15 }, (_, i) => pictures[i % 7])}
        lines={[["Better"], ["data", "for"], ["better", "models"]]}
        captions={[
          "Perception",
          "Low light",
          "Angles",
          "Task data",
          "Navigation",
          "Labels",
          "Demonstrations",
        ]}
        wordmark="ynetic"
        logo={K_MARK}
        font={FONT}
        backdrop={C.paper}
        wordmarkTracking={-0.045}
        theme={FILM_THEME}
        mode="light"
        speed={0.83}
      />
      <div
        style={{
          position: "absolute",
          top: 786,
          left: 0,
          right: 0,
          fontFamily: FONT,
          fontSize: 32,
          textAlign: "center",
          color: C.muted,
          ...inStyle(f, 55),
        }}
      >
        A performance-based AI data marketplace.
      </div>
    </AbsoluteFill>
  );
}

export function SolanaIntroduction() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.paper, fontFamily: FONT }}>
      <OrbSwarm
        script="Built on Solana.|Built on Solana.|Fund challenges.|Reward impact.|Return stakes.|Built on Solana."
        background={C.paper}
        ink={C.ink}
        orbColor="#76ccdf"
        softness={0}
        fontFamily={FONT}
        speed={1.4}
        theme={FILM_THEME}
        mode="light"
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          top: 115,
          ...inStyle(f, 4),
        }}
      >
        <SolanaBadge large />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 64,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 29,
          color: C.muted,
          background: C.paper,
          paddingBlock: 18,
        }}
      >
        Escrow · rewards · refundable entry stakes
      </div>
    </AbsoluteFill>
  );
}

export function Funding() {
  const f = useCurrentFrame();
  return (
    <Frame label="Start with a model weakness" number="01 / FUND">
      <Heading>Fund a specific problem.</Heading>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 336,
          width: 750,
          height: 600,
          background: "#fff",
          border: `1px solid ${C.grid}`,
          ...inStyle(f, 5),
        }}
      >
        <Img
          src={staticFile("video/assets/reflective-robotics.png")}
          style={{ width: "100%", height: 265, objectFit: "cover" }}
        />
        <div style={{ padding: "30px 34px" }}>
          <div style={{ fontSize: 22, color: C.muted }}>
            CH-042 / ROBOT PERCEPTION
          </div>
          <div
            style={{
              fontSize: 41,
              lineHeight: 1.14,
              letterSpacing: "-.045em",
              fontWeight: 600,
              marginTop: 18,
            }}
          >
            Detect reflective objects.
          </div>
          <div style={{ fontSize: 27, color: C.muted, marginTop: 18 }}>
            Published baseline: 61%
          </div>
          <div
            style={{ display: "flex", gap: 12, marginTop: 24, fontSize: 24 }}
          >
            <span style={{ padding: "9px 16px", background: C.light }}>
              Bounty 12 SOL
            </span>
            <span style={{ padding: "9px 16px", background: C.light }}>
              Entry 0.1 SOL
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1050,
          top: 348,
          zIndex: 2,
          fontSize: 30,
          color: C.muted,
          width: 620,
          textAlign: "center",
          ...inStyle(f, 8),
        }}
      >
        A funded commitment
        <br />
        <span
          style={{
            color: C.ink,
            fontSize: 56,
            fontWeight: 600,
            letterSpacing: "-.04em",
            display: "block",
            marginTop: 16,
          }}
        >
          12 SOL in escrow.
        </span>
      </div>
      <Sequence width={1000} height={720} style={{ left: 900, top: 342 }}>
        <ButtonPress
          label="Fund 12 SOL"
          pending="Funding escrow"
          done="Bounty escrowed"
          width={450}
          theme={{ ...FILM_THEME, background: C.paper, primary: C.ink }}
          mode="light"
          speed={1.03}
        />
      </Sequence>
      <div
        style={{
          position: "absolute",
          left: 1150,
          top: 850,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontSize: 24,
          color: C.muted,
          ...inStyle(f, 80),
        }}
      >
        <Check color={C.green} /> Inspectable settlement on Solana
      </div>
      <FooterNote>
        Model training and evaluation happen off-chain.
      </FooterNote>
    </Frame>
  );
}

export function Submission() {
  const f = useCurrentFrame();
  const fileIn = progress(f, 45, 20);
  const submitted = f >= 112;
  return (
    <CursorTrack
      path={[
        { at: 0, x: 1.03, y: 0.9, duration: 1 },
        { at: 9, x: 0.34, y: 0.51, duration: 22, click: true },
        { at: 51, x: 0.73, y: 0.72, duration: 25, click: true },
        { at: 115, x: 0.86, y: 0.85, duration: 18 },
      ]}
      size={50}
      theme={FILM_THEME}
      mode="light"
    >
      <Frame label="Contribute to CH-042" number="02 / CONTRIBUTE">
        <Heading>Stake SOL. Submit targeted data.</Heading>
        <div
          style={{
            position: "absolute",
            left: 120,
            top: 342,
            width: 710,
            height: 570,
            border: `1px solid ${C.grid}`,
            background: "white",
            padding: 38,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 27,
            }}
          >
            <div style={{ width: 17, height: 17, background: C.coral }} />{" "}
            Maya’s curated dataset
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: "-.04em",
              marginTop: 35,
            }}
          >
            Reflective surfaces
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 14,
              marginTop: 28,
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  height: 105,
                  background: i % 2 ? "#d6edf1" : "#f0e0db",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 70,
                    height: 70,
                    border: `2px solid ${C.coral}`,
                    left: 22 + i * 4,
                    top: 18,
                    transform: `rotate(${i * 12 - 20}deg)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    height: 1,
                    background: C.coral,
                    top: 52,
                    width: "100%",
                    opacity: 0.4,
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ fontSize: 25, color: C.muted, marginTop: 30 }}>
            1,250 labelled images · Varied lighting + angles
          </div>
        </div>
        <div style={{ position: "absolute", left: 990, top: 365, width: 770 }}>
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              paddingBottom: 30,
              borderBottom: `1px solid ${C.grid}`,
            }}
          >
            <Img
              src={staticFile("video/assets/solana-mark.svg")}
              style={{ width: 48, height: 42 }}
            />
            <div style={{ fontSize: 28 }}>
              Refundable entry stake{" "}
              <span style={{ fontWeight: 600 }}>0.1 SOL</span>
            </div>
          </div>
          <div
            style={{
              marginTop: 36,
              padding: "34px 30px",
              border: `2px dashed ${fileIn > 0.9 ? C.coral : C.grid}`,
              minHeight: 186,
              display: "flex",
              alignItems: "center",
              gap: 25,
            }}
          >
            <div
              style={{ fontSize: 51, color: fileIn > 0.9 ? C.coral : C.muted }}
            >
              ↥
            </div>
            <div style={{ fontSize: 29 }}>
              {fileIn > 0.5
                ? "reflective-surfaces.zip"
                : "Choose your curated dataset"}
              <div style={{ fontSize: 23, color: C.muted, marginTop: 12 }}>
                {fileIn > 0.5
                  ? "Labels and documentation included"
                  : "Images, annotations, task context"}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 38,
              height: 82,
              background: submitted ? C.green : C.ink,
              color: "white",
              fontSize: 31,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
            }}
          >
            {submitted && <Check color="white" />}
            {submitted ? "Dataset submitted" : "Stake & submit dataset"}
          </div>
        </div>
      </Frame>
    </CursorTrack>
  );
}

export function Evaluation() {
  const f = useCurrentFrame();
  const mode = f < 45 ? "Fine-tune." : f < 82 ? "Evaluate." : "Measure impact.";
  return (
    <Frame label="Same model · same benchmark" number="03 / TRAIN + TEST">
      <Heading>{mode}</Heading>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M450 565H1470"
          stroke={C.grid}
          strokeWidth="2"
          strokeDasharray="7 10"
        />
        {Array.from({ length: 12 }, (_, i) => {
          const p = ((f + i * 7) % 100) / 100;
          return (
            <rect
              key={i}
              x={450 + p * 1010}
              y={555 + ((i % 3) - 1) * 20}
              width="14"
              height="14"
              fill={i % 2 ? C.coral : C.cyan}
              opacity={f < 90 ? 0.85 : 0.2}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 390,
          width: 330,
          height: 350,
          background: "white",
          border: `1px solid ${C.grid}`,
          padding: 28,
        }}
      >
        <div style={{ fontSize: 22, color: C.muted }}>CURATED INPUT</div>
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 12,
          }}
        >
          {Array.from({ length: 9 }, (_, i) => (
            <div
              key={i}
              style={{
                height: 59,
                background: C.coral,
                opacity: 0.22 + i / 20,
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 27, marginTop: 30 }}>Reflective surfaces</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 735,
          top: 360,
          width: 420,
          height: 420,
          background: C.ink,
          padding: 32,
        }}
      >
        <div style={{ fontSize: 24, color: "#aaa" }}>BASE MODEL</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 13,
            marginTop: 35,
          }}
        >
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              style={{
                height: 42,
                background: f > i * 2 ? C.cyan : "#333",
                opacity: 0.45 + (i % 4) * 0.15,
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1380,
          top: 390,
          width: 390,
          height: 350,
          border: `1px solid ${C.grid}`,
          background: "white",
          padding: 32,
        }}
      >
        <div style={{ fontSize: 23, color: C.muted }}>HELD-OUT BENCHMARK</div>
        <div
          style={{
            fontSize: 93,
            fontWeight: 600,
            letterSpacing: "-.06em",
            marginTop: 23,
          }}
        >
          {Math.round(61 + progress(f, 65, 36) * 18)}
          <span style={{ fontSize: 43 }}>%</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 27,
            color: C.green,
            marginTop: 28,
            ...inStyle(f, 82),
          }}
        >
          <Check color={C.green} /> Impact measured
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 862,
          textAlign: "center",
          fontSize: 30,
          color: C.muted,
        }}
      >
        Training and evaluation happen off-chain.
      </div>
      <FooterNote>Illustrative evaluation</FooterNote>
    </Frame>
  );
}

export function StakeReturns() {
  const f = useCurrentFrame();
  return (
    <Frame label="Settlement on Solana" number="05 / RETURN STAKES">
      <Heading sub="Including contributors whose data did not improve the model.">
        Every entry stake returns.
      </Heading>
      <div
        style={{
          position: "absolute",
          left: 726,
          top: 350,
          width: 468,
          height: 140,
          background: C.ink,
          color: "white",
          textAlign: "center",
          paddingTop: 26,
        }}
      >
        <div style={{ fontSize: 22, color: "#aaa" }}>ENTRY STAKES HELD</div>
        <div
          style={{
            fontSize: 42,
            marginTop: 12,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.max(
            0,
            0.4 - 0.1 * Math.min(4, Math.floor(Math.max(0, f - 25) / 17))
          ).toFixed(1)}{" "}
          SOL
        </div>
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M960 490V555M330 555H1590M330 555V640M750 555V640M1170 555V640M1590 555V640"
          fill="none"
          stroke={C.grid}
          strokeWidth="2"
        />
      </svg>
      {DATASETS.map((d, i) => {
        const p = progress(f, 25 + i * 17, 35);
        const x = 330 + i * 420;
        return (
          <div key={d.creator}>
            <Coin
              x={960 + (x - 960) * p}
              y={493 + 210 * p - Math.sin(p * Math.PI) * 60}
              size={76}
              opacity={f > 25 + i * 17 ? 1 : 0}
            />
            <div
              style={{
                position: "absolute",
                left: x - 170,
                top: 765,
                width: 340,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32 }}>{d.creator}</div>
              <div
                style={{
                  fontSize: 27,
                  color: C.green,
                  marginTop: 16,
                  ...inStyle(f, 58 + i * 17),
                }}
              >
                0.1 SOL returned
              </div>
              <div style={{ fontSize: 23, color: C.muted, marginTop: 12 }}>
                {d.gain ? `Reward: ${d.reward} SOL` : "No bounty reward"}
              </div>
            </div>
          </div>
        );
      })}
      <FooterNote>Entry stakes and bounty rewards are separate.</FooterNote>
    </Frame>
  );
}

export function Closing() {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#d9f4f9", fontFamily: FONT }}>
      <SkyLockup
        before="Better data."
        after="Better models."
        wordmark="ynetic"
        logo={K_MARK}
        sky={staticFile("video/assets/sky.svg")}
        fontFamily={FONT}
        wordmarkFont={FONT}
        wordmarkSize={126}
        wordmarkWeight={700}
        fontSize={120}
        wordmarkTracking={-0.055}
        wordmarkGap={5}
        lockupColor={C.ink}
        theme={FILM_THEME}
        mode="light"
        speed={0.68}
      />
      <div
        style={{
          position: "absolute",
          top: 770,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          ...inStyle(f, 77),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Wordmark size={48} />
          <span style={{ fontSize: 35, color: C.muted }}>×</span>
          <Img
            src={staticFile("video/assets/solana-mark.svg")}
            style={{ width: 56, height: 48 }}
          />
          <span
            style={{ fontSize: 43, letterSpacing: "-.035em", fontWeight: 600 }}
          >
            Solana
          </span>
        </div>
        <div style={{ fontSize: 30 }}>
          Crowd-curated data. Measurable improvement.
        </div>
        <div style={{ fontSize: 24, color: "#5d7377" }}>
          Robotics is the first demonstration. Built for AI models.
        </div>
      </div>
    </AbsoluteFill>
  );
}
