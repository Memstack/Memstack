import { shallow } from "enzyme";
import React from "react";
import Deck from "./Deck";

describe("Deck", () => {
  it("renders without crashing", () => {
    shallow(<Deck name="deck" description="description" meta="meta" img="/" />);
  });
});
