import { getColor, IPalette } from "./color";

describe("getColor", () => {
  let palette: IPalette;
  beforeEach(() => {
    palette = {
      vibrant: "vibrant",
      darkVibrant: "dark-vibrant",
      lightVibrant: "light-vibrant",
      muted: "muted",
      lightMuted: "light-muted",
      darkMuted: "dark-muted"
    };
  });

  it("returns default color if palette is undefined", () => {
    const expectedResult = "#03b5ad";
    const result = getColor(undefined);
    expect(result).toBe(expectedResult);
  });

  it("returns vibrant if not null", () => {
    const expectedResult = palette.vibrant;
    const result = getColor(palette);
    expect(result).toBe(expectedResult);
  });

  it("returns muted if vibrant is null", () => {
    palette.vibrant = null;
    const expectedResult = palette.muted;
    const result = getColor(palette);
    expect(result).toBe(expectedResult);
  });

  it("returns dark vibrant if vibrant and muted are null", () => {
    palette.vibrant = null;
    palette.muted = null;
    const expectedResult = palette.darkVibrant;
    const result = getColor(palette);
    expect(result).toBe(expectedResult);
  });

  it("returns darkMuted if vibrant, muted and darkVibrant are null", () => {
    palette.vibrant = null;
    palette.muted = null;
    palette.darkVibrant = null;
    const expectedResult = palette.darkMuted;
    const result = getColor(palette);
    expect(result).toBe(expectedResult);
  });

  it("returns default color if vibrant, muted, darkVibrant and darkMuted are null", () => {
    palette.vibrant = null;
    palette.muted = null;
    palette.darkVibrant = null;
    palette.darkMuted = null;
    const expectedResult = "#03b5ad";
    const result = getColor(palette);
    expect(result).toBe(expectedResult);
  });
});
