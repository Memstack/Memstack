import React from "react";
import BottomMenu from "./BottomMenu";
import { shallow } from "enzyme";

describe("BottomMenu", () => {
  it("renders without crashing", () => {
    shallow(<BottomMenu />);
  });
});
