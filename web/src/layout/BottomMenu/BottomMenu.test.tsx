import { shallow } from "enzyme";
import React from "react";
import BottomMenu from "./BottomMenu";

describe("BottomMenu", () => {
  it("renders without crashing", () => {
    shallow(<BottomMenu />);
  });
});
