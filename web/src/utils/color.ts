export interface IPalette {
  vibrant: string | null;
  lightVibrant: string | null;
  darkVibrant: string | null;
  muted: string | null;
  lightMuted: string | null;
  darkMuted: string | null;
}

export const getColor = (palette: IPalette | undefined): string =>
  palette
    ? palette.vibrant ||
      palette.muted ||
      palette.darkVibrant ||
      palette.darkMuted ||
      "#03b5ad"
    : "#03b5ad";
