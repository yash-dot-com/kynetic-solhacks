// Project-owned SnapCN scenes use the bundled Inter face in both Player and export.
// The film's font gate loads this face before any scene measures or paints text.
export const loadFilmFont = (..._args: unknown[]) => ({
  fontFamily: "Kynetic Inter",
});
