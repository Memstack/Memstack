import { shallow } from "enzyme";
import React from "react";
import AllDecks from "./AllDecks";

describe("AllDecks", () => {
  it("renders without crashing", () => {
    shallow(<AllDecks />);
  });
});
