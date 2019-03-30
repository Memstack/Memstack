import React from "react";
import { shallow } from "enzyme";
import AllDecks from "./AllDecks";

describe("AllDecks", () => {
  it("renders without crashing", () => {
    shallow(<AllDecks />);
  });
});
