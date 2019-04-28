import React from "react";
import { shallow } from "enzyme";
import AllStacks from "./AllStacks";

describe("AllStacks", () => {
  it("renders without crashing", () => {
    shallow(<AllStacks />);
  });
});
