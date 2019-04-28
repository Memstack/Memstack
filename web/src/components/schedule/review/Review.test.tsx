import React from "react";
import { shallow } from "enzyme";
import Review from "./Review";

describe("Review", () => {
  it("renders without crashing", () => {
    shallow(<Review stackName="Name" cardCount={1} />);
  });
});
