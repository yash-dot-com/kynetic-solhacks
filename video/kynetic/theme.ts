import type { SnapCnTheme } from "@/lib/snap-cn-ui";

export const C = {
  paper: "#f7f6f4",
  ink: "#111111",
  muted: "#7a7a78",
  grid: "#d8d7d3",
  cyan: "#8bdfee",
  blue: "#4267df",
  coral: "#ff6b51",
  green: "#45bf6c",
  gold: "#d5b42f",
  lilac: "#9284e6",
  light: "#ecebe7",
};
export const FONT = "Kynetic Inter";
export const FILM_THEME: Partial<SnapCnTheme> = {
  background: C.paper,
  foreground: C.ink,
  primary: C.blue,
  primaryForeground: "#ffffff",
  card: "#ffffff",
  cardForeground: C.ink,
  secondary: C.light,
  secondaryForeground: C.ink,
  muted: C.light,
  mutedForeground: C.muted,
  border: C.grid,
  accent: C.cyan,
  accentForeground: C.ink,
  radius: 3,
  fontFamily: FONT,
};
// The K outline is extracted from the same bundled Inter font as the wordmark.
export const K_MARK = {
  width: 62.5473,
  height: 72.7539,
  shapes:
    "M10.835 57.569L10.835 38.953Q13.321 35.937 15.821 32.954Q18.320 29.971 20.818 26.990Q23.315 24.009 25.824 21.014L43.781 0L61.810 0L31.097 35.452L29.893 35.452ZM0 72.754L0 0L15.012 0L15.012 20.095L15.012 38.504L15.012 45.675L15.012 72.754ZM45.213 72.754L23.460 39.777L32.493 28.362L62.547 72.754Z"
      .split(/(?=M)/)
      .filter(Boolean),
};
export const DATASETS = [
  {
    name: "Reflective surfaces",
    creator: "Maya",
    short: "Surfaces",
    color: C.coral,
    score: 79,
    gain: 18,
    reward: 6,
    share: 50,
    points: [61, 65, 71, 76, 79],
  },
  {
    name: "Low-light examples",
    creator: "Ishan",
    short: "Low light",
    color: C.green,
    score: 73,
    gain: 12,
    reward: 4,
    share: 33.3,
    points: [61, 63, 67, 71, 73],
  },
  {
    name: "Unusual angles",
    creator: "Noor",
    short: "Angles",
    color: C.gold,
    score: 67,
    gain: 6,
    reward: 2,
    share: 16.7,
    points: [61, 62, 64, 66, 67],
  },
  {
    name: "General examples",
    creator: "Alex",
    short: "General",
    color: C.lilac,
    score: 61,
    gain: 0,
    reward: 0,
    share: 0,
    points: [61, 61.4, 60.8, 61.2, 61],
  },
] as const;
