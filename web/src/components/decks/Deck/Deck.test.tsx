import React from "react";
import { shallow } from "enzyme";
import Deck from "./Deck";

describe("Deck", () => {
  it("renders without crashing", () => {
    shallow(<Deck name="deck" description="description" meta="meta" img="/" />);
  });
});
