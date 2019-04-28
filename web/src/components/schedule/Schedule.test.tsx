import React from "react";
import { shallow } from "enzyme";
import Schedule from "./Schedule";

describe("Schedule", () => {
  it("renders without crashing", () => {
    shallow(<Schedule />);
  });
});