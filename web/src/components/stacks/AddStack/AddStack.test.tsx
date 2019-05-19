import React from "react";
import { shallow } from "enzyme";
import AddStack from "./AddStack";

describe("AllStacks", () => {
  it("renders without crashing", () => {
    shallow(<AddStack />);
  });
});
